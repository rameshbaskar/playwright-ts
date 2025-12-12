import {expect, Request, Locator} from '@playwright/test';
import {getPage} from '@support/core/driver';
import {GAEvent} from '@support/core/types';

export const visit = async (url = '') => {
  await getPage().goto(url);
};

export const createAuthSession = async (username: string) => {
  const token = encodeURIComponent(
    JSON.stringify({
      username: username,
      iat: null,
      eat: null,
    }),
  );
  await visit(`${process.env.LOGIN_API_URL}?token=${token}&redirect=${process.env.BASE_URL}`);
};

const getDataLayerEvents = async () => {
  return await getPage().evaluate('window.dataLayer');
};

export const verifyGAEvent = async (expEvent: GAEvent) => {
  const actualEvents = (await getDataLayerEvents()) as GAEvent[];
  const matchedEvent = actualEvents.find(
    (e) =>
      e.event === expEvent.event &&
      e.event_action === expEvent.event_action &&
      e.event_category === expEvent.event_category &&
      e.event_label === expEvent.event_label,
  ) as GAEvent;
  expect(matchedEvent).not.toBeUndefined();
};

export const waitForRequest = (urlPattern: string, method: 'GET' | 'POST' | 'PUT') => {
  let request: Request | undefined;
  getPage().on('request', (r) => {
    if (r.url().includes(urlPattern) && r.method().toUpperCase() === method) {
      request = r;
    }
  });
  return request;
};

export const verifyLink = async (locator: Locator, href: string, opensInNewTab: boolean) => {
  await expect(locator).toHaveAttribute('href', href);
  if (opensInNewTab) {
    await expect(locator).toHaveAttribute('target', '_blank');
  } else {
    await expect(locator).not.toHaveAttribute('target');
  }
};
