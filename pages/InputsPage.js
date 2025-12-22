export class InputsPage {
  constructor(page) {
    this.page = page;
    this.inputField = 'input[type="number"]';
  }

  async goto() {
    await this.page.goto('/inputs');
  }

  async fillInput(value) {
    await this.page.locator(this.inputField).fill(value);
  }

  async pressSequentially(value) {
    await this.page.locator(this.inputField).pressSequentially(value);
  }

  async pressKey(key) {
    await this.page.locator(this.inputField).press(key);
  }

  async getInputValue() {
    return await this.page.locator(this.inputField).inputValue();
  }
}