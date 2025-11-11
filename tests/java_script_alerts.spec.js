import { test, expect } from "@playwright/test";


test.describe("Java Script alerts tests", () => {

    // Selectors for the buttons and the result text
    const jsAlertButton = 'button[onclick="jsAlert()"]';
    const jsConfirmButton = 'button[onclick="jsConfirm()"]';
    const jsPromptButton = 'button[onclick="jsPrompt()"]';
    const resultLocator = '#result';
    
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    });

     // Test 1: Handle a standard JS Alert (which only has an OK button)
    test("Test 1: Handle a standard JS Alert (which only has an OK button)", async ({ page }) => {

        // 1. Set up the dialog listener BEFORE clicking the button.
        // Playwright will automatically accept (click OK) if no action is specified.
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept(); // This accepts the alert (clicks OK)
        });

        // 2. Click the button to trigger the alert
        await page.locator(jsAlertButton).click();

        // 3. Verify the result message after dismissal
        await expect(page.locator(resultLocator)).toHaveText('You successfully clicked an alert');
        // console.log('Test 1: JS Alert handled successfully.');

    });

    // Test 2: Handle a JS Confirm (which has OK and Cancel buttons)
    test("Test 2: Handle a JS Confirm (which has OK and Cancel buttons)", async ({ page }) => {
        
        // 1. Set up the dialog listener
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.dismiss(); // This dismisses the confirm (clicks Cancel)
        });

        // 2. Click the button to trigger the confirm
        await page.locator(jsConfirmButton).click();

        // 3. Verify the result message after dismissal
        await expect(page.locator(resultLocator)).toHaveText('You clicked: Cancel');
        // console.log('Test 2: JS Confirm dismissed successfully.');
    });

    // Test 3: Handle a JS Prompt (which accepts text input)
    test("Test 3: Handle a JS Prompt (which accepts text input)", async ({ page }) => {

        const inputText = "Playwright is awesome!";

        // 1. Set up the dialog listener to send text
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            
            // Send the text and accept the prompt
            await dialog.accept(inputText); 
        });

        // 2. Click the button to trigger the prompt
        await page.locator(jsPromptButton).click();

        // 3. Verify the result message contains the text we sent
        await expect(page.locator(resultLocator)).toHaveText(`You entered: ${inputText}`);
        // console.log('Test 3: JS Prompt handled successfully with input.');
    });
});
