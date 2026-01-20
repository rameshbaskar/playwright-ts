import {expect, Page, Locator} from '@playwright/test';
import BasePage from '@support/pages/base.page';

export default class HeaderSection extends BasePage {
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.getByTestId('header-logo');
    this.homeLink = page.getByRole('link', {name: 'Home'});
    this.loginLink = page.getByRole('link', {name: 'Login'});
    this.logoutLink = page.getByRole('link', {name: 'Logout'});
  }

  async shouldBeLoaded() {
    await this.verifyLink(this.logo, process.env.BASE_URL!, true);
    await this.verifyLink(this.homeLink, process.env.BASE_URL!, true);
  }

  async shouldBeLoggedIn() {
    await expect(this.loginLink).not.toBeVisible();
    await expect(this.logoutLink).toBeVisible();
  }

  async shouldBeLoggedOut() {
    await expect(this.loginLink).toBeVisible();
    await expect(this.logoutLink).not.toBeVisible();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }
}
