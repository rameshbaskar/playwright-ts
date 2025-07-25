import {expect, Locator} from '@playwright/test';
import {getPage} from '@src/core/driver';
import {User} from '@src/core/types';

export default class LoginPage {
  private usernameTextBox: Locator;
  private passwordTextBox: Locator;
  private submitButton: Locator;

  constructor() {
    this.usernameTextBox = getPage().getByRole('textbox', {name: 'Username'});
    this.passwordTextBox = getPage().getByRole('textbox', {name: 'Password'});
    this.submitButton = getPage().getByRole('button', {name: 'Login'});
  }

  async shouldBeLoaded() {
    await expect(this.usernameTextBox).toBeVisible();
    await expect(this.passwordTextBox).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async login(user: User) {
    await this.usernameTextBox.fill(user.username);
    await this.passwordTextBox.fill(user.password);
    await this.submitButton.click();
  }
}
