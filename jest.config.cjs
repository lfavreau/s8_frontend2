module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/"
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.js"],
  transform: {
    "^.+\\.(mjs|cjs|[jt]sx?)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@mswjs|@open-draft|headers-polyfill|msw|rettime|strict-event-emitter|until-async)/)"
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/main.jsx",
    "!src/mocks/**",
    "!src/tests/**"
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
