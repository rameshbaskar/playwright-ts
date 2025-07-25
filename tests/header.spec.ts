import {test} from '@playwright/test';
import {init} from '@src/core/driver';
import {User} from '@src/core/types';
import * as UserSeed from '@src/seeds/user.seed';
import HeaderSection from '@src/pages/common/header.section';
import LoginPage from '@src/pages/common/login.page';
import * as LoginAPIStub from '@src/apiStubs/loginAPI.stub';

test.describe('Sample specs', () => {
  let user: User;
  let headerSection: HeaderSection;
  let loginPage: LoginPage;

  test.beforeEach(async () => {
    await init();
    headerSection = new HeaderSection();
    loginPage = new LoginPage();

    user = await UserSeed.createUser();
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
    await LoginAPIStub.simulateSuccess();
    await headerSection.clickLogin();
    await loginPage.shouldBeLoaded();
    await loginPage.login(user);
    await headerSection.shouldBeLoggedIn();

    // Logout
    await headerSection.clickLogout();
    await headerSection.shouldBeLoggedOut();
  });
  test(`should see an error if login fails`, async () => {
    await LoginAPIStub.simulateFailure();
    await headerSection.clickLogin();
    await loginPage.login(user);
  });
});
