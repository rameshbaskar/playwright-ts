# Playwright Test Automation Framework

This is a test automation framework using Playwright with TypeScript for UI and API testing.

## Features

- 🎭 **Playwright Testing Framework** - Cross-browser end-to-end testing
- 📘 **TypeScript Support** - Full type safety and modern JavaScript features
- 🚀 **UI & API Testing** - Separate configurations for UI and API tests
- 🐘 **PostgreSQL Integration** - Postgres database support for data seeding
- 💅 **Linting & Formatting** - ESLint and Prettier for code quality and consistency

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- PostgreSQL database server (for running tests that require database interaction)

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/rameshbaskar/playwright-ts.git
cd playwright-ts
yarn install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Environment Setup

Copy the environment template and configure your environment variables:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials and application URLs.

### 4. Run Tests

```bash
# Run all tests (UI and API)
yarn test:all

# Run only UI tests
yarn test:e2e

# Run only API tests
yarn test:api

# View the test report
yarn test:report
```

## Project Structure

```
playwright-ts/
├── support/
│   ├── apiStubs/         # API stubs for mocking API responses
│   ├── core/             # Custom type definitions and utility functions
│   ├── fixtures/         # Mock API responses and data files
│   ├── pages/            # Page-Object-Model (POM) files for UI tests
│   ├── seeds/            # Data seeding utilities for the database
├── tests/
│   ├── ui/               # UI test specifications
│   ├── api/              # API test specifications
├── .env.example          # Environment variables template
├── globalSetup.ts        # Global setup file for tests
├── package.json          # Project dependencies and scripts
├── playwright.config.ts  # Playwright configuration
└── tsconfig.json         # TypeScript configuration
```

## Available Scripts

| Script              | Description                                               |
|---------------------|-----------------------------------------------------------|
| `build`             | Compiles the TypeScript code.                             |
| `test:all`          | Runs all tests (UI and API).                              |
| `test:e2e`          | Runs only the UI tests.                                   |
| `e2e:headed`        | Runs the UI tests in headed mode (visible browser).       |
| `e2e:debug`         | Runs the UI tests in debug mode.                          |
| `e2e:interactive`   | Runs the UI tests in interactive UI mode.                 |
| `test:api`          | Runs only the API tests.                                  |
| `api:debug`         | Runs the API tests in debug mode.                         |
| `api:interactive`   | Runs the API tests in interactive UI mode.                |
| `test:report`       | Shows the Playwright test report.                         |
| `lint`              | Lints the codebase using ESLint.                          |
| `lint:fix`          | Lints the codebase and automatically fixes issues.        |
| `prettier`          | Formats the codebase using Prettier.                      |
| `prettier:check`    | Checks the formatting of the codebase.                    |
| `check`             | Runs the linter, Prettier check, and TypeScript compiler. |

## Contributing

1.  Fork the repository.
2.  Create a feature branch.
3.  Make your changes.
4.  Add tests for new functionality.
5.  Run the test suite to ensure all tests pass.
6.  Submit a pull request.

## License

UNLICENSED
