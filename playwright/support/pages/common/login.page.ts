import {expect} from '@playwright/test';
import {getPage} from '@support/core/driver';
import {User} from '@support/core/types';

const locators = {
  usernameTextBox: () => getPage().getByRole('textbox', {name: 'Username'}),
  passwordTextBox: () => getPage().getByRole('textbox', {name: 'Password'}),
  loginButton: () => getPage().getByRole('button', {name: 'Login'}),
};

export const shouldBeLoaded = async () => {
  await expect(locators.usernameTextBox()).toBeVisible();
  await expect(locators.passwordTextBox()).toBeVisible();
  await expect(locators.loginButton()).toBeVisible();
};

export const login = async (user: User) => {
  await locators.usernameTextBox().fill(user.username);
  await locators.passwordTextBox().fill(user.password);
  await locators.loginButton().click();
};

export const shouldShowGeneralError = async () => {
  await expect(getPage().getByText('Cannot login. Please try after sometime.')).toBeVisible();
};

export const shouldShowInvalidLoginError = async () => {
  await expect(getPage().getByText('Invalid credentials.')).toBeVisible();
};
