#!/usr/bin/env ts-node

import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

interface PackageJson {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
}

interface FileInfo {
  path: string;
  purpose: string;
  lastModified: string;
}

class ClaudeMdUpdater {
  private projectRoot: string;
  private claudeMdPath: string;

  constructor() {
    this.projectRoot = process.cwd();
    this.claudeMdPath = join(this.projectRoot, 'CLAUDE.md');
  }

  private getCurrentTimestamp(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getPackageInfo(): PackageJson {
    const packagePath = join(this.projectRoot, 'package.json');
    if (!existsSync(packagePath)) {
      throw new Error('package.json not found');
    }
    return JSON.parse(readFileSync(packagePath, 'utf-8'));
  }

  private getGitInfo(): { lastCommit: string; changes: string[] } {
    try {
      const lastCommit = execSync('git log -1 --format="%h - %s (%cr)"', {
        encoding: 'utf-8',
      }).trim();

      const changes = execSync('git status --porcelain', {
        encoding: 'utf-8',
      })
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.trim());

      return { lastCommit, changes };
    } catch {
      return { lastCommit: 'No git repository', changes: [] };
    }
  }

  private getKeyFiles(): FileInfo[] {
    const keyFiles = [
      'src/database.ts',
      'src/index.ts',
      'tests/example.spec.ts',
      'playwright.config.ts',
      'tsconfig.json',
      'package.json',
    ];

    return keyFiles
      .filter(file => existsSync(join(this.projectRoot, file)))
      .map(file => {
        const fullPath = join(this.projectRoot, file);
        const stats = statSync(fullPath);
        return {
          path: file,
          purpose: this.getFilePurpose(file),
          lastModified: stats.mtime.toISOString().split('T')[0],
        };
      });
  }

  private getFilePurpose(filePath: string): string {
    const purposes: Record<string, string> = {
      'src/database.ts': 'Database abstraction layer with connection pooling',
      'src/index.ts': 'Application entry point and usage examples',
      'tests/example.spec.ts': 'Integration and UI tests',
      'playwright.config.ts': 'Playwright test configuration',
      'tsconfig.json': 'TypeScript compilation settings',
      'package.json': 'Project dependencies and npm scripts',
    };
    return purposes[filePath] || 'Project file';
  }

  private getDependencyChanges(): { added: string[]; updated: string[]; removed: string[] } {
    // This would require storing previous state - for now, return empty
    return { added: [], updated: [], removed: [] };
  }

  public updateClaudeMd(): void {
    const packageInfo = this.getPackageInfo();
    const gitInfo = this.getGitInfo();
    const keyFiles = this.getKeyFiles();
    const timestamp = this.getCurrentTimestamp();

    const claudeContent = `# CLAUDE.md - Codebase Overview

*Last Updated: ${timestamp}*

## Project Summary

A Playwright TypeScript testing framework with PostgreSQL integration featuring connection pooling. This project enables cross-browser testing with robust database connectivity for end-to-end testing scenarios.

## Architecture Overview

### Core Components

1. **Database Layer** (\`src/database.ts\`)
   - Singleton pattern for connection management
   - PostgreSQL connection pooling using \`pg\` library
   - Transaction support with automatic rollback
   - Environment-based configuration
   - Pool monitoring capabilities

2. **Application Entry** (\`src/index.ts\`)
   - Main application bootstrap
   - Database connection demonstration
   - Pool statistics reporting
   - Error handling and graceful shutdown

3. **Testing Framework** (\`tests/example.spec.ts\`)
   - Playwright test configuration
   - Database integration tests
   - Cross-browser compatibility tests
   - Example UI automation tests

## Key Files and Their Purposes

### Configuration Files
- \`tsconfig.json\` - TypeScript compilation settings, includes src/ and tests/ directories
- \`playwright.config.ts\` - Playwright test configuration with multi-browser support
- \`package.json\` - Project dependencies and npm scripts
- \`.env.example\` - Environment variables template for database configuration

### Source Code
${keyFiles.map(file => `- \`${file.path}\` - ${file.purpose} (last modified: ${file.lastModified})`).join('\n')}

## Dependencies

### Production Dependencies
${Object.entries(packageInfo.dependencies || {})
  .map(([name, version]) => `- \`${name}@${version}\``)
  .join('\n')}

### Development Dependencies
${Object.entries(packageInfo.devDependencies || {})
  .map(([name, version]) => `- \`${name}@${version}\``)
  .join('\n')}

## Environment Configuration

Required environment variables:
- \`DB_HOST\` - PostgreSQL server host
- \`DB_PORT\` - PostgreSQL server port
- \`DB_NAME\` - Database name
- \`DB_USER\` - Database username
- \`DB_PASSWORD\` - Database password

## Build and Test Commands

### Available Scripts
${Object.entries(packageInfo.scripts || {})
  .map(([name, script]) => `- \`yarn ${name}\` - ${script}`)
  .join('\n')}

### Recommended Development Workflow
1. Set up environment variables by copying \`.env.example\` to \`.env\`
2. Install dependencies with \`yarn install\`
3. Install Playwright browsers with \`npx playwright install\`
4. Run tests with \`yarn test\` to verify setup
5. Use \`yarn dev\` to run the application

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
1. **Database Operations**: Extend \`src/database.ts\` with new methods
2. **Test Cases**: Add new \`.spec.ts\` files in \`tests/\` directory
3. **Configuration**: Update environment variables in \`.env.example\`

### Testing Commands
- Use \`yarn test\` for headless testing
- Use \`yarn test:headed\` for debugging with visible browser
- Use \`yarn test:ui\` for interactive test development

### Build Commands
- Run \`yarn build\` to compile TypeScript
- Check compilation errors before committing changes

### Debugging Tips
- Database connection issues: Check PostgreSQL service and credentials
- Test failures: Use headed mode to see browser interactions
- TypeScript errors: Run build command to see detailed error messages

## Git Status

**Last Commit**: ${gitInfo.lastCommit}

${
  gitInfo.changes.length > 0
    ? `**Uncommitted Changes**:
${gitInfo.changes.map(change => `- ${change}`).join('\n')}`
    : '**Status**: Working directory clean'
}

## Recent Changes

### ${timestamp} - Auto-Updated
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
- Keep Playwright browsers updated with \`npx playwright install\`
- Monitor PostgreSQL connection pool metrics in production
- Review and update TypeScript dependencies regularly
- Consider adding ESLint/Prettier for code formatting consistency

---

*This file is automatically updated by \`scripts/update-claude-md.ts\`. Run \`yarn update-claude\` to refresh.*`;

    writeFileSync(this.claudeMdPath, claudeContent, 'utf-8');
    console.log(`✅ CLAUDE.md updated successfully at ${timestamp}`);
  }
}

const updater = new ClaudeMdUpdater();
updater.updateClaudeMd();
