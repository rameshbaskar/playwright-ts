import {Page, expect, Locator} from '@playwright/test';
import env from '@src/core/environment';

export default class HeaderSection {
  private page: Page;
  private logoEl: Locator;
  private homeLinkEl: Locator;
  private loginLinkEl: Locator;
  private logoutLinkEl: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoEl = this.page.getByTestId('header-logo');
    this.homeLinkEl = this.page.getByRole('link', {name: 'Home'});
    this.loginLinkEl = this.page.getByRole('link', {name: 'Login'});
    this.logoutLinkEl = this.page.getByRole('link', {name: 'Logout'});
  }

  async shouldBeLoaded() {
    // Logo
    await expect(this.logoEl).toBeVisible();
    await expect(this.logoEl).toHaveAttribute('href', env.BASE_URL);
    await expect(this.logoEl).toHaveAttribute('target', '_blank');

    // Home page link
    await expect(this.homeLinkEl).toBeVisible();
    await expect(this.homeLinkEl).toHaveAttribute('href', env.BASE_URL);
    await expect(this.homeLinkEl).toHaveAttribute('target', '_blank');
  }

  async shouldBeLoggedIn() {
    await expect(this.logoutLinkEl).toBeVisible();
    await expect(this.loginLinkEl).toBeHidden();
  }

  async shouldBeLoggedOut() {
    await expect(this.logoutLinkEl).toBeHidden();
    await expect(this.loginLinkEl).toBeVisible();
  }

  async clickLogin() {
    await this.loginLinkEl.click();
  }

  async clickLogout() {
    await this.logoutLinkEl.click();
  }
}
