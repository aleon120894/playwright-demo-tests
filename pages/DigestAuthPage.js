export class DigestAuthPage {
  constructor(page) {
    this.page = page;
    this.successMessage = '#content > div > p';
  }

  async gotoWithAuth(username, password) {
    const authUrl = `https://${username}:${password}@the-internet.herokuapp.com/digest_auth`;
    await this.page.goto(authUrl);
  }

  async getSuccessMessage() {
    return await this.page.locator(this.successMessage).textContent();
  }
}