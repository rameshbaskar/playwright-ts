import {test} from '@playwright/test';
import {User} from '@src/core/types';
import * as UserSeed from '@src/seeds/user.seed';
import * as HeaderSection from '@src/pages/common/header.section';
import * as LoginPage from '@src/pages/common/login.page';
import * as LoginAPIStub from '@src/apiStubs/loginAPI.stub';

test.describe('Sample specs', () => {
  let user: User;
  test.beforeEach(async () => {
    user = await UserSeed.createUser();
  });
  test.afterEach(async () => {
    await UserSeed.deleteUser(user);
  });
  test(`should see the correct header`, async () => {
    await HeaderSection.verifyLoaded();
    await HeaderSection.verifyLoggedOut();
  });
  test(`should be able to login and logout from the header`, async () => {
    // Login
    await LoginAPIStub.simulateSuccess();
    await HeaderSection.clickLogin();
    await LoginPage.verifyLoaded();
    await LoginPage.login(user);
    await HeaderSection.verifyLoggedIn();

    // Logout
    await HeaderSection.clickLogout();
    await HeaderSection.verifyLoggedOut();
  });
  test(`should see an error if login fails`, async () => {
    await LoginAPIStub.simulateFailure();
    await HeaderSection.clickLogin();
    await LoginPage.login(user);
  });
});
