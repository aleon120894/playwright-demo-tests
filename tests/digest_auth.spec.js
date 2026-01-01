import { test, expect } from '@playwright/test';
import { DigestAuthPage } from '../pages/DigestAuthPage.js';


test.describe("Digest auth tests", () => {
    test("Authorization with valid creds", async ({ page }) => {
        
        const digestAuthPage = new DigestAuthPage(page);
        const username = "admin";
        const password = "admin";

        await digestAuthPage.gotoWithAuth(username, password);

        // Assert: Verify the success message is displayed after successful authentication.
        // The expected text when authenticated is:
        const expectedText = 'Congratulations! You must have the proper credentials.';
        
        // Await the promise first, then check the text content
        const successMessage = await digestAuthPage.getSuccessMessage();
        expect(successMessage).toContain(expectedText);
    });
    
    test("Authorization with invalid username", async ({ page }) => {
        const digestAuthPage = new DigestAuthPage(page);
        const username = "noadmin";
        const password = "admin";

        // Navigate with invalid credentials
        // Firefox may throw an error (NS_ERROR_NET_EMPTY_RESPONSE), which is expected behavior
        await digestAuthPage.gotoWithAuth(username, password);
        
        // Verify authentication failed - we should NOT be authenticated
        // isAuthenticated returns false or null when auth fails
        const isAuthenticated = await digestAuthPage.isAuthenticated();
        expect(isAuthenticated).not.toBe(true);
    });

    test("Authorization with invalid password", async ({ page }) => {
        const digestAuthPage = new DigestAuthPage(page);
        const username = "admin";
        const password = "noadmin";

        // Navigate with invalid credentials
        // Firefox may throw an error (NS_ERROR_NET_EMPTY_RESPONSE), which is expected behavior
        await digestAuthPage.gotoWithAuth(username, password);
        
        // Verify authentication failed - we should NOT be authenticated
        // isAuthenticated returns false or null when auth fails
        const isAuthenticated = await digestAuthPage.isAuthenticated();
        expect(isAuthenticated).not.toBe(true);
    });
});
