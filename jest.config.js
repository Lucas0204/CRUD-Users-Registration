module.exports = {
  clearMocks: true,
  restoreMocks: true,
  testEnvironment: "node",
  testMatch: [
    "**/**/*.spec.js" 
  ],
  // collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "lcov"
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/queue.js",
    "!src/**/database/*.js",
    "!src/**/config/*.js",
    "!src/**/jobs/*.js",
    "!src/**/modules/*.js"
  ],
  watchPathIgnorePatterns: [
    "node_modules"
  ]
};
