import { test, expect } from '@playwright/test';


test.describe("Dropdown tests", () => {
    test("Dropdown test: option 1", async ({ page }) => {

        // 1. Navigate to the dropdown page
        await page.goto("https://the-internet.herokuapp.com/dropdown");

        // 2. Locate the dropdown element by its ID
        const dropdown = page.locator('#dropdown');

        // 3. Select 'Option 1' using its visible text (label)
        // Playwright handles the selection robustly
        await dropdown.selectOption({label: 'Option 1'});

        // 4. Assertion: Verify the dropdown's selected value is '1' (the value attribute of Option 1)
        await expect(dropdown).toHaveValue('1');
    });

    test("Dropdown test option 2", async ({ page }) => {

        // 1. Navigate to the dropdown page
        await page.goto("https://the-internet.herokuapp.com/dropdown");

        // 2. Locate the dropdown element
        const dropdown = page.locator('#dropdown');

         // 3. Select 'Option 2' using its value attribute '2'
         await dropdown.selectOption({label: 'Option 2'});

         // 4. Assertion: Verify the dropdown's selected value is '2'
         await expect(dropdown).toHaveValue('2');

         // Optional Assertion: Verify the selected option's text is 'Option 2'
         await expect(dropdown.locator('option[selected]')).toHaveText('Option 2');
    });
});
