import { test, expect } from '@playwright/test';


test.describe('Navigation tests', () => {
  
  test('navigate to About page', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/');
    await page.click('a[href="/abtest"]');
    
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/abtest');
    await expect(page.locator('h3')).toContainText(/A\/B Test Control|A\/B Test Variation 1/);
  });

  test('back and forward navigation', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/');
    await page.click('a[href="/checkboxes"]');
    await expect(page).toHaveURL(/.*checkboxes/);

    await page.goBack();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

    await page.goForward();
    await expect(page).toHaveURL(/.*checkboxes/);
  });

  test('status codes page navigation', async ({ page }) => {
    
    await page.goto('https://the-internet.herokuapp.com/');
    await page.click('a[href="/status_codes"]');
    await expect(page).toHaveURL(/.*status_codes/);

    await page.click('a[href="status_codes/404"]');
    await expect(page).toHaveURL(/.*404/);
    await expect(page.locator('p')).toContainText('This page returned a 404 status code');
  });
});
