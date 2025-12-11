import {test} from '@playwright/test';
import {init} from '@src/core/driver';
import {User} from '@src/core/types';
import UserSeed from '@src/seeds/user.seed';
import * as HeaderSection from '@src/pages/common/header.section';
import * as LoginPage from '@src/pages/common/login.page';
import LoginApiStub from '@src/apiStubs/loginApi.stub';
import * as PageHelper from '@src/pages/common/pageHelper';

test.describe('User logs in and out', () => {
  let user: User;
  const userSeed = new UserSeed();
  const loginApiStub = new LoginApiStub();

  test.beforeEach(async () => {
    await init();
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
        await HeaderSection.shouldBeLoaded();
        await HeaderSection.shouldBeLoggedOut();
      });
      test(`should be able to login and logout from the header`, async () => {
        // Login
        await HeaderSection.clickLogin();
        await LoginPage.shouldBeLoaded();
        await LoginPage.login(user);
        await HeaderSection.shouldBeLoggedIn();

        // Logout
        await HeaderSection.clickLogout();
        await HeaderSection.shouldBeLoggedOut();
      });
      test(`should send the GA event when clicking on Login from the header`, async () => {
        await HeaderSection.clickLogin();
        await PageHelper.verifyGAEvent({
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
        await HeaderSection.clickLogin();
        await LoginPage.login(user);
        await LoginPage.shouldShowInvalidLoginError();

        // Check the header in the home page
        await PageHelper.visit('/');
        await HeaderSection.shouldBeLoggedOut();
      });
      test(`should see an error if login API errors out`, async () => {
        await loginApiStub.simulateError(500);
        await HeaderSection.clickLogin();
        await LoginPage.login(user);
        await LoginPage.shouldShowGeneralError();

        // Check the header in the home page
        await PageHelper.visit('/');
        await HeaderSection.shouldBeLoggedOut();
      });
    });
  });

  test.describe('User already logged in', () => {
    test.beforeEach(async () => {
      await PageHelper.createAuthSession(user.username);
    });
    test(`should send the GA event when clicking on Logout from the header`, async () => {
      await HeaderSection.clickLogout();
      await PageHelper.verifyGAEvent({
        event: 'LogoutFromHeader',
        event_action: 'Logout-From-Header',
        event_category: 'Logout',
        event_label: user.guid,
      });
    });
  });
});
