import {chromium, Browser, Page} from '@playwright/test';

let page: Page;
let browser: Browser;

export const init = async () => {
  browser = await chromium.launch();
  page = await (await browser.newContext()).newPage();
};

export const getPage = () => {
  return page;
};
