import { test, expect } from '@playwright/test';
import { InputsPage } from '../pages/InputsPage.js';


test.describe("Inputs tests", () => {
    
    let inputsPage;

    test.beforeEach(async ({ page }) => {
        inputsPage = new InputsPage(page);
        await inputsPage.goto();
        // Ensure the input field is visible before proceeding
        await expect(page.locator(inputsPage.inputField)).toBeVisible();
    });

    // Test 1: Verify that typing numbers works as expected.
    test("should allow entry of numeric characters", async ({ page }) => {
        const testValue = "12345.67";
        
        await inputsPage.fillInput(testValue);
        
        // Assert the value of the input field matches the expected number
        const inputValue = await inputsPage.getInputValue();
        expect(inputValue).toBe(testValue);
    });

    // Test 2: Verify that non-numeric characters (like letters) are rejected.
    test("should ignore non-numeric characters", async ({ page, browserName }) => {
        if (browserName === 'firefox') test.skip();
        
        // Try to type a mix of numbers and letters
        const inputAttempt = "abc100xyz";
        
        // Use pressSequentially to simulate typing key by key
        await inputsPage.pressSequentially(inputAttempt);

        // The input field should only contain the numbers (100)
        const inputValueAfterFilter = await inputsPage.getInputValue();
        expect(inputValueAfterFilter).toBe("100");
    });

    // Test 3: Verify that the Up and Down arrow keys increment/decrement the value.
    test("should respond to Up and Down arrow key presses", async ({ page }) => {
        
        // Start with a value of 5
        await inputsPage.fillInput('5');
        let inputValue = await inputsPage.getInputValue();
        expect(inputValue).toBe('5');

        // Press UP arrow key (increments by 1)
        await inputsPage.pressKey('ArrowUp');
        inputValue = await inputsPage.getInputValue();
        expect(inputValue).toBe('6');

        // Press DOWN arrow key (decrements by 1)
        await inputsPage.pressKey('ArrowDown');
        inputValue = await inputsPage.getInputValue();
        expect(inputValue).toBe('5');
    });

    // Test 4: Verify large numbers can be entered (checking boundary cases).
    test("should handle large and negative numbers", async ({ page }) => {
        const largeValue = "999999999999";
        const negativeValue = "-12345";
        
        await inputsPage.fillInput(largeValue);
        let inputValue = await inputsPage.getInputValue();
        expect(inputValue).toBe(largeValue);

        await inputsPage.fillInput(negativeValue);
        inputValue = await inputsPage.getInputValue();
        expect(inputValue).toBe(negativeValue);
    });
});
