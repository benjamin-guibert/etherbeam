module.exports = {
  roots: ['src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  // TODO: Next line enables absolute import path for tests but tests don't execute anymore.
  // moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(\\.|/)test\\.(j|t)s$',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/index.ts'],
}
