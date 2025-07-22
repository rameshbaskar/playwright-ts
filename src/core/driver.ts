import {chromium, Browser, Page} from '@playwright/test';

let browser: Browser;
let page: Page;

export const init = async () => {
  browser = await chromium.launch();
  page = await openNewTabInNewWindow();
};

export const openNewTabInSameWindow = async () => {
  if (!page) {
    throw new Error('No browser tab is initialised. Did you call init() ??');
  }
  return await page.context().newPage();
};

export const openNewTabInNewWindow = async () => {
  return await browser.newPage();
};

export const getPage = () => {
  return page;
};
