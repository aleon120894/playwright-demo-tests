import { test, expect } from "@playwright/test";


test.describe("Hovers tests", () => {

    // Image container locators (parent elements)
    const user1Image = "#content > div > div:nth-child(3)";
    const user2Image = "#content > div > div:nth-child(4)";
    const user3Image = "#content > div > div:nth-child(5)";

    // Caption locators (hidden elements that appear on hover)
    const user1Caption = `${user1Image} .figcaption`;
    const user2Caption = `${user2Image} .figcaption`;
    const user3Caption = `${user3Image} .figcaption`;
    
    // Locators for the "View profile" link within the captions
    const user2Link = `${user2Caption} a`;

    test.beforeEach(async ({ page }) => {

        await page.goto("https://the-internet.herokuapp.com/hovers");
        // Ensure the main image containers are visible before running tests
        await expect(page.locator(user1Image)).toBeVisible();
    });

    // HS-001: Should display the caption text for user 1 when hovering over the image.
    test("HS-001: Should display the correct user caption on hover", async ({ page }) => {
        
        // 1. Assert the caption is NOT visible initially
        await expect(page.locator(user1Caption)).not.toBeVisible();

        // 2. Hover over the user 1 image container
        await page.locator(user1Image).hover();

        // 3. Assert the caption is now visible
        await expect(page.locator(user1Caption)).toBeVisible();

        // 4. Assert the caption contains the correct text
        await expect(page.locator(user1Caption)).toContainText("name: user1");
        await expect(page.locator(user1Caption)).toContainText("View profile");
    });

     // HS-002: Should successfully click the hidden 'View profile' link for user 2.
    test("HS-002: Should successfully navigate via the hidden 'View profile' link", async ({ page }) => {
        
        // 1. Hover over the user 2 image container
        await page.locator(user2Image).hover();

        // 2. Assert the caption is visible (this ensures the link is clickable)
        await expect(page.locator(user2Caption)).toBeVisible();

        // 3. Click the 'View profile' link
        await page.locator(user2Link).click();

        // 4. Assert navigation to the expected error page (the site uses a generic 404/not found page structure)
        await expect(page).toHaveURL(/users\/2/); // Check the URL path matches /users/2
        await expect(page.getByRole('heading', { name: 'Not Found' })).toBeVisible();
    });
});
