module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js{,x},ts{,x}}',
    '!src/**/*.stories.{js{,x},ts{,x}}',
    '!src/index.tsx',
    '!src/custom.d.ts',
  ],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'src/__mocks__/file.ts',
    '^.+\\.(css|less|scss)$': 'babel-jest',
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
