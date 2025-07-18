import {chromium, Browser, Page} from '@playwright/test';

let browser: Browser;
let page: Page;

export const init = async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
};

export const getPage = () => {
  return page;
};
