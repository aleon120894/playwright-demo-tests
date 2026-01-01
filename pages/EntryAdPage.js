export class EntryAdPage {
  constructor(page) {
    this.page = page;
    this.modal = "#modal";
    this.modalCloseButton = ".modal-footer p";
    this.restartAdLink = "#restart-ad";
    this.modalBodyText = '#modal .modal-body p';
  }

  async goto() {
    await this.page.goto('/entry_ad');
  }

  async isModalVisible() {
    return await this.page.locator(this.modal).isVisible();
  }

  async closeModal() {
    await this.page.locator(this.modalCloseButton).click();
  }

  async clickRestartAd() {
    await this.page.locator(this.restartAdLink).click();
  }

  async reEnableAd() {
    // Use Playwright's cookie API instead of evaluate() for better reliability in CI
    const context = this.page.context();
    const url = new URL(this.page.url());
    
    // Set the cookie to false to re-enable the ad
    // Using the hostname from the current URL ensures correct domain
    await context.addCookies([{
      name: 'entry_ad_closed',
      value: 'false',
      domain: url.hostname,
      path: '/',
    }]);
    
    // Navigate fresh to the page to ensure the cookie is read by the page's JavaScript
    // This is more reliable than reload() in CI environments
    await this.page.goto('/entry_ad', { waitUntil: 'load' });
    
    // Wait for the main page content to be visible, ensuring page is ready
    await this.page.waitForSelector('h3:has-text("Entry Ad")', { state: 'visible' });
    
    // Wait for the modal element to be attached to the DOM
    await this.page.waitForSelector(this.modal, { state: 'attached' });
  }

  async getModalBodyText() {
    return await this.page.locator(this.modalBodyText).textContent();
  }
}