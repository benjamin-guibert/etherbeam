module.exports = {
  roots: ['src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'src/__mocks__/file.ts',
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testRegex: '(\\.|/)test\\.(j|t)sx?$',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js{,x},ts{,x}}',
    '!src/**/*.stories.{js{,x},ts{,x}}',
    '!src/index.tsx',
    '!src/custom.d.ts',
  ],
}
