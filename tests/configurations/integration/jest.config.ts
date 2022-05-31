import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: '../../../.',
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/integration/**/*.spec.ts'],
  setupFiles: ['<rootDir>/tests/configurations/jest.setup.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      { multipleReportsUnitePath: './reports', pageTitle: 'integration', publicPath: './reports', filename: 'integration.html' },
    ],
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['<rootDir>/src/model/**/*.ts', '<rootDir>/src/job/**/*.ts', '<rootDir>/src/flow/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  verbose: true,
};

export default config;
