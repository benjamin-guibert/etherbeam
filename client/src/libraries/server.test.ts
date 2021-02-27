import { createServerData, createTokenData, createUserData } from '../../tests/fixtures/server'
import { mocked } from 'ts-jest/utils'
import { BigNumber } from 'ethers'
import { clearMocks } from '../../tests/helpers'
import { callApi, createApiClient, HttpStatus, RestAction } from '@cryptotentanz/api-client'
import { AddressType, HistoryTime, Token, USDC_HASH, User, WETH_HASH } from './types'

jest.mock('@cryptotentanz/api-client')
jest.mock('./storage')
const callApiMock = mocked(callApi)

import {
  fetchTokens,
  fetchToken,
  signIn,
  signOut,
  ServerData,
  initializeServerData,
  subscribeToUserUpdates,
  unsubscribeFromUserUpdates,
  validateToken,
} from './server'

describe('Initialize server data', () => {
  const apiClient = createServerData().apiClient

  let result: ServerData

  beforeAll(() => {
    clearMocks()
    mocked(createApiClient).mockReturnValue(apiClient)

    result = initializeServerData()
  })

  it('should return', () => {
    expect(result?.apiClient).toBe(apiClient)
    expect(result.apiClient.authTokenLifecycle).toBeDefined()
    expect(result.userSubscriptions).toHaveLength(1)
  })
})

describe('Subscribe to user updates', () => {
  const callback = jest.fn()
  const serverData = createServerData()

  beforeAll(() => {
    subscribeToUserUpdates(serverData, callback)
  })

  it('should subscribe', () => {
    expect(serverData.userSubscriptions).toEqual([callback])
  })
})

describe('Unsubscribe from user updates', () => {
  const callback = jest.fn()
  const serverData = createServerData()

  beforeAll(() => {
    serverData.userSubscriptions = [callback]

    unsubscribeFromUserUpdates(serverData, callback)
  })

  it('should unsubscribe', () => {
    expect(serverData.userSubscriptions).toEqual([])
  })
})

describe('Sign in', () => {
  const serverData = createServerData()
  const email = 'uid@email.com'
  const password = 'password'

  let result: User | null

  describe('Valid', () => {
    beforeAll(async () => {
      clearMocks()
      callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: createUserData(email) } as never)

      result = await signIn(serverData, email, password)
    })

    it('should return', () => expect(result?.email).toBe(email))

    it('should call API', () => {
      expect(callApiMock).toBeCalledTimes(1)
      expect(callApiMock.mock.calls[0][0]).toBe(serverData.apiClient)
      expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Post)
      expect(callApiMock.mock.calls[0][2]).toEqual('auth/sign_in')
      expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok])
      expect(callApiMock.mock.calls[0][5]).toEqual({
        email,
        password,
      })
      expect(callApiMock.mock.calls[0][6]).toEqual(true)
    })
  })

  describe('Invalid', () => {
    beforeAll(async () => {
      clearMocks()
      callApiMock.mockResolvedValueOnce({ status: HttpStatus.Unauthorized } as never)

      result = await signIn(serverData, email, password)
    })

    it('should return', () => expect(result).toBeNull())
  })
})

describe('Validate token', () => {
  const serverData = createServerData()
  const email = 'uid@email.com'

  let result: User | null

  describe('Valid', () => {
    beforeAll(async () => {
      callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: createUserData(email) } as never)
      clearMocks()

      result = await validateToken(serverData)
    })

    it('should return', () => expect(result?.email).toBe(email))

    it('should call API', () => {
      expect(callApiMock).toBeCalledTimes(1)
      expect(callApiMock.mock.calls[0][0]).toBe(serverData.apiClient)
      expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Get)
      expect(callApiMock.mock.calls[0][2]).toEqual('auth/validate_token')
      expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok])
      expect(callApiMock.mock.calls[0][6]).toEqual(true)
    })
  })

  describe('Invalid', () => {
    beforeAll(async () => {
      clearMocks()
      callApiMock.mockResolvedValueOnce({ status: HttpStatus.Unauthorized } as never)

      result = await validateToken(serverData)
    })

    it('should return', () => expect(result).toBeNull())
  })
})

