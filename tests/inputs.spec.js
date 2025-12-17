import { test, expect } from '@playwright/test';


test.describe("Inputs tests", () => {
    
    // We can define the locator once for easy reuse
    const inputLocator = 'input[type="number"]';

    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/inputs");
        // Ensure the input field is visible before proceeding
        await expect(page.locator(inputLocator)).toBeVisible();
    });

    // Test 1: Verify that typing numbers works as expected.
    test("should allow entry of numeric characters", async ({ page }) => {
        const inputField = page.locator(inputLocator);
        const testValue = "12345.67";
        
        await inputField.fill(testValue);
        
        // Assert the value of the input field matches the expected number
        await expect(inputField).toHaveValue(testValue);
    });

    // Test 2: Verify that non-numeric characters (like letters) are rejected.
    test("should ignore non-numeric characters", async ({ page, browserName }) => {
        if (browserName === 'firefox') test.skip();
        
        const inputField = page.locator(inputLocator);
        
        // Try to type a mix of numbers and letters
        const inputAttempt = "abc100xyz";
        
        // Use pressSequentially to simulate typing key by key
        await inputField.pressSequentially(inputAttempt);

        // The input field should only contain the numbers (100)
        await expect(inputField).toHaveValue("100");
    });

    // Test 3: Verify that the Up and Down arrow keys increment/decrement the value.
    test("should respond to Up and Down arrow key presses", async ({ page }) => {
        const inputField = page.locator(inputLocator);
        
        // Start with a value of 5
        await inputField.fill('5');
        await expect(inputField).toHaveValue('5');

        // Press UP arrow key (increments by 1)
        await inputField.press('ArrowUp');
        await expect(inputField).toHaveValue('6');

        // Press DOWN arrow key (decrements by 1)
        await inputField.press('ArrowDown');
        await expect(inputField).toHaveValue('5');
    });

    // Test 4: Verify large numbers can be entered (checking boundary cases).
    test("should handle large and negative numbers", async ({ page }) => {
        const inputField = page.locator(inputLocator);
        const largeValue = "999999999999";
        const negativeValue = "-12345";
        
        await inputField.fill(largeValue);
        await expect(inputField).toHaveValue(largeValue);

        await inputField.fill(negativeValue);
        await expect(inputField).toHaveValue(negativeValue);
    });
});
