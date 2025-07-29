import {Page, expect, Locator} from '@playwright/test';
import {User} from '@src/core/types';

export default class LoginPage {
  private page: Page;
  private usernameTextBox: Locator;
  private passwordTextBox: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextBox = this.page.getByRole('textbox', {name: 'Username'});
    this.passwordTextBox = this.page.getByRole('textbox', {name: 'Password'});
    this.submitButton = this.page.getByRole('button', {name: 'Login'});
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

  async shouldShowGeneralError() {
    await expect(this.page.getByText('Cannot login. Please try after sometime.')).toBeVisible();
  }

  async shouldShowInvalidLoginError() {
    await expect(this.page.getByText('Invalid Username or Password.')).toBeVisible();
  }
}
