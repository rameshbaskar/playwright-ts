import {test} from '@playwright/test';
import {User} from '@support/core/types';
import UserSeed from '@support/seeds/user.seed';
import HomePage from '@support/pages/common/home.page';
import HeaderSection from '@support/pages/common/header.section';
import LoginPage from '@support/pages/common/login.page';
import LoginApiStub from '@support/apiStubs/loginApi.stub';

test.describe('User logs in and out', () => {
  let user: User;
  let loginApiStub: LoginApiStub;
  let homePage: HomePage;
  let headerSection: HeaderSection;
  let loginPage: LoginPage;

  const userSeed = new UserSeed();

  test.beforeEach(async ({page}) => {
    loginApiStub = new LoginApiStub(page);
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    headerSection = new HeaderSection(page);
  });
  test.afterEach(async () => {
    await userSeed.deleteUser(user);
  });

  test.describe('User not logged in', () => {
    test.beforeEach(async () => {
      await loginApiStub.stubWithDefault();
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
        await headerSection.verifyGAEvent({
          event: 'LoginFromHeader',
          event_action: 'Login-From-Header',
          event_category: 'Login',
          event_label: user.guid,
        });
      });
    });

    test.describe('Failure conditions', () => {
      test(`should see an error if login is invalid`, async () => {
        await loginApiStub.simulateError(401);
        await headerSection.clickLogin();
        await loginPage.login(user);
        await loginPage.shouldShowInvalidLoginError();

        // Check the header in the home page
        await homePage.visit();
        await headerSection.shouldBeLoggedOut();
      });
      test(`should see an error if login API errors out`, async () => {
        await loginApiStub.simulateError(500);
        await headerSection.clickLogin();
        await loginPage.login(user);
        await loginPage.shouldShowGeneralError();

        // Check the header in the home page
        await homePage.visit();
        await headerSection.shouldBeLoggedOut();
      });
    });
  });

  test.describe('User already logged in', () => {
    test.beforeEach(async () => {
      await homePage.createAuthSession(user.username);
    });
    test(`should send the GA event when clicking on Logout from the header`, async () => {
      await headerSection.clickLogout();
      await headerSection.verifyGAEvent({
        event: 'LogoutFromHeader',
        event_action: 'Logout-From-Header',
        event_category: 'Logout',
        event_label: user.guid,
      });
    });
  });
});
