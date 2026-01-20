import {defineConfig} from '@playwright/test';

// Load the environment
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './playwright/tests',
  timeout: 120000, // Each test should complete within 2 mins
  fullyParallel: true,
  retries: process.env.RUN_ENV === 'local' ? 0 : 2,
  workers: undefined,
  reporter: [['list'], ['html', {open: 'never'}]],
  globalSetup: './globalSetup',
  projects: [
    {
      // For UI
      name: 'ui',
      testMatch: `**/ui/**/*.spec.ts`,
      use: {
        baseURL: process.env.UI_BASE_URL,
        ignoreHTTPSErrors: true,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
      },
    },
    {
      // For API
      name: 'api',
      testMatch: `**/api/**/*.spec.ts`,
      use: {
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          Accept: 'application/json',
          Authorization: `token ${process.env.API_KEY}`,
        },
      },
    },
  ],
});
