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
    
    test("Authorization with invalid username", async ({ page, browserName }) => {
        if (browserName === 'firefox') test.skip();

        const digestAuthPage = new DigestAuthPage(page);
        const username = "noadmin";
        const password = "admin";

        await digestAuthPage.gotoWithAuth(username, password);
    });

    test("Authorization with invalid password", async ({ page, browserName }) => {
        if (browserName === 'firefox') test.skip();

        const digestAuthPage = new DigestAuthPage(page);
        const username = "admin";
        const password = "noadmin";

        await digestAuthPage.gotoWithAuth(username, password);
    });
});
