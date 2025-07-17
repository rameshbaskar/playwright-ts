import {defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 120000, // Each test should complete within 2 mins
  fullyParallel: true,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', {open: 'never'}]],
  globalSetup: './globalSetup',
  globalTeardown: './globalTeardown',
  use: {
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},
    },
  ],
});
