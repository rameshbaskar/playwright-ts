import {stubRequest} from '@src/core/pageHelper';
import loginSuccessResponse from '@src/fixtures/mockResponses/LoginSuccessResponse.json' assert {type: 'json'};

const urlPattern = '**/v2/auth/login?**';

export const simulateSuccess = async () => {
  await stubRequest(urlPattern, loginSuccessResponse);
};

export const simulateFailure = async () => {
  await stubRequest(urlPattern, {}, 403);
};
