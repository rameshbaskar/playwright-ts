import {Page} from '@playwright/test';

export default class APIRequest {
  private page: Page;
  private urlPattern: string;

  constructor(page: Page, urlPattern: string) {
    this.page = page;
    this.urlPattern = urlPattern;
  }

  async stub(payload: object, statusCode = 200) {
    await this.page.route(this.urlPattern, async (route) => {
      await route.fulfill({
        status: statusCode,
        body: JSON.stringify(payload),
        contentType: 'application/json',
      });
    });
  }

  async delay(timeInMS: number, payload?: object) {
    await this.page.route(this.urlPattern, (route) => {
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        if (payload) {
          route.fulfill({
            status: 200,
            body: JSON.stringify(payload),
            contentType: 'application/json',
          });
        } else {
          route.continue();
        }
      }, timeInMS);
    });
  }

  async simulateUnAuthorised() {
    await this.stub({}, 403);
  }

  async simulateGeneralError() {
    await this.stub({}, 500);
  }

  async simulateNotFound() {
    await this.stub({}, 404);
  }
}
