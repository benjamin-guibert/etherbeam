import pino, { Logger } from 'pino'

const getLevel = (): string => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'debug'
    case 'test':
      return 'silent'
    default:
      return 'info'
  }
}

const logger = pino({
  level: getLevel(),
})

export const getLogger = (): Logger => {
  return logger
}
