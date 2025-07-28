import {Page} from '@playwright/test';
import APIRequest from '@src/core/apiRequest';
import loginSuccessResponse from '@src/fixtures/mockResponses/LoginSuccessResponse.json' assert {type: 'json'};

const URL_PATTERN = '**/v2/auth/login?**';
export default class LoginAPIStub extends APIRequest {
  constructor(page: Page) {
    super(page, URL_PATTERN);
  }

  async simulateSuccess() {
    await this.stub(loginSuccessResponse);
  }

  async simulateFailure() {
    await this.stub({}, 403);
  }
}
