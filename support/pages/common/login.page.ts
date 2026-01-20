import {expect, Locator, Page} from '@playwright/test';
import {User} from '@support/core/types';
import BasePage from '@support/pages/base.page';

export default class LoginPage extends BasePage {
  readonly usernameTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameTextBox = page.getByRole('textbox', {name: 'Username'});
    this.passwordTextBox = page.getByRole('textbox', {name: 'Password'});
    this.loginButton = page.getByRole('button', {name: 'Login'});
  }

  async shouldBeLoaded() {
    await expect(this.usernameTextBox).toBeVisible();
    await expect(this.passwordTextBox).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(user: User) {
    await this.usernameTextBox.fill(user.username);
    await this.passwordTextBox.fill(user.password);
    await this.loginButton.click();
  }

  async shouldShowGeneralError() {
    const error = this.page.getByText('Cannot login. Please try after sometime.');
    await expect(error).toBeVisible();
  }

  async shouldShowInvalidLoginError() {
    const error = this.page.getByText('Invalid credentials.');
    await expect(error).toBeVisible();
  }
}
