import {test as base} from '@playwright/test';

export const test = base.extend({
	page: async ({page}, use) => {
		// Automatically navigate to the BASE_URL
		await page.goto(process.env.BASE_URL!);

		// Yield the page to the test to use as a custom fixture
		await use(page);
	},
});