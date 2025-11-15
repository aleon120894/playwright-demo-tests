import { test, expect } from "@playwright/test";


test.describe("Horizontal Slider Tests", () => {
    // Locators for the key elements on the page
    const sliderInput = "input[type='range']";
    const rangeDisplay = "#range";
    
    // Set up navigation before each test
    test.beforeEach(async ({ page }) => {
        // Navigate to the correct page for testing
        await page.goto("https://the-internet.herokuapp.com/horizontal_slider");
        // Wait for the slider to be visible before proceeding
        await expect(page.locator(sliderInput)).toBeVisible();
    });

    /**
     * Helper function to reliably set the slider to a specific integer value using arrow keys.
     * It relies on setting the slider to 0 first, then pressing 'ArrowRight' the required number of times.
     * @param {import('@playwright/test').Page} page
     * @param {number} targetValue
     */
    async function moveSliderToValue(page, targetValue) {
        // Step 1: Force the slider to the absolute minimum (0). This is usually the most stable base point.
        await page.fill(sliderInput, '0');
        await page.waitForTimeout(100); // Add a small pause to ensure the UI updates fully

        // Step 2: Ensure the input field has focus so keyboard events work.
        await page.click(sliderInput);

        // Step 3: Calculate the number of 0.5 increments needed.
        const increments = targetValue / 0.5;

        // Step 4: Press the Right Arrow key the calculated number of times.
        for (let i = 0; i < increments; i++) {
            await page.keyboard.press('ArrowRight');
            // Adding a small pause here can sometimes prevent Playwright from sending commands too fast
            // before the application processes the previous key press.
            await page.waitForTimeout(50); 
        }
    }

    // HS-004: Test setting the slider to its maximum value using .fill()
    test("HS-004: Should set slider to maximum value (5.0)", async ({ page }) => {
        const maxValue = '5';
        
        // Use .fill() to directly set the value of the input range element. 
        await page.fill(sliderInput, maxValue);
        
        console.log(`Setting slider value to ${maxValue}`);

        // The page displays "5"
        await expect(page.locator(rangeDisplay)).toHaveText('5');
        await expect(page.locator(sliderInput)).toHaveValue('5');
    });

    // HS-005: Test setting the slider to its minimum value (default state)
    test("HS-005: Should set slider to minimum value (0.0)", async ({ page }) => {
        const minValue = '0';
        
        // First, ensure it's at max value, then reset to min to prove the interaction works.
        await page.fill(sliderInput, '5');
        // Expect "5"
        await expect(page.locator(rangeDisplay)).toHaveText('5');
        
        // Set back to minimum value
        await page.fill(sliderInput, minValue);
        
        console.log(`Setting slider value to ${minValue}`);

        // Expect "0"
        await expect(page.locator(rangeDisplay)).toHaveText('0');
        await expect(page.locator(sliderInput)).toHaveValue('0');
    });
});
