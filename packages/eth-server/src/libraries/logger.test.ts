import { getLogger } from './logger'
import { Logger } from 'pino'

describe('Get logger', () => {
  let logger1: Logger
  let logger2: Logger

  beforeAll(() => {
    process.env.NODE_ENV = 'test'

    logger1 = getLogger()
    logger2 = getLogger()
  })

  it('should be defined', () => {
    expect(logger1).toBeDefined()
    expect(logger1.level).toBe('silent')
  })
  it('should return same logger', () => expect(logger2).toBe(logger1))
})
