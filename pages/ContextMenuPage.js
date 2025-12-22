export class ContextMenuPage {
  constructor(page) {
    this.page = page;
    this.hotSpot = '#hot-spot';
  }

  async goto() {
    await this.page.goto('/context_menu');
  }

  async rightClickHotSpot() {
    await this.page.locator(this.hotSpot).click({ button: 'right' });
  }
}