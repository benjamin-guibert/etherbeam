import { clearMocks } from '../../helpers'
import {
  sleep,
  sanitizeHash,
  tryAction,
  getAddressHashesFromTransaction,
  isTransactionWatched,
} from 'libraries/helpers'
import { createTransaction, createContract, createToken } from '../../../tests/fixtures/libraries/ethereum'
import { WETH_HASH } from 'libraries/types'

describe('Sleep', () => {
  let result = undefined

  beforeAll(async () => {
    clearMocks()

    const sleepCall = async () => {
      await sleep(5)
      return true
    }

    sleepCall().then((data) => {
      result = data
    })

    jest.runTimersToTime(2)
    await new Promise(setImmediate)
  })

  it('should not return value', () => expect(result).toBeUndefined())

  describe('After', () => {
    beforeAll(async () => {
      jest.runTimersToTime(4)
      await new Promise(setImmediate)
    })

    it('should return value', () => expect(result).toBeTruthy())
  })
})

describe('Try action', () => {
  const action = jest.fn()
  const onError = jest.fn()
  const onNull = jest.fn()

  let result: boolean

  describe('Resolved', () => {
    beforeAll(async () => {
      clearMocks()
      action.mockResolvedValue(true)

      tryAction<boolean>(action, 1000, 1, onError, onNull).then((data) => {
        result = data
      })

      await new Promise(setImmediate)
    })

    it('should return the value', () => expect(result).toBeTruthy())
    it('should call action', () => expect(action).toBeCalledTimes(1))
    it('should not call onError()', () => expect(onError).toBeCalledTimes(0))
    it('should not call onNull()', () => expect(onNull).toBeCalledTimes(0))
  })

  describe('Null', () => {
    beforeAll(async () => {
      clearMocks()
      action.mockResolvedValue(null)

      tryAction<boolean>(action, 1000, 1, onError, onNull).then((data) => {
        result = data
      })

      await new Promise(setImmediate)
      jest.runTimersToTime(1000)
      await new Promise(setImmediate)
      jest.runTimersToTime(1000)
      await new Promise(setImmediate)
    })

    it('should return the value', () => expect(result).toBeNull())
    it('should call action', () => expect(action).toBeCalledTimes(2))
    it('should not call onError()', () => expect(onError).toBeCalledTimes(0))
    it('should call onNull()', () => {
      expect(onNull).toBeCalledTimes(2)
      expect(onNull.mock.calls[0][0]).toEqual(1)
      expect(onNull.mock.calls[1][0]).toEqual(2)
    })
  })

  describe('Null expected', () => {
    beforeAll(async () => {
      clearMocks()
      action.mockResolvedValue(null)
      onNull.mockReturnValue(true)

      tryAction<boolean>(action, 1000, 1, onError, onNull).then((data) => {
        result = data
      })

      await new Promise(setImmediate)
    })

    it('should return the value', () => expect(result).toBeNull())
    it('should call action', () => expect(action).toBeCalledTimes(1))
    it('should not call onError()', () => expect(onError).toBeCalledTimes(0))
    it('should call onNull()', () => {
      expect(onNull).toBeCalledTimes(1)
      expect(onNull.mock.calls[0][0]).toEqual(1)
    })
  })

  describe('Error', () => {
    const error = new Error()

    beforeAll(async () => {
      clearMocks()
      action.mockRejectedValue(error)

      tryAction<boolean>(action, 1000, 1, onError, onNull).then((data) => {
        result = data
      })

      await new Promise(setImmediate)
      jest.runTimersToTime(1000)
      await new Promise(setImmediate)
      jest.runTimersToTime(1000)
      await new Promise(setImmediate)
    })

    it('should return the value', () => expect(result).toBeNull())
    it('should call action', () => expect(action).toBeCalledTimes(2))
    it('should call onError()', () => {
      expect(onError).toBeCalledTimes(2)
      expect(onError.mock.calls[0][0]).toBe(error)
      expect(onError.mock.calls[0][1]).toEqual(1)
      expect(onError.mock.calls[1][0]).toBe(error)
      expect(onError.mock.calls[1][1]).toEqual(2)
    })
    it('should not call onNull()', () => expect(onNull).toBeCalledTimes(0))
  })

  describe('Error expected', () => {
    const error = new Error()

    beforeAll(async () => {
      clearMocks()
      action.mockRejectedValue(error)
      onError.mockReturnValue(true)

      tryAction<boolean>(action, 1000, 1, onError, onNull).then((data) => {
        result = data
      })

      await new Promise(setImmediate)
    })

    it('should return the value', () => expect(result).toBeNull())
    it('should call action', () => expect(action).toBeCalledTimes(1))
    it('should call onError()', () => {
      expect(onError).toBeCalledTimes(1)
      expect(onError.mock.calls[0][0]).toEqual(error)
      expect(onError.mock.calls[0][1]).toEqual(1)
    })
    it('should not call onNull()', () => expect(onNull).toBeCalledTimes(0))
  })
})

