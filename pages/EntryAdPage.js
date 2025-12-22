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
    await this.page.reload({ waitUntil: 'load' });
  }

  async getModalBodyText() {
    return await this.page.locator(this.modalBodyText).textContent();
  }
}