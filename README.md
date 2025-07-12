# Playwright TypeScript with PostgreSQL

A modern testing framework setup using Playwright with TypeScript and PostgreSQL database integration featuring connection pooling.

## Features

- 🎭 **Playwright Testing Framework** - Cross-browser end-to-end testing
- 📘 **TypeScript Support** - Full type safety and modern JavaScript features
- 🐘 **PostgreSQL Integration** - Database connection with pooling for optimal performance
- 🔄 **Connection Pooling** - Efficient database connection management
- 🔒 **Transaction Support** - Safe database operations with rollback capability
- 🏗️ **Modern Architecture** - Singleton pattern for database management
- 🧪 **Test Integration** - Database testing alongside UI testing

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- PostgreSQL database server

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd playwright-ts
yarn install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Database Setup

Copy the environment template and configure your database connection:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=testdb
DB_USER=postgres
DB_PASSWORD=password
```

### 4. Run the Application

```bash
yarn dev
```

### 5. Run Tests

```bash
# Run all tests
yarn test

# Run tests in headed mode (visible browser)
yarn test:headed

# Run tests with UI mode
yarn test:ui

# View test report
yarn test:report
```

## Project Structure

```
playwright-ts/
├── src/
│   ├── database.ts          # Database connection and pooling
│   └── index.ts             # Application entry point
├── tests/
│   └── example.spec.ts      # Example Playwright tests
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variables template
└── package.json            # Project dependencies
```

## Database Usage

### Basic Query

```typescript
import Database from './src/database';

const db = Database.getInstance();
const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

### Transactions

```typescript
const result = await db.transaction(async (client) => {
  await client.query('INSERT INTO users (name) VALUES ($1)', ['John']);
  await client.query('INSERT INTO profiles (user_id) VALUES ($1)', [userId]);
  return 'Success';
});
```

### Connection Pool Monitoring

```typescript
console.log(`Total connections: ${db.totalCount}`);
console.log(`Idle connections: ${db.idleCount}`);
console.log(`Waiting connections: ${db.waitingCount}`);
```

## Testing

### Running Tests

- `yarn test` - Run all tests headlessly
- `yarn test:headed` - Run tests with visible browser
- `yarn test:ui` - Interactive test runner
- `yarn test:report` - View HTML test report

### Test Types

1. **UI Tests** - Cross-browser web application testing
2. **Database Tests** - Integration tests with PostgreSQL
3. **API Tests** - Backend service testing

### Example Test

```typescript
import { test, expect } from '@playwright/test';
import Database from '../src/database';

test('database integration', async () => {
  const db = Database.getInstance();
  const result = await db.query('SELECT 1 as test');
  expect(result[0].test).toBe(1);
});
```

## Configuration

### Database Configuration

The database connection can be configured through environment variables or by passing a config object:

```typescript
const db = Database.getInstance({
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'myuser',
  password: 'mypassword',
  max: 20, // max number of clients in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Playwright Configuration

Key settings in `playwright.config.ts`:

- **Test Directory**: `./tests`
- **Browsers**: Chrome, Firefox, Safari
- **Parallel Execution**: Enabled
- **Retries**: 2 on CI, 0 locally
- **Base URL**: `http://localhost:3000`

## Scripts

| Script | Description |
|--------|-------------|
| `yarn build` | Compile TypeScript to JavaScript |
| `yarn test` | Run Playwright tests |
| `yarn test:headed` | Run tests with visible browser |
| `yarn test:ui` | Interactive test runner |
| `yarn test:report` | View HTML test report |
| `yarn dev` | Run application in development mode |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `testdb` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `password` |

## Development

### Adding New Tests

Create test files in the `tests/` directory with `.spec.ts` extension:

```typescript
import { test, expect } from '@playwright/test';

test('my new test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/My App/);
});
```

### Database Migrations

For database schema changes, consider using a migration tool like:
- [node-pg-migrate](https://github.com/salsita/node-pg-migrate)
- [Knex.js migrations](https://knexjs.org/guide/migrations.html)
- [Prisma](https://www.prisma.io/)

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure PostgreSQL is running
   - Check environment variables
   - Verify database credentials

2. **Tests Failing**
   - Run `npx playwright install` to ensure browsers are installed
   - Check if application server is running for web tests

3. **TypeScript Errors**
   - Run `yarn build` to check for compilation errors
   - Ensure all dependencies are installed

### Debugging

- Use `yarn test:headed` to see browser interactions
- Add `await page.pause()` in tests for debugging
- Check browser console logs in test reports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details.