describe('Sanitize hash', () => {
  let result: string

  describe('Address', () => {
    beforeAll(() => (result = sanitizeHash('0xABCd000000000000000000000000000000000DeF')))

    it('should return sanitized value', () => expect(result).toEqual('0xabcd000000000000000000000000000000000def'))
  })
  describe('Hash', () => {
    beforeAll(() => (result = sanitizeHash('0xABCd000000000000000000000000000000000000000000000000000000000DeF')))

    it('should return sanitized value', () =>
      expect(result).toEqual('0xabcd000000000000000000000000000000000000000000000000000000000def'))
  })
  describe('Null', () => {
    beforeAll(() => (result = sanitizeHash(null)))

    it('should return null', () => expect(result).toBeNull())
  })
})

describe('Get address hashes from transaction', () => {
  let result: string[]

  beforeAll(() => {
    const transaction = createTransaction()
    transaction.from = '0x0a00000000000000000000000000000000000111'
    transaction.to = '0x0a00000000000000000000000000000000000111'
    transaction.action = {
      hash: '0x0A00000000000000000000000000000000000111',
      name: 'function1',
      parameters: [
        {
          index: 0,
          name: 'input1',
          type: 'address',
          value: '0x0A00000000000000000000000000000000000222',
        },
        {
          index: 1,
          name: 'input2',
          type: 'address[]',
          value: [
            '0x0A00000000000000000000000000000000000222',
            '0x0A00000000000000000000000000000000000333',
            '0x0A00000000000000000000000000000000000444',
          ],
        },
      ],
    }

    result = getAddressHashesFromTransaction(transaction)
  })

  it('should return value', () =>
    expect(result).toEqual([
      '0x0a00000000000000000000000000000000000111',
      '0x0a00000000000000000000000000000000000222',
      '0x0a00000000000000000000000000000000000333',
      '0x0a00000000000000000000000000000000000444',
    ]))
})

describe('Is transaction watched', () => {
  const contracts = [
    createContract('0x0a00000000000000000000000000000000000111'),
    createToken('0x0a00000000000000000000000000000000000222'),
  ]
  let result: boolean

  describe('From', () => {
    beforeAll(() => {
      const transaction = createTransaction()
      transaction.from = '0x0a00000000000000000000000000000000000222'

      result = isTransactionWatched(transaction, contracts)
    })

    it('should return result', () => expect(result).toBeTruthy())
  })

  describe('To', () => {
    beforeAll(() => {
      const transaction = createTransaction()
      transaction.to = '0x0a00000000000000000000000000000000000222'

      result = isTransactionWatched(transaction, contracts)
    })

    it('should return result', () => expect(result).toBeTruthy())
  })

  describe('Action address', () => {
    beforeAll(() => {
      const transaction = createTransaction()
      transaction.action = {
        hash: '0x0A00000000000000000000000000000000000111',
        name: 'function1',
        parameters: [
          {
            index: 0,
            name: 'input1',
            type: 'address',
            value: '0x0A00000000000000000000000000000000000222',
          },
        ],
      }

      result = isTransactionWatched(transaction, contracts)
    })

    it('should return result', () => expect(result).toBeTruthy())
  })

  describe('Action addresses', () => {
    beforeAll(() => {
      const transaction = createTransaction()
      transaction.action = {
        hash: '0x0A00000000000000000000000000000000000111',
        name: 'function1',
        parameters: [
          {
            index: 0,
            name: 'input1',
            type: 'address[]',
            value: ['0x0a00000000000000000000000000000000000222'],
          },
        ],
      }

      result = isTransactionWatched(transaction, contracts)
    })

    it('should return result', () => expect(result).toBeTruthy())
  })
  describe('None', () => {
    beforeAll(() => {
      const transaction = createTransaction()

      result = isTransactionWatched(transaction, contracts)
    })

    it('should return result', () => expect(result).toBeFalsy())
  })
  describe('Contract', () => {
    beforeAll(() => {
      const transaction = createTransaction()
      transaction.from = '0x0a00000000000000000000000000000000000111'

      result = isTransactionWatched(transaction, contracts)
    })

    it('should return result', () => expect(result).toBeFalsy())
  })

  describe('WETH', () => {
    beforeAll(() => {
      const transaction = createTransaction()
      transaction.from = WETH_HASH

      result = isTransactionWatched(transaction, contracts)
    })

    it('should return result', () => expect(result).toBeFalsy())
  })
})
