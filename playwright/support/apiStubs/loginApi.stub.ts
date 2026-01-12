import BaseStub from './base.stub';

import DefaultResponse from '@support/fixtures/mockResponses/loginSuccessResponse.json' assert {type: 'json'};

export default class LoginApiStub extends BaseStub {
  constructor() {
    super(`**/v2/auth/login?**`, DefaultResponse, 200);
  }
}
