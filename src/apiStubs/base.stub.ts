import {Page} from '@playwright/test';

export default class BaseStub {
	page!: Page;
	urlPattern!: string;
	defaultPayload!: object;
	defaultStatusCode!: number;

	constructor(
		page: Page,
		urlPattern: string,
		defaultPayload: object,
		defaultStatusCode: number,
	) {
		this.page = page;
		this.urlPattern = urlPattern;
		this.defaultPayload = defaultPayload;
		this.defaultStatusCode = defaultStatusCode;
	}

	async stubWithCustomPayload(payload: object, statusCode: number) {
		await this.page.route(this.urlPattern, (router) => {
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
		await this.page.route(this.urlPattern, (router) => {
			setTimeout(() => {
				router.continue();
			}, ms);
		});
	}

	async stubWithDelay(ms: number, payload: object, statusCode: number) {
		await this.page.route(this.urlPattern, (router) => {
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
		await this.page.unroute(this.urlPattern);
	}
}