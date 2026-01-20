import {test, expect} from '@playwright/test';

test.describe('Health check API tests', () => {
  test(`should respond with 200`, async ({request}) => {
    const response = await request.get(`/health-check`);
    expect(response.status()).toBe(200);
  });
});
