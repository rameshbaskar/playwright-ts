import {GoogleAnalyticsEvent} from './types';
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
