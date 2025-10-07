import {test, expect} from '@playwright/test';


test.describe('Challenging DOM tests', () => {
    test('Navigate to Challenging DOM page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.click('a[href="/challenging_dom"]');
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/challenging_dom');
    });
    test('Click on first "FOO" button', async({ page }) => {
        //
    });
});
