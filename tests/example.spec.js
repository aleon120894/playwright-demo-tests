import { test, expect } from '@playwright/test';

// Перевірка заголовка головної сторінки
test('homepage has title', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');
  await expect(page).toHaveTitle(/The Internet/);
});

// Тест логіну на демо-сайті
test('login form works', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  await expect(page.locator('.flash.success')).toBeVisible();
});
