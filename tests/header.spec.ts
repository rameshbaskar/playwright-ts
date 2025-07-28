import {test} from '@src/baseTest';
import {User} from '@src/core/types';
import * as UserSeed from '@src/seeds/user.seed';
import HeaderSection from '@src/pages/common/header.section';
import LoginPage from '@src/pages/common/login.page';
import LoginAPIStub from '@src/apiStubs/loginAPI.stub';
import PageHelper from '@src/core/pageHelper';

// Pages
let headerSection: HeaderSection;
let loginPage: LoginPage;

// Stubs
let loginAPIStub: LoginAPIStub;

// Helpers
let pageHelper: PageHelper;

test.describe('Sample specs', () => {
  let user: User;

  test.beforeEach(async ({page}) => {
    // Init
    headerSection = new HeaderSection(page);
    loginPage = new LoginPage(page);
    loginAPIStub = new LoginAPIStub(page);
    pageHelper = new PageHelper(page);

    // Data seeds
    user = await UserSeed.createUser();

    // Default stubs
    await loginAPIStub.simulateSuccess();
  });
  test.afterEach(async () => {
    await UserSeed.deleteUser(user);
  });
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
  test(`should see an error if login fails`, async () => {
    await loginAPIStub.simulateFailure();
    await headerSection.clickLogin();
    await loginPage.login(user);
  });
  test(`should send the GA event when clicking on Login from the header`, async () => {
    await headerSection.clickLogin();
    await pageHelper.verifyGoogleAnalyticsEvent({
      eventName: 'LoginFromHeader',
      eventAction: 'Login-From-Header',
      eventCategory: 'Login',
    });
  });
});
