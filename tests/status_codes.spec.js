import { test, expect } from "@playwright/test";


test.describe("Status codes tests", () => {
    
    const statusCodesBaseUrl = "https://the-internet.herokuapp.com/status_codes";

    // Test 1: Verify the 200 Status Code (Successful Load)
    test("Verify 200 Status Code (OK) via navigation and content", async ({ page }) => {
        
        // 1. Navigate directly to the 200 endpoint and capture the response
        const response = await page.goto(`${statusCodesBaseUrl}/200`);

        // 2. Assert the HTTP status code
        expect(response?.status()).toBe(200);

        // 3. Assert the content on the page confirms the status
        await expect(page.locator('.example p')).toContainText('This page returned a 200 status code.');
    });

    // Test 2: Verify the 301 Status Code (Moved Permanently)
    test("Verify 301 Status Code (Moved Permanently) via API request", async ({ page, request }) => {
        
        // page.goto() automatically follows redirects. To check the 301 directly, 
        // we use page.request.get() with maxRedirects: 0 to check the initial response.
        const response = await request.get(`${statusCodesBaseUrl}/301`, { maxRedirects: 0 });

        // Assert the HTTP status code of the initial response is 301
        expect(response.status()).toBe(301);
    });

    // Test 3: Verify the 404 Status Code (Not Found)
    test("Verify 404 Status Code (Not Found) via navigation and content", async ({ page }) => {
        
        // 1. Navigate directly to the 404 endpoint and capture the response
        const response = await page.goto(`${statusCodesBaseUrl}/404`);
        
        // 2. Assert the HTTP status code is 404
        expect(response?.status()).toBe(404);
        
        // 3. Assert the content on the page confirms the status
        await expect(page.locator('.example p')).toContainText('This page returned a 404 status code.');
    });

    // Test 4: Verify the 500 Status Code (Internal Server Error)
    test("Verify 500 Status Code (Internal Server Error) via navigation and content", async ({ page }) => {
        
        // 1. Navigate directly to the 500 endpoint and capture the response
        const response = await page.goto(`${statusCodesBaseUrl}/500`);
        
        // 2. Assert the HTTP status code is 500
        expect(response?.status()).toBe(500);
        
        // 3. Assert the content on the page confirms the status
        await expect(page.locator('.example p')).toContainText('This page returned a 500 status code.');
    });
});
