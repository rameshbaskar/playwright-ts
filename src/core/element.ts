import {expect} from '@playwright/test';
import {getPage} from './driver';

const DEFAULT_TIMEOUT = 20000;
const WAIT_INTERVALS = [500, 1000, 2000, 5000]; // Polling intervals for assertions

const DEFAULT_ASSERTION_PARAMS = {
  timeout: DEFAULT_TIMEOUT,
  intervals: WAIT_INTERVALS,
};

export default class Element {
  private selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  locator() {
    const isTestId = new RegExp(/[[#.=]/).exec(this.selector) === null;
    return isTestId ? getPage().getByTestId(this.selector) : getPage().locator(this.selector);
  }

  async click(force = false) {
    await this.locator().click({force: force});
  }

  async fill(value: string, clear = false) {
    if (clear) await this.locator().clear();
    await this.locator().fill(value);
  }

  async hover() {
    await this.locator().hover();
  }

  async verifyVisibility(visible: boolean) {
    await expect(async () => {
      if (visible) {
        await expect(this.locator()).toBeVisible();
      } else {
        await expect(this.locator()).not.toBeVisible();
      }
    }).toPass(DEFAULT_ASSERTION_PARAMS);
  }

  async verifyInnerText(expText: string, contains = true) {
    await expect(async () => {
      const innerText = await this.locator().innerText();
      if (contains) {
        expect(innerText).toContain(expText);
      } else {
        expect(innerText).not.toContain(expText);
      }
    }).toPass(DEFAULT_ASSERTION_PARAMS);
  }

  async verifyContainsText(expText: string, contains = true) {
    await expect(async () => {
      if (contains) {
        await expect(this.locator()).toContainText(expText);
      } else {
        await expect(this.locator()).not.toContainText(expText);
      }
    }).toPass(DEFAULT_ASSERTION_PARAMS);
  }

  async verifyHasAttribute(attrName: string, attrValue: string, contains = true) {
    await expect(async () => {
      if (contains) {
        await expect(this.locator()).toHaveAttribute(attrName, attrValue);
      } else {
        await expect(this.locator()).not.toHaveAttribute(attrName, attrValue);
      }
    }).toPass(DEFAULT_ASSERTION_PARAMS);
  }
}
