import { test, expect } from '@playwright/test';


// Define the base URL once to handle relative paths
const BASE_URL = 'https://the-internet.herokuapp.com';

// Define the names of the images on the page that are intentionally broken
const BROKEN_IMAGE_NAMES = ['asdf.jpg', 'hjkl.jpg'];

test.describe('Broken Images Tests', () => {

    test('check broken images', async ({ page, request }) => {
        
        // 1. Navigate to the Broken Images page
        await page.goto(`${BASE_URL}/broken_images`);

        // 2. Locate all image elements
        const images = await page.locator('img').all();

        // Array to collect all concurrent checks (promises)
        const imageChecks = [];

        // 3. Loop through each image to check its status and rendering
        for (const img of images) {
            
            // Start an immediate async function for each image to run checks concurrently
            const check = (async () => {
                const src = await img.getAttribute('src');

                if (!src) {
                    // Skip images with missing src attribute
                    return; 
                }

                // Resolve the full URL
                let fullUrl;
                
                if (src.startsWith('http')) {
                    fullUrl = src;
                } else {
                    // Handle relative paths (e.g., /asdf.jpg or just asdf.jpg)
                    fullUrl = src.startsWith('/') ? `${BASE_URL}${src}` : `${BASE_URL}/${src}`;
                }

                // Determine if this is a known intentionally broken image
                const isKnownBroken = BROKEN_IMAGE_NAMES.some(name => fullUrl.endsWith(name));
                
                // ----------------------------------------------------
                // CHECK 1: Network Status (only for images expected to work)
                // ----------------------------------------------------
                if (!isKnownBroken) {
                    try {
                        const response = await request.get(fullUrl);
                        
                        // Expect known-good images NOT to return a 404
                        expect(response.status(), `Valid image URL returned status ${response.status()}: ${fullUrl}`).not.toBe(404);
                    } catch (error) {
                        // Fail if a known-good image throws a network error
                        throw new Error(`Failed to load valid image ${fullUrl}: ${error.message}`);
                    }
                }

                // ----------------------------------------------------
                // CHECK 2: Natural Width (for all images, the ultimate check for visual brokenness)
                // ----------------------------------------------------
                const naturalWidth = await img.evaluate(el => el.naturalWidth);
                
                if (isKnownBroken) {
                    // Expect known-broken images to have a natural width of 0
                    expect(naturalWidth, `Broken image natural width is > 0: ${fullUrl}`).toBe(0); 
                } else {
                    // Expect known-good images to have a natural width greater than 0
                    expect(naturalWidth, `Valid image has a natural width of 0: ${fullUrl}`).toBeGreaterThan(0);
                }

            })();
            
            imageChecks.push(check);
        }

        // 4. Wait for all image checks (promises) to complete before passing the test
        await Promise.all(imageChecks);
    });
});
