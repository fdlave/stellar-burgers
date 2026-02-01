import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).ts'],
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@services/(.*)$': '<rootDir>/src/services/$1'
  }
};

export default config;
