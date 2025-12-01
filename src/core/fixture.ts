import {test as base} from '@playwright/test';
import {Fixture} from './types';
import UserSeed from '@src/seeds/user.seed';
import PageHelper from '@src/pages/common/pageHelper';

export const test = base.extend<Fixture>({
	// Without authentication
	page: async ({page}, use) => {
		await page.goto(process.env.BASE_URL!);
		await use(page);
	},
	// With authentication
	auth: async ({page}, use) => {
		const pageHelper = new PageHelper(page);
		const user = await new UserSeed().createUser();
		await pageHelper.createLoggedInSession(user.username);
		await page.goto(process.env.BASE_URL!);
		await use({
			page: page,
			user: user,
		});
	},
});