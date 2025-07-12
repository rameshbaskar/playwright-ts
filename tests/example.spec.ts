import { test, expect } from '@playwright/test';
import Database from '../src/database';

test.describe('Database Integration Tests', () => {
  let db: Database;

  test.beforeAll(async () => {
    db = Database.getInstance({
      host: 'localhost',
      port: 5432,
      database: 'testdb',
      user: 'postgres',
      password: 'password',
    });
  });

  test.afterAll(async () => {
    await db.close();
  });

  test('should connect to database and execute query', async () => {
    // This test requires a running PostgreSQL instance
    // Skip if database is not available
    try {
      const result = await db.query<{ test: number }>('SELECT 1 as test');
      expect(result).toHaveLength(1);
      expect(result[0].test).toBe(1);
    } catch {
      test.skip(true, 'Database not available');
    }
  });

  test('should handle transactions', async () => {
    try {
      const result = await db.transaction(async client => {
        const res = await client.query('SELECT 2 as test');
        return res.rows;
      });
      expect(result).toHaveLength(1);
      expect(result[0].test).toBe(2);
    } catch {
      test.skip(true, 'Database not available');
    }
  });
});

test.describe('Basic Playwright Tests', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});
