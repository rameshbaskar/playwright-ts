import {Page} from '@playwright/test';
import BaseStub from './base.stub';

import DefaultResponse from '@src/fixtures/mockResponses/loginSuccessResponse.json' assert {type: 'json'};

export default class LoginApiStub extends BaseStub {
	constructor(page: Page) {
		super(
			page,
			`**/v2/auth/login?**`,
			DefaultResponse,
			200,
		);
	}
}
