import { test, expect } from "@playwright/test";


// Base URL for the page containing the redirect link
const REDIRECTOR_URL = "https://the-internet.herokuapp.com/redirector";
// Expected URL after the redirect
const TARGET_URL = "https://the-internet.herokuapp.com/status_codes";
const STATUS_CODES_HEADER_SELECTOR = "#content > div > h3";

test.describe("Redirect Link Tests", () => {
    
    // The test function correctly receives and destructures the { page } fixture.
    // All asynchronous actions (like await page.goto) must be inside this function.
    test("should redirect the user to the Status Codes page after clicking the link", async ({ page }) => {
        
        console.log(`Navigating to: ${REDIRECTOR_URL}`);
        await page.goto(REDIRECTOR_URL);

        // Locator for the redirect link, using Playwright's more robust method
        const redirectLink = page.getByRole('link', { name: 'here' });
        
        // Ensure the initial header is correct (as per your original intent)
        await expect(page.locator(STATUS_CODES_HEADER_SELECTOR)).toContainText("Redirection");

        // Click the link and wait for the navigation to complete
        console.log("Clicking the redirect link...");
        await redirectLink.click();
        
        // Assert that the final URL matches the expected target
        const currentUrl = page.url();
        console.log(`Redirect complete. Final URL: ${currentUrl}`);
        
        // 1. Assert the URL
        await expect(page).toHaveURL(TARGET_URL);
        
        // 2. Assert the destination page header text
        await expect(page.locator(STATUS_CODES_HEADER_SELECTOR)).toContainText("Status Codes");
    });
});
