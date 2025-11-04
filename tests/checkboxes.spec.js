import { test, expect } from '@playwright/test';

test.describe('Checkboxes tests', () => {
  
  /** @type {import('@playwright/test').Locator} */
  let checkbox1;
  /** @type {import('@playwright/test').Locator} */
  let checkbox2;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    checkbox1 = page.locator('#checkboxes input[type="checkbox"]').first();
    checkbox2 = page.locator('#checkboxes input[type="checkbox"]').nth(1);
  });

  test('Check both checkboxes', async () => {
    
    await checkbox1.check();
    await checkbox2.check();

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();
  });

  test('Uncheck all checkboxes', async () => {
    await checkbox1.uncheck();
    await checkbox2.uncheck();

    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });

  test('Check first checkbox', async () => {
    await checkbox1.check();
    await checkbox2.uncheck();

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });

  test('Check second checkbox', async () => {
    await checkbox1.uncheck();
    await checkbox2.check();

    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();
  });
});
