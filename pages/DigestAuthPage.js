export class DigestAuthPage {
  constructor(page) {
    this.page = page;
    this.successMessage = '#content > div > p';
  }

  async gotoWithAuth(username, password) {
    // For digest auth, use URL-based authentication
    // Firefox handles invalid credentials differently (throws error), which is expected
    const authUrl = `https://${username}:${password}@the-internet.herokuapp.com/digest_auth`;
    
    try {
      await this.page.goto(authUrl, { waitUntil: 'load', timeout: 15000 });
    } catch (error) {
      // Firefox throws NS_ERROR_NET_EMPTY_RESPONSE with invalid credentials
      // This is expected behavior - authentication failed
      if (error.message.includes('NS_ERROR_NET_EMPTY_RESPONSE') || 
          error.message.includes('net::ERR_EMPTY_RESPONSE') ||
          error.message.includes('NS_BINDING_ABORTED')) {
        // Authentication failed - this is expected for invalid credentials
        // Don't throw, let the test verify this behavior
        return;
      }
      // Re-throw other errors
      throw error;
    }
  }

  async getSuccessMessage() {
    try {
      return await this.page.locator(this.successMessage).textContent({ timeout: 5000 });
    } catch (error) {
      return null;
    }
  }
  
  async isAuthenticated() {
    // Check if we successfully authenticated by looking for the success message
    const message = await this.getSuccessMessage();
    return message !== null && message.includes('Congratulations');
  }
}