import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: '../../../.',
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/unit/**/*.spec.ts'],
  setupFiles: ['<rootDir>/tests/configurations/jest.setup.js'],
  reporters: [
    'default',
    ['jest-html-reporters', { multipleReportsUnitePath: './reports', pageTitle: 'unit', publicPath: './reports', filename: 'unit.html' }],
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'json'],
  collectCoverageFrom: ['<rootDir>/src/model/models/*.ts', '<rootDir>/src/job/models/*.ts', '<rootDir>/src/flow/models/*.ts'],
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
