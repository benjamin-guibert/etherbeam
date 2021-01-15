module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js{,x},ts{,x}}', '!src/index.tsx', '!src/custom.d.ts'],
  moduleDirectories: ['node_modules', 'src', 'tests'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|scss|jpg|png|svg)$': 'mocks/empty.ts',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
