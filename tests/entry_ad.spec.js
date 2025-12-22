import { test, expect } from "@playwright/test";
import { EntryAdPage } from "../pages/EntryAdPage.js";


test.describe("Entry Ad tests", () => {
    
    let entryAdPage;

    test.beforeEach(async ({ page }) => {
        entryAdPage = new EntryAdPage(page);
        await entryAdPage.goto();

        // FIX 1: Add stable pre-checks to prevent the strict mode violation error (where two H3s were found).
        await expect(page.getByRole('heading', { name: 'Entry Ad' })).toBeVisible();
        await expect(page.locator(entryAdPage.restartAdLink)).toBeVisible();
    });

    // EA-001: Verify the modal auto-displays on load and can be successfully closed.
    test("EA-001: Should display modal on load and close it successfully", async ({ page }) => {
        
        // 1. Assert Modal is visible immediately after page load (using locator assertion with retry logic)
        await expect(page.locator(entryAdPage.modal)).toBeVisible();
        
        // 2. Assert Modal content is correct
        await expect(page.getByRole('heading', { name: 'This is a modal window' })).toBeVisible();
        
        // 3. Click the close button
        // console.log("Closing the entry ad modal...");
        await entryAdPage.closeModal();

        // 4. Assert Modal is hidden (using locator assertion with retry logic)
        await expect(page.locator(entryAdPage.modal)).toBeHidden();
    });

    // EA-002: Verify the modal reappears when clicking the 'click here' link.
    test("EA-002: Should redisplay modal when clicking 'click here' link", async ({ page }) => {
        
        // 1. Setup: Close the modal first (modal is automatically visible on load)
        await entryAdPage.closeModal(); 
        await expect(page.locator(entryAdPage.modal)).toBeHidden();

        // 2. Set the cookie to re-enable the ad and reload the page
        console.log("Re-enabling and checking modal visibility (synchronizing with page reload)...");
        await entryAdPage.reEnableAd();
        
        // 3. Assert the modal is visible again (using locator assertion with retry logic)
        await expect(page.locator(entryAdPage.modal)).toBeVisible();

        // 4. Clean up
        await entryAdPage.closeModal();
        await expect(page.locator(entryAdPage.modal)).toBeHidden();
    });
    
    // EA-003: Verify all key text elements are present and correct.
    test("EA-003: Should verify the main page and modal titles are correct", async ({ page }) => {
        
        // 1. Assert the main page title
        await expect(page.getByRole('heading', { name: 'Entry Ad' })).toBeVisible();

        // 2. Assert the link text for re-enabling the ad
        await expect(page.locator(entryAdPage.restartAdLink)).toHaveText('click here');

        // 3. Assert the modal is visible and contains the correct title text (using locator assertion with retry logic)
        await expect(page.locator(entryAdPage.modal)).toBeVisible();
        await expect(page.getByRole('heading', { name: 'This is a modal window' })).toBeVisible();

        // 4. Assert the modal body content, targeting the specific paragraph element.
        const modalBodyText = await entryAdPage.getModalBodyText();
        expect(modalBodyText).toBe("It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).");

        // 5. Clean up
        await entryAdPage.closeModal();
        await expect(page.locator(entryAdPage.modal)).toBeHidden();
    });
});
