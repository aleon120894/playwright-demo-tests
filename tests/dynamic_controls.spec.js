import { test, expect } from '@playwright/test';


test.describe("Dynamic controls tests", () => {
    
    const pageUrl = 'https://the-internet.herokuapp.com/dynamic_controls';
    const checkboxSelector = '#checkbox';
    const checkboxButtonSelector = '#checkbox-example button';
    const checkboxMessageSelector = '#message';

    const inputSelector = '#input-example input';
    const inputButtonSelector = '#input-example button';
    const inputMessageSelector = '#input-example #message';

    test.beforeEach(async ({ page }) => {
        await page.goto(pageUrl);
    });

     // Test 1: Verify the checkbox can be removed
    test('should remove the checkbox and verify its disappearance', async({ page }) => {

        // 1. Click the 'Remove' button
        await page.click(checkboxButtonSelector);

        // 2. Wait for the loading element to become hidden (or the message to appear).
        // The most robust way is to wait for the specific message text.
        await expect(page.locator(checkboxMessageSelector)).toHaveText("It's gone!", { timeout: 10000 });

        // 3. Assert the checkbox is no longer visible/attached to the DOM.
        // We use toBeHidden() which is often preferred over toHaveCount(0) for dynamic removal.
        await expect(page.locator(checkboxSelector)).toBeHidden();
    });

      // Test 2: Verify the checkbox can be added back
    test('should add the checkbox back and verify its presence', async ({ page }) => {
        // First, remove it (as done in the previous test)
        await page.click(checkboxButtonSelector);
        await expect(page.locator(checkboxMessageSelector)).toHaveText("It's gone!", { timeout: 10000 });
        
        // 1. Click the 'Add' button (it's the same selector, the button text changes)
        await page.click(checkboxButtonSelector);

        // 2. Wait for the 'It's back!' message
        await expect(page.locator(checkboxMessageSelector)).toHaveText("It's back!", { timeout: 10000 });

        // 3. Assert the checkbox is visible/attached to the DOM.
        await expect(page.locator(checkboxSelector)).toBeVisible();
    });

    // Test 3: Verify the input field can be enabled and text can be entered
    test('should enable the input field and allow typing', async ({ page }) => {
        // 1. Assert the input field is initially disabled
        const inputField = page.locator(inputSelector);
        await expect(inputField).toBeDisabled();
        
        // 2. Click the 'Enable' button
        await page.click(inputButtonSelector);

        // 3. Wait for the 'It's enabled!' message
        await expect(page.locator(inputMessageSelector)).toHaveText("It's enabled!", { timeout: 10000 });
        
        // 4. Assert the input field is now enabled
        await expect(inputField).toBeEnabled();
        
        // 5. Attempt to type into the now-enabled field
        const testText = 'Playwright is working!';
        await inputField.fill(testText);

        // 6. Assert the text was successfully entered
        await expect(inputField).toHaveValue(testText);
    });
});
