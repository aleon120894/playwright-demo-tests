import { test, expect } from '@playwright/test';


test.describe("Digest auth tests", () => {
    test("Authorization with valid creds", async ({ page }) => {
        
        const username = "admin";
        const password = "admin";

        // This URL construction is the standard way to handle HTTP authentication in Playwright
        // and is expected to work for The Internet Herokuapp's digest auth challenge.
        const authUrl = `https://${username}:${password}@the-internet.herokuapp.com/digest_auth`;

        // Navigate to the authenticated URL
        await page.goto(authUrl);

        // Assert: Verify the success message is displayed after successful authentication.
        // The expected text when authenticated is:
        const expectedText = 'Congratulations! You must have the proper credentials.';
        
        const successMessage = page.locator('#content > div > p');
        
        // Use toContainText for a more robust check that ignores extra whitespace/newlines
        await expect(successMessage).toContainText(expectedText);
    });
    
    test("Authorization with invalid username", async ({ page, browserName }) => {
        if (browserName === 'firefox') test.skip();

        const username = "noadmin";
        const password = "admin";

        // This URL construction is the standard way to handle HTTP authentication in Playwright
        // and is expected to work for The Internet Herokuapp's digest auth challenge.
        const authUrl = `https://${username}:${password}@the-internet.herokuapp.com/digest_auth`;

        // Navigate to the authenticated URL
        await page.goto(authUrl);
    });

    test("Authorization with invalid password", async ({ page, browserName }) => {
        if (browserName === 'firefox') test.skip();

        const username = "admin";
        const password = "noadmin";

        // This URL construction is the standard way to handle HTTP authentication in Playwright
        // and is expected to work for The Internet Herokuapp's digest auth challenge.
        const authUrl = `https://${username}:${password}@the-internet.herokuapp.com/digest_auth`;

        // Navigate to the authenticated URL
        await page.goto(authUrl);
    });
});
