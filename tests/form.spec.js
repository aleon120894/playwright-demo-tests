import { test, expect } from '@playwright/test';


test.describe('Form authentication', () => {
  
  test('checkboxes interaction', async ({ page }) => {
    
    // Go to checkboxes checking
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    
    // Checkbox checking
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();
  });
});
