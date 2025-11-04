import { test, expect } from '@playwright/test';

test.describe("Context menu tests", () => {
    
    const PAGE_URL = 'https://the-internet.herokuapp.com/context_menu';
    const HOT_SPOT_SELECTOR = '#hot-spot';
    const EXPECTED_ALERT_TEXT = 'You selected a context menu';

    // Test to verify that right-clicking the hotspot triggers the correct alert
    test('should trigger an alert with the expected text upon right-click', async ({ page }) => {
        // 1. Navigate to the page
        await page.goto(PAGE_URL);
        
        // --- Dialog Handling Setup ---
        // Playwright handles JavaScript dialogs (alerts, confirms, prompts) 
        // using the 'dialog' event. We need to set up the listener BEFORE the 
        // action that triggers the dialog to avoid a race condition.
        
        let actualAlertText = null; // Removed TypeScript type annotation
        
        // Listen for the dialog event
        page.on('dialog', async (dialog) => {
            // Check that it is indeed an alert (the only type expected here)
            expect(dialog.type()).toBe('alert');
            
            // Capture the message of the alert
            actualAlertText = dialog.message();
            
            // Accept the alert (closing it)
            await dialog.accept();
        });
        
        // --- Context Click Action ---
        // 2. Perform a right-click (context click) on the hot spot element
        // The 'button: "right"' option tells Playwright to simulate a right mouse click.
        await page.click(HOT_SPOT_SELECTOR, { button: 'right' });

        // Wait a moment for the dialog handler to execute and close the dialog.
        // We use a small timeout here to ensure the asynchronous dialog listener 
        // has time to complete its job before we proceed to verification.
        await page.waitForTimeout(500); 

        // --- Verification ---
        // 3. Verify that the captured alert text is correct
        expect(actualAlertText).toBe(EXPECTED_ALERT_TEXT);
        
        // 4. Verify the alert was handled and the page is still usable (optional sanity check)
        const headerText = await page.locator('h3').textContent();
        expect(headerText).toBe('Context Menu');
    });
});
