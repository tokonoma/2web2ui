module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/containers/**',
    '!src/**/*.container.{js,jsx}',
    '!src/**/*.fake.{js,jsx}',
  ],
  coverageDirectory: 'build-reports',
  coverageReporters: ['lcov', 'text'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/App.js',
    '<rootDir>/src/store.js',
    '<rootDir>/src/config',
    '<rootDir>/src/helpers/registerServiceWorker',
    '<rootDir>/src/reducers',
    'tests/helpers/',
    'index.js',
    // Uses `require.context` which is provided by Webpack and hard to test
    '<rootDir>/src/components/notifications/staticMarkdownNotifications.js',
    // TODO: Temporary file that will need to be removed when this feature is live
    '<rootDir>/src/pages/NotificationTestPage.js',
    // covered by Cypress
    '<rootDir>/src/pages/billing/forms/ChangePlanForm.js',
  ],
  reporters: ['default', 'jest-junit'],
  testResultsProcessor: './node_modules/jest-junit-reporter',
  setupFiles: ['<rootDir>/config/polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js?(x)',
    '<rootDir>/(eslint-plugins|src|scripts)/**/*.test.js?(x)',
  ],
  testEnvironment: 'node',
  testURL: 'http://phoenix.test',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  snapshotSerializers: ['<rootDir>/node_modules/enzyme-to-json/serializer'],
  modulePaths: [''],
  clearMocks: true,
  restoreMocks: true,
  globals: {
    SUPPORTED_BROWSERS: {},
    TENANT_CONFIGS: {},
  },
  watchPathIgnorePatterns: ['<rootDir>/build'],
};
