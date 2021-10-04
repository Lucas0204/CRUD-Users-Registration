module.exports = {
  clearMocks: true,
  restoreMocks: true,
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: [ "**/**/*.spec.js" ],
  watchPathIgnorePatterns: [
    "node_modules"
  ]
  // testPathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],
};
