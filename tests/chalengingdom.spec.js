import { test, expect } from '@playwright/test';

test.describe('Challenging DOM tests', () => {

  test('ChDOM-001: Verify buttons and answer field', async ({ page }) => {
    
    await page.goto('https://the-internet.herokuapp.com/challenging_dom');

    // 🔹 3 Buttons - 3 classes — select with CSS
    const fooButton = page.locator('a.button:not(.alert):not(.success)');
    const bazButton = page.locator('a.button.alert');
    const quxButton = page.locator('a.button.success');

    // 🔹 Check buttons visibility
    await expect(fooButton).toBeVisible();
    await expect(bazButton).toBeVisible();
    await expect(quxButton).toBeVisible();

    // 🔹 Canvas which displays "answer"
    const answerCanvas = page.locator('#canvas');
    await expect(answerCanvas).toBeVisible();

    // 🔹 Checking table above
    const tableRows = page.locator('table tbody tr');
    await expect(tableRows).toHaveCount(10);

    // 🔹 Click on button and checking reaction
    const oldId = await fooButton.getAttribute('id');
    await fooButton.click();
    const newId = await fooButton.getAttribute('id');
    expect(newId).not.toBe(oldId);
  });

});
