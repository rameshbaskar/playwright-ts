import {defineConfig, devices} from '@playwright/test';

// Load the environment
import * as dotenv from 'dotenv';
dotenv.config();

// Validate the environment
import env from '@src/core/environment';

export default defineConfig({
  testDir: './tests',
  timeout: 120000, // Each test should complete within 2 mins
  fullyParallel: env.FULLY_PARALLEL,
  retries: 1,
  workers: env.CI ? 1 : undefined,
  reporter: [['list'], ['html', {open: 'never'}]],
  globalSetup: './globalSetup',
  globalTeardown: './globalTeardown',
  use: {
    baseURL: env.BASE_URL,
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
