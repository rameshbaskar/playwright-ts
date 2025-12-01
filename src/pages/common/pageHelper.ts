import {GoogleAnalyticsEvent} from '@src/core/types';
import {Page, expect, Request} from '@playwright/test';

type DataLayerEvent = {
  event: string;
  event_action: string;
  event_category: string;
  event_label?: string;
};

export default class PageHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url = '') {
    await this.page.goto(url);
  }

  async createLoggedInSession(username: string) {
    const token = encodeURIComponent(
      JSON.stringify({
        username: username,
        iat: null,
        eat: null,
      }),
    );
    await this.goto(`${process.env.LOGIN_API_URL}?token=${token}&redirect=${process.env.BASE_URL}`);
    await this.goto('/');
  }

  async getDataLayerEvents() {
    return await this.page.evaluate('window.dataLayer');
  }

  async getGoogleAnalyticsEvents() {
    const dataLayerEvents = (await this.getDataLayerEvents()) as DataLayerEvent[];
    const googleAnalyticsEvents: Array<GoogleAnalyticsEvent> = [];
    for (const event of dataLayerEvents) {
      googleAnalyticsEvents.push({
        eventName: event['event'],
        eventAction: event['event_action'],
        eventCategory: event['event_category'],
        eventLabel: event['event_label'],
      });
    }
    return googleAnalyticsEvents;
  }

  async verifyGoogleAnalyticsEvent(expEvent: GoogleAnalyticsEvent) {
    const actualEvents = await this.getGoogleAnalyticsEvents();
    const matchedEvent = actualEvents.find(
      (e) =>
        e.eventName === expEvent.eventName &&
        e.eventAction === expEvent.eventAction &&
        e.eventCategory === expEvent.eventCategory &&
        e.eventLabel === expEvent.eventLabel,
    );
    expect(matchedEvent).not.toBeUndefined();
  }

  waitForRequest(urlPattern: string, method: string) {
    let request: Request | undefined;
    this.page.on('request', (r) => {
      if (r.url().includes(urlPattern) && r.method().toLowerCase() === method.toLowerCase()) {
        request = r;
      }
    });
    return request;
  }
}
