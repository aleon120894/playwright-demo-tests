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
    await this.page.evaluate(() => { document.cookie = 'entry_ad_closed=false'; });
    // Reload and wait for the page to be fully loaded
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    // Wait for the main page content to be visible, ensuring page is ready
    await this.page.waitForSelector('h3:has-text("Entry Ad")', { state: 'visible' });
    // Wait for the modal element to be attached to the DOM (it may be hidden initially)
    await this.page.waitForSelector(this.modal, { state: 'attached' });
    // Wait for any JavaScript that controls modal visibility to execute
    await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {
      // If networkidle times out, that's okay - we'll rely on the visibility check
    });
  }

  async getModalBodyText() {
    return await this.page.locator(this.modalBodyText).textContent();
  }
}