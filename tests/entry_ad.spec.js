import { test, expect } from "@playwright/test";


test.describe("Entry Ad tests", () => {
    
    // Locators
    const modalClick = "#restart-ad";           // The "click here" link to re-enable the ad
    const modal = "#modal";                     // The main modal container
    const modalCloseButton = ".modal-footer p"; // The "Close" button inside the modal

    test.beforeEach(async ({ page }) => {

        // Go to entry ad page
        await page.goto("https://the-internet.herokuapp.com/entry_ad");

        // // Pre-check 1: Use getByRole for the main page header. 
        // // This is the stable fix for strict mode violation.
        // await expect(page.getByRole('heading', { name: 'Entry Ad' })).toBeVisible();

        // // Pre-check 2: Ensure the ad restart link is visible
        // await expect(page.locator(modalClick)).toBeVisible();
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

        // 2. Click the 'click here' link to make the ad reappear
        // console.log("Re-enabling and checking modal visibility...");
        await page.click(modalClick);
        
        // 3. Assert the modal is visible again
        await expect(page.locator(modal)).toBeVisible();

        // 4. Clean up
        await page.locator(modalCloseButton).click();
        await expect(page.locator(modal)).not.toBeVisible();
    });
});