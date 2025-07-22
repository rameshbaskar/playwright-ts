# CLAUDE.md - Codebase Overview

*Last Updated: 2025-07-22*

## Project Summary

A Playwright TypeScript testing framework with PostgreSQL integration featuring connection pooling. This project enables cross-browser testing with robust database connectivity for end-to-end testing scenarios.

## Architecture Overview

### Core Components

1. **Database Layer** (`src/database.ts`)
   - Singleton pattern for connection management
   - PostgreSQL connection pooling using `pg` library
   - Transaction support with automatic rollback
   - Environment-based configuration
   - Pool monitoring capabilities

2. **Application Entry** (`src/index.ts`)
   - Main application bootstrap
   - Database connection demonstration
   - Pool statistics reporting
   - Error handling and graceful shutdown

3. **Testing Framework** (`tests/example.spec.ts`)
   - Playwright test configuration
   - Database integration tests
   - Cross-browser compatibility tests
   - Example UI automation tests

## Key Files and Their Purposes

### Configuration Files
- `tsconfig.json` - TypeScript compilation settings, includes src/ and tests/ directories
- `playwright.config.ts` - Playwright test configuration with multi-browser support
- `package.json` - Project dependencies and npm scripts
- `.env.example` - Environment variables template for database configuration

### Source Code
- `playwright.config.ts` - Playwright test configuration (last modified: 2025-07-17)
- `tsconfig.json` - TypeScript compilation settings (last modified: 2025-07-17)
- `package.json` - Project dependencies and npm scripts (last modified: 2025-07-17)

## Dependencies

### Production Dependencies


### Development Dependencies
- `@ngneat/falso@^8.0.1`
- `@playwright/test@^1.54.1`
- `@types/node@^24.0.13`
- `@types/pg@^8.15.4`
- `@types/uuid@^10.0.0`
- `@typescript-eslint/eslint-plugin@^8.36.0`
- `@typescript-eslint/parser@^8.36.0`
- `bcrypt-ts@^7.1.0`
- `dotenv@^17.2.0`
- `eslint@^9.31.0`
- `eslint-config-prettier@^10.1.5`
- `eslint-plugin-playwright@^2.2.0`
- `eslint-plugin-prettier@^5.5.1`
- `husky@^9.1.7`
- `pg@^8.16.3`
- `prettier@^3.6.2`
- `ts-node@^10.9.2`
- `typescript@^5.8.3`
- `uuid@^11.1.0`

## Environment Configuration

Required environment variables:
- `DB_HOST` - PostgreSQL server host
- `DB_PORT` - PostgreSQL server port
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password

## Build and Test Commands

### Available Scripts
- `yarn build` - tsc
- `yarn test` - playwright test
- `yarn test:headed` - playwright test --headed
- `yarn test:ui` - playwright test --ui
- `yarn test:report` - playwright show-report
- `yarn dev` - ts-node src/index.ts
- `yarn update-claude` - NODE_OPTIONS='--no-warnings=ExperimentalWarning' node --loader ts-node/esm scripts/update-claude-md.ts
- `yarn lint` - eslint . --ext .ts,.js
- `yarn lint:fix` - eslint . --ext .ts,.js --fix
- `yarn prettier` - prettier --write .
- `yarn prettier:check` - prettier --check .
- `yarn check` - yarn lint && yarn prettier:check && yarn build
- `yarn precommit` - yarn update-claude
- `yarn prepare` - husky

### Recommended Development Workflow
1. Set up environment variables by copying `.env.example` to `.env`
2. Install dependencies with `yarn install`
3. Install Playwright browsers with `npx playwright install`
4. Run tests with `yarn test` to verify setup
5. Use `yarn dev` to run the application

## Database Design Patterns

### Connection Pooling
- Maximum 20 concurrent connections
- 30-second idle timeout
- 2-second connection timeout
- Automatic error handling and process exit on pool errors

### Transaction Management
- ACID compliance with BEGIN/COMMIT/ROLLBACK
- Automatic cleanup on success or failure
- Client release guarantee using try/finally blocks

### Query Interface
- Parameterized queries to prevent SQL injection
- Generic type support for result typing
- Connection reuse through pool management

## Testing Strategy

### Test Categories
1. **Database Integration Tests** - Verify database connectivity and operations
2. **UI Automation Tests** - Cross-browser web application testing
3. **Example Tests** - Demonstrate framework capabilities

### Test Configuration
- Parallel execution enabled for performance
- Multiple browser support (Chrome, Firefox, Safari)
- Retry logic for CI environments
- HTML reporting for test results

## Common Tasks for Claude

### Adding New Features
1. **Database Operations**: Extend `src/database.ts` with new methods
2. **Test Cases**: Add new `.spec.ts` files in `tests/` directory
3. **Configuration**: Update environment variables in `.env.example`

### Testing Commands
- Use `yarn test` for headless testing
- Use `yarn test:headed` for debugging with visible browser
- Use `yarn test:ui` for interactive test development

### Build Commands
- Run `yarn build` to compile TypeScript
- Check compilation errors before committing changes

### Debugging Tips
- Database connection issues: Check PostgreSQL service and credentials
- Test failures: Use headed mode to see browser interactions
- TypeScript errors: Run build command to see detailed error messages

## Git Status

**Last Commit**: 036e44f - test: Add sample specs with custom element framework and API stubbing support (4 days ago)

**Uncommitted Changes**:
- M  src/core/driver.ts
- M  src/core/pageHelper.ts
- M  src/core/types.ts
- M  src/core/utils.ts

## Recent Changes

### 2025-07-22 - Auto-Updated
- Updated dependency information
- Refreshed file modification timestamps
- Synchronized git status

### 2025-07-12 - Initial Setup
- Created project structure with Yarn and TypeScript
- Implemented PostgreSQL connection pooling with pg library
- Set up Playwright testing framework with multi-browser support
- Added comprehensive test examples for both database and UI testing
- Created documentation (README.md and this CLAUDE.md)

## Future Considerations

### Potential Enhancements
1. **Database Migrations** - Add schema versioning support
2. **API Testing** - Extend tests to cover REST/GraphQL endpoints
3. **CI/CD Integration** - Add GitHub Actions workflow
4. **Performance Monitoring** - Add database query performance tracking
5. **Logging** - Implement structured logging for debugging

### Maintenance Notes
- Keep Playwright browsers updated with `npx playwright install`
- Monitor PostgreSQL connection pool metrics in production
- Review and update TypeScript dependencies regularly
- Consider adding ESLint/Prettier for code formatting consistency

---

*This file is automatically updated by `scripts/update-claude-md.ts`. Run `yarn update-claude` to refresh.*