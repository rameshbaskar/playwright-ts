import {getPage} from '@src/core/driver';
import {GoogleAnalyticsEvent} from './types';
import {expect, Request} from '@playwright/test';

type DataLayerEvent = {
  event: string;
  event_action: string;
  event_category: string;
  event_label?: string;
};

export const stubRequest = async (urlPattern: string, payload: object, statusCode = 200) => {
  await getPage().route(urlPattern, async (route) => {
    await route.fulfill({
      status: statusCode,
      body: JSON.stringify(payload),
      contentType: 'application/json',
    });
  });
};

export const delayRequest = async (urlPattern: string, timeInMS: number, payload?: object) => {
  await getPage().route(urlPattern, (route) => {
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
};

export const getDataLayerEvents = async () => {
  return await getPage().evaluate('window.dataLayer');
};

export const getGoogleAnalyticsEvents = async () => {
  const dataLayerEvents = (await getDataLayerEvents()) as DataLayerEvent[];
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
};

export const verifyGoogleAnalyticsEvent = async (expEvent: GoogleAnalyticsEvent) => {
  const actualEvents = await getGoogleAnalyticsEvents();
  const matchedEvent = actualEvents.find(
    (e) =>
      e.eventName === expEvent.eventName &&
      e.eventAction === expEvent.eventAction &&
      e.eventCategory === expEvent.eventCategory &&
      e.eventLabel === expEvent.eventLabel,
  );
  expect(matchedEvent).not.toBeUndefined();
};

export const waitForRequest = (urlPattern: string, method: string) => {
  let request: Request | undefined;
  getPage().on('request', (r) => {
    if (r.url().includes(urlPattern) && r.method().toLowerCase() === method.toLowerCase()) {
      request = r;
    }
  });
  return request;
};
