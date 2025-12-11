import {expect} from '@playwright/test';
import {getPage} from '@src/core/driver';
import {verifyLink} from '@src/pages/common/pageHelper';

const locators = {
  logo: () => getPage().getByTestId('header-logo'),
  homeLink: () => getPage().getByRole('link', {name: 'Home'}),
  loginLink: () => getPage().getByRole('link', {name: 'Login'}),
  logoutLink: () => getPage().getByRole('link', {name: 'Logout'}),
};

export const shouldBeLoaded = async () => {
  await verifyLink(locators.logo(), process.env.BASE_URL!, true);
  await verifyLink(locators.homeLink(), process.env.BASE_URL!, true);
};

export const shouldBeLoggedIn = async () => {
  await expect(locators.loginLink()).toBeHidden();
  await expect(locators.logoutLink()).toBeVisible();
};

export const shouldBeLoggedOut = async () => {
  await expect(locators.loginLink()).toBeVisible();
  await expect(locators.logoutLink()).toBeHidden();
};

export const clickLogin = async () => {
  await locators.loginLink().click();
};

export const clickLogout = async () => {
  await locators.logoutLink().click();
};
