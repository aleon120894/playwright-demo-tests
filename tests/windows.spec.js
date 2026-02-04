import { test, expect } from '@playwright/test';
import { WindowsPage } from '../pages/WindowsPage.js';

test.describe('Windows page tests', () => {

  test('WN-001: Should open a new window with correct URL and header text', async ({ page }) => {
    const windowsPage = new WindowsPage(page);

    // 1. Navigate to the Windows page
    await windowsPage.goto();

    // 2. Open the new window and get a handle to it
    const newWindow = await windowsPage.openNewWindow();

    // 3. Verify the new window URL
    await expect(newWindow).toHaveURL(/\/windows\/new$/);

    // 4. Verify the header text in the new window
    const newWindowHeader = newWindow.locator('h3');
    await expect(newWindowHeader).toHaveText('New Window');
  });

  test('WN-002: Should keep the original window open and accessible', async ({ page }) => {
    const windowsPage = new WindowsPage(page);

    // 1. Navigate to the Windows page and verify initial header
    await windowsPage.goto();
    const originalHeaderText = await windowsPage.getMainPageHeaderText();
    expect(originalHeaderText).toBe('Opening a new window');

    // 2. Open the new window
    const newWindow = await windowsPage.openNewWindow();

    // 3. Ensure the new window is on the expected page
    await expect(newWindow).toHaveURL(/\/windows\/new$/);

    // 4. Verify the original page is still open and has the same header
    const mainHeader = page.locator('h3');
    await expect(mainHeader).toHaveText('Opening a new window');
  });
});


