import {test} from '@src/core/fixture';
import {User} from '@src/core/types';
import UserSeed from '@src/seeds/user.seed';
import HeaderSection from '@src/pages/common/header.section';
import LoginPage from '@src/pages/common/login.page';
import LoginAPIStub from '@src/apiStubs/loginAPI.stub';
import PageHelper from '@src/pages/common/pageHelper';

test.describe('User logs in and out', () => {
	let headerSection: HeaderSection;
	let loginPage: LoginPage;
	let loginAPIStub: LoginAPIStub;
	let pageHelper: PageHelper;
	let user: User;
	const userSeed = new UserSeed();

	test.afterEach(async () => {
		await userSeed.deleteUser(user);
	});

	test.describe('User not logged in', () => {
		test.beforeEach(async ({page}) => {
			headerSection = new HeaderSection(page);
			loginPage = new LoginPage(page);
			pageHelper = new PageHelper(page);
			loginAPIStub = new LoginAPIStub(page);
			await loginAPIStub.stubWithDefault();
			user = await userSeed.createUser();
		});
		test.describe('Success conditions', () => {
			test(`should see the correct header`, async () => {
				await headerSection.shouldBeLoaded();
				await headerSection.shouldBeLoggedOut();
			});
			test(`should be able to login and logout from the header`, async () => {
				// Login
				await headerSection.clickLogin();
				await loginPage.shouldBeLoaded();
				await loginPage.login(user);
				await headerSection.shouldBeLoggedIn();

				// Logout
				await headerSection.clickLogout();
				await headerSection.shouldBeLoggedOut();
			});
			test(`should send the GA event when clicking on Login from the header`, async () => {
				await headerSection.clickLogin();
				await pageHelper.verifyGoogleAnalyticsEvent({
					eventName: 'LoginFromHeader',
					eventAction: 'Login-From-Header',
					eventCategory: 'Login',
					eventLabel: user.guid,
				});
			});
		});
		
		test.describe('Failure conditions', () => {
			test(`should see an error if login is invalid`, async () => {
				await loginAPIStub.simulateError(401);
				await headerSection.clickLogin();
				await loginPage.login(user);
				await loginPage.shouldShowInvalidLoginError();

				// Check the header in the home page
				await pageHelper.goto('/');
				await headerSection.shouldBeLoggedOut();
			});
			test(`should see an error if login API errors out`, async () => {
				await loginAPIStub.simulateError(500);
				await headerSection.clickLogin();
				await loginPage.login(user);
				await loginPage.shouldShowGeneralError();

				// Check the header in the home page
				await pageHelper.goto('/');
				await headerSection.shouldBeLoggedOut();
			});
		});
	});

	test.describe('User already logged in', () => {
		test.beforeEach(async ({auth}) => {
			headerSection = new HeaderSection(auth.page);
			pageHelper = new PageHelper(auth.page);
			user = auth.user;
			await pageHelper.createLoggedInSession(user.username);
		});
		test(`should send the GA event when clicking on Logout from the header`, async () => {
			await headerSection.clickLogout();
			await pageHelper.verifyGoogleAnalyticsEvent({
				eventName: 'LogoutFromHeader',
				eventAction: 'Logout-From-Header',
				eventCategory: 'Logout',
				eventLabel: user.guid,
			});
		});
	});
});
