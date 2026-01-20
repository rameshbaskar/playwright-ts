import {Page} from '@playwright/test';
import BasePage from '@support/pages/base.page';

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
