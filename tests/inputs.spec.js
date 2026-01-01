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
    test("should ignore non-numeric characters", async ({ page }) => {
        // Try to type a mix of numbers and letters
        const inputAttempt = "abc100xyz";
        
        // Clear the input first
        await inputsPage.fillInput("");
        
        // Use pressSequentially to simulate typing key by key
        // Firefox handles input[type="number"] differently - it may reject all input 
        // if non-numeric chars are present, resulting in an empty field
        await inputsPage.pressSequentially(inputAttempt);
        
        const inputValueAfterFilter = await inputsPage.getInputValue();
        
        // Firefox behavior: input[type="number"] rejects all input when non-numeric chars are present
        // This results in an empty string, which is valid behavior
        // Chromium filters and keeps only numbers (100)
        if (inputValueAfterFilter === "") {
            // Firefox rejected all input - verify we can still enter valid numbers
            await inputsPage.fillInput("100");
            const finalValue = await inputsPage.getInputValue();
            expect(finalValue).toBe("100");
        } else {
            // Chromium behavior: should contain only numbers, ideally "100"
            expect(inputValueAfterFilter).toMatch(/^\d+$/); // Should contain only digits
            expect(inputValueAfterFilter).toBe("100");
        }
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
