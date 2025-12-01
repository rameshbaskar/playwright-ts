import {defineConfig} from '@playwright/test';

// Load the environment
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 120000, // Each test should complete within 2 mins
  fullyParallel: true,
  retries: process.env.RUN_ENV === 'local' ? 0 : 2,
  workers: undefined,
  reporter: [['list'], ['html', {open: 'never'}]],
  globalSetup: './globalSetup',
  globalTeardown: './globalTeardown',
  use: {
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
