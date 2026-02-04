export class WindowsPage {
  constructor(page) {
    this.page = page;
    this.pageHeader = 'h3';
    this.clickHereLink = 'a[href="/windows/new"]';
  }

  async goto() {
    await this.page.goto('/windows');
  }

  async getMainPageHeaderText() {
    return await this.page.locator(this.pageHeader).textContent();
  }

  /**
   * Clicks the "Click Here" link and waits for the new window (page) to open.
   * Returns the newly opened Playwright Page instance.
   */
  async openNewWindow() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator(this.clickHereLink).click(),
    ]);

    await newPage.waitForLoadState('load');
    return newPage;
  }
}