describe('Sign out', () => {
  const serverData = createServerData()

  beforeAll(async () => {
    clearMocks()
    callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok } as never)

    await signOut(serverData)
  })

  it('should call API', () => {
    expect(callApiMock).toBeCalledTimes(1)
    expect(callApiMock.mock.calls[0][0]).toBe(serverData.apiClient)
    expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Delete)
    expect(callApiMock.mock.calls[0][2]).toEqual('auth/sign_out')
    expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok, HttpStatus.NotFound])
    expect(callApiMock.mock.calls[0][6]).toEqual(true)
  })
})

describe('Fetch tokens', () => {
  const serverData = createServerData()
  const tokensData = [
    createTokenData(WETH_HASH),
    createTokenData('0x0000000000000000000000000000000000000111'),
    createTokenData(USDC_HASH),
    createTokenData('0x0000000000000000000000000000000000000222'),
    createTokenData('0x0000000000000000000000000000000000000333'),
  ]

  let result: Token[]

  beforeAll(async () => {
    jest.resetAllMocks()
    callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: tokensData, headers: [] } as never)

    result = await fetchTokens(serverData)
  })

  it('should call API', () => {
    expect(callApiMock).toBeCalledTimes(1)
    expect(callApiMock.mock.calls[0][0]).toBe(serverData.apiClient)
    expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Get)
    expect(callApiMock.mock.calls[0][2]).toEqual('contract_tokens')
  })

  it('should return', () => {
    expect(result).toBeDefined()
    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({
      hash: '0x0000000000000000000000000000000000000111',
      type: AddressType.Token,
      url: 'https://etherscan.io/token/0x0000000000000000000000000000000000000111',
      label: 'Token (TKN)',
      name: 'Token',
      symbol: 'TKN',
      price: BigNumber.from('2000'),
      priceHistory: [
        { time: HistoryTime.Hour, price: BigNumber.from('1000'), ratio: 2.0 },
        { time: HistoryTime.Day, price: BigNumber.from('4000'), ratio: 0.5 },
        { time: HistoryTime.Week, price: BigNumber.from('8000'), ratio: 0.25 },
        { time: HistoryTime.Month, price: BigNumber.from('2000'), ratio: 1.0 },
        { time: HistoryTime.Year, price: BigNumber.from('500'), ratio: 4.0 },
      ],
    })
  })
})

describe('Fetch token', () => {
  const serverData = createServerData()
  const tokenData = createTokenData('0x0000000000000000000000000000000000000111')

  let result: Token | null

  describe('Default', () => {
    beforeAll(async () => {
      clearMocks()
      callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: tokenData, headers: [] } as never)

      result = await fetchToken(serverData, '0x0000000000000000000000000000000000000111')
    })

    it('should return', () => expect(result).toBeDefined())

    it('should call API', () => {
      expect(callApiMock).toBeCalledTimes(1)
      expect(callApiMock.mock.calls[0][0]).toBe(serverData.apiClient)
      expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Get)
      expect(callApiMock.mock.calls[0][2]).toBe('contract_tokens/0x0000000000000000000000000000000000000111?list=')
      expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok, HttpStatus.NotFound])
    })
  })

  describe('With actions', () => {
    beforeAll(async () => {
      clearMocks()
      callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: tokenData, headers: [] } as never)

      result = await fetchToken(serverData, '0x0000000000000000000000000000000000000111', 'actions')
    })

    it('should return', () => {
      expect(result).toBeDefined()
    })

    it('should call API', () => {
      expect(callApiMock).toBeCalledTimes(1)
      expect(callApiMock.mock.calls[0][0]).toBe(serverData.apiClient)
      expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Get)
      expect(callApiMock.mock.calls[0][2]).toEqual(
        'contract_tokens/0x0000000000000000000000000000000000000111?list=actions'
      )
      expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok, HttpStatus.NotFound])
    })
  })

  describe('Not found', () => {
    beforeAll(async () => {
      clearMocks()
      callApiMock.mockResolvedValue({
        status: HttpStatus.NotFound,
        data: null,
      } as never)

      result = await fetchToken(serverData, '0x0000000000000000000000000000000000000222')
    })

    it('should return', () => expect(result).toBeNull())
  })
})
