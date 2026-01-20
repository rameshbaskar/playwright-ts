import {expect, Page, Locator, Request} from '@playwright/test';
import {GAEvent} from '@support/core/types';

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit(url?: string) {
    await this.page.goto(url || '');
  }

  async createAuthSession(username: string) {
    const token = encodeURIComponent(
      JSON.stringify({
        username: username,
        iat: null,
        eat: null,
      }),
    );
    await this.visit(`${process.env.LOGIN_API_URL}?token=${token}&redirect=${process.env.UI_BASE_URL}`);
  }

  async verifyLink(locator: Locator, href: string, opensInNewTab: boolean) {
    await expect(locator).toHaveAttribute('href', href);
    if (opensInNewTab) {
      await expect(locator).toHaveAttribute('target', '_blank');
    } else {
      await expect(locator).not.toHaveAttribute('target');
    }
  }

  async verifyGAEvent(expEvent: GAEvent) {
    const actualEvents = (await this.page.evaluate('window.dataLayer')) as GAEvent[];
    const matchedEvent = actualEvents.find(
      (e) =>
        e.event === expEvent.event &&
        e.event_action === expEvent.event_action &&
        e.event_category === expEvent.event_category &&
        e.event_label === expEvent.event_label,
    ) as GAEvent;
    expect(matchedEvent).not.toBeUndefined();
  }

  async waitForRequest(urlPattern: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE') {
    let request: Request | undefined;
    this.page.on('request', (r: Request) => {
      if (r.url() === urlPattern && r.method().toUpperCase() === method) {
        request = r;
      }
    });
    return request;
  }
}
