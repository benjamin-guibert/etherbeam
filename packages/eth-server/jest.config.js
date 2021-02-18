module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/index.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testMatch: ['**/?(*.)+(spec|test).{js,ts}'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  transformIgnorePatterns: [],
}
