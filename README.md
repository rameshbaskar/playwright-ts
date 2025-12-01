# Playwright TypeScript with PostgreSQL

A modern testing framework setup using Playwright with TypeScript and PostgreSQL database integration.

## Features

- 🎭 **Playwright Testing Framework** - Cross-browser end-to-end testing
- 📘 **TypeScript Support** - Full type safety and modern JavaScript features
- 🐘 **PostgreSQL Integration** - Postgres database support
- 🔒 **Transaction Support** - Safe database operations with rollback capability
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

### 3. Environment Setup

Copy the environment template and configure your environment:

```bash
cp .env.example .env
```

### 4. Run Tests

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
│   ├── apiStubs/**         # API stubs
│   ├── core/          			# Custom type definitions and useful utils
│   ├── fixtures/**         # Mock API responses and data files
│   ├── pages/**          	# POM (Page-Object-Model) files
│   ├── seeds/**          	# Data manipulation utilities in the database
├── tests/**								# Spec files
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variables template
└── package.json            # Project dependencies
```

## Scripts

| Script 							| Description 											|
|---------------------|-----------------------------------|
| `yarn build` 				| Compile TypeScript to JavaScript 	|
| `yarn test` 				| Run Playwright tests 							|
| `yarn test:headed` 	| Run tests with visible browser 		|
| `yarn test:ui` 			| Interactive test runner 					|
| `yarn test:report` 	| View HTML test report 						|

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

UNLICENSED