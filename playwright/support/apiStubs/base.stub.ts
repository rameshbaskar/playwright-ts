import {getPage} from '@support/core/driver';

export default class BaseStub {
  urlPattern!: string;
  defaultPayload!: object;
  defaultStatusCode!: number;

  constructor(urlPattern: string, defaultPayload: object, defaultStatusCode: number) {
    this.urlPattern = urlPattern;
    this.defaultPayload = defaultPayload;
    this.defaultStatusCode = defaultStatusCode;
  }

  async stubWithCustomPayload(payload: object, statusCode: number) {
    await getPage().route(this.urlPattern, (router) => {
      router.fulfill({
        status: statusCode,
        body: JSON.stringify(payload),
        contentType: 'application/json',
      });
    });
  }

  async stubWithDefault() {
    await this.stubWithCustomPayload(this.defaultPayload, this.defaultStatusCode);
  }

  async delay(ms: number) {
    await getPage().route(this.urlPattern, (router) => {
      setTimeout(() => {
        router.continue();
      }, ms);
    });
  }

  async stubWithDelay(ms: number, payload: object, statusCode: number) {
    await getPage().route(this.urlPattern, (router) => {
      setTimeout(() => {
        router.fulfill({
          status: statusCode,
          body: JSON.stringify(payload),
          contentType: 'application/json',
        });
      }, ms);
    });
  }

  async simulateError(statusCode: number) {
    await this.stubWithCustomPayload({}, statusCode);
  }

  async reset() {
    await getPage().unroute(this.urlPattern);
  }
}
