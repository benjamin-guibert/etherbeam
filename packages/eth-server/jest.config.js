module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/index.ts'],
  moduleDirectories: ['node_modules', 'src', 'tests'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [],
}
