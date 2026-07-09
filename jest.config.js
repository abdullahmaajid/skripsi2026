/**
 * Jest configuration for the UTBK app project.
 * Uses ts-jest to transform TypeScript files and supports ES modules.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Transform .ts files using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // Module file extensions for import statements
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  // Ignore node_modules except for packages that need transformation
  transformIgnorePatterns: ['/node_modules/'],
  // Enable support for ES module syntax in tests
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  // Map imports of the Prisma client to a lightweight mock so tests run without a DB
  moduleNameMapper: {
    // Map the Prisma client to the mock implementation for all test imports
    '^@/src/lib/prisma$': '<rootDir>/src/lib/__mocks__/prisma.ts',
    '^src/lib/prisma$': '<rootDir>/src/lib/__mocks__/prisma.ts',
    // Resolve the `@` alias used in the project to the project root
    // Resolve the `@` alias used in the project to the `src` directory
    '^@/(.*)$': '<rootDir>/src/$1',
    // Resolve plain `src/` imports
    '^src/(.*)$': '<rootDir>/src/$1',
    // Map the relative import used in older test files to the mock Prisma client
    '^\.\./\.\./src/lib/prisma$': '<rootDir>/src/lib/__mocks__/prisma.ts',
    // Mock auth module used in API route tests
    '^\.\./\.\./src/auth$': '<rootDir>/src/__mocks__/auth.ts',
  },
};
