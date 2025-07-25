import {expect, Locator} from '@playwright/test';
import {getPage} from '@src/core/driver';

export default class HeaderSection {
  private logoEl: Locator;
  private homeLinkEl: Locator;
  private loginLinkEl: Locator;
  private logoutLinkEl: Locator;

  constructor() {
    this.logoEl = getPage().getByTestId('header-logo');
    this.homeLinkEl = getPage().getByRole('link', {name: 'Home'});
    this.loginLinkEl = getPage().getByRole('link', {name: 'Login'});
    this.logoutLinkEl = getPage().getByRole('link', {name: 'Logout'});
  }

  async shouldBeLoaded() {
    // Logo
    await expect(this.logoEl).toBeVisible();
    await expect(this.logoEl).toHaveAttribute('href', process.env.BASE_URL!);
    await expect(this.logoEl).toHaveAttribute('target', '_blank');

    // Home page link
    await expect(this.homeLinkEl).toBeVisible();
    await expect(this.homeLinkEl).toHaveAttribute('href', process.env.BASE_URL!);
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
