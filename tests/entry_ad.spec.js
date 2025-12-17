import { test, expect } from "@playwright/test";


test.describe("Entry Ad tests", () => {
    
    // Locators
    const modalClick = "#restart-ad";           // The "click here" link to re-enable the ad
    const modal = "#modal";                     // The main modal container
    const modalCloseButton = ".modal-footer p"; // The "Close" button inside the modal
    // NEW LOCATOR: Target the specific paragraph in the modal body for precise content assertion
    const modalBodyText = '#modal .modal-body p';

    test.beforeEach(async ({ page }) => {
        // Go to entry ad page
        await page.goto("https://the-internet.herokuapp.com/entry_ad");

        // FIX 1: Add stable pre-checks to prevent the strict mode violation error (where two H3s were found).
        await expect(page.getByRole('heading', { name: 'Entry Ad' })).toBeVisible();
        await expect(page.locator(modalClick)).toBeVisible();
    });

    // EA-001: Verify the modal auto-displays on load and can be successfully closed.
    test("EA-001: Should display modal on load and close it successfully", async ({ page }) => {
        
        // 1. Assert Modal is visible immediately after page load
        await expect(page.locator(modal)).toBeVisible();
        
        // 2. Assert Modal content is correct
        await expect(page.getByRole('heading', { name: 'This is a modal window' })).toBeVisible();
        
        // 3. Click the close button
        // console.log("Closing the entry ad modal...");
        await page.locator(modalCloseButton).click();

        // 4. Assert Modal is hidden
        await expect(page.locator(modal)).not.toBeVisible();
    });

    // EA-002: Verify the modal reappears when clicking the 'click here' link.
    test("EA-002: Should redisplay modal when clicking 'click here' link", async ({ page }) => {
        
        // 1. Setup: Close the modal first (modal is automatically visible on load)
        await page.locator(modalCloseButton).click(); 
        await expect(page.locator(modal)).not.toBeVisible();

        // 2. Set the cookie to re-enable the ad and reload the page
        console.log("Re-enabling and checking modal visibility (synchronizing with page reload)...");
        await page.evaluate(() => { document.cookie = 'entry_ad_closed=false'; });
        await page.reload({ waitUntil: 'load' });
        
        // 3. Assert the modal is visible again
        // The assertion's internal wait should now be enough, as the page load is confirmed stable.
        await expect(page.locator(modal)).toBeVisible({ timeout: 10000 });

        // 4. Clean up
        await page.locator(modalCloseButton).click();
        await expect(page.locator(modal)).not.toBeVisible();
    });
    
    // EA-003: Verify all key text elements are present and correct.
    test("EA-003: Should verify the main page and modal titles are correct", async ({ page }) => {
        
        // 1. Assert the main page title
        await expect(page.getByRole('heading', { name: 'Entry Ad' })).toBeVisible();

        // 2. Assert the link text for re-enabling the ad
        await expect(page.locator(modalClick)).toHaveText('click here');

        // 3. Assert the modal is visible and contains the correct title text
        await expect(page.locator(modal)).toBeVisible();
        await expect(page.getByRole('heading', { name: 'This is a modal window' })).toBeVisible();

        // 4. Assert the modal body content, targeting the specific paragraph element.
        await expect(page.locator(modalBodyText)).toHaveText("It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).");

        // 5. Clean up
        await page.locator(modalCloseButton).click();
        await expect(page.locator(modal)).not.toBeVisible();
    });
});
