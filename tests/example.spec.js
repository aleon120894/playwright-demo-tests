// tests/ui-tests.spec.js
import { test, expect } from '@playwright/test';

test.describe('UI tests on the-internet.herokuapp.com', () => {

  test('user can navigate to Form Authentication page', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');
    await page.click('text=Form Authentication');
    await expect(page).toHaveURL(/.*login/);
  });

  test('login fails with wrong credentials', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.error')).toBeVisible();
  });

  test('checkboxes can be selected', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
  });

  test('dropdown selection works', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.selectOption('#dropdown', '2');
    await expect(page.locator('#dropdown')).toHaveValue('2');
  });

});
