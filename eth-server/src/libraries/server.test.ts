import { mocked } from 'ts-jest/utils'
import {
  createApiClient as createApiClientMock,
  createContractData,
  createTokenData,
  createTransactionData,
} from '../../tests/fixtures/server'
import { clearMocks } from '../../tests/helpers'
import { createToken, createTransaction as createTransactionSample } from '../../tests/fixtures/ethereum'
import { ApiClient, callApi, createApiClient, flushAuthToken, HttpStatus, RestAction } from '@cryptotentanz/api-client'
import { Contract } from './types'

jest.mock('@cryptotentanz/api-client')
const callApiMock = mocked(callApi)
const flushAuthTokenMock = mocked(flushAuthToken)

import {
  fetchContracts,
  fetchTokens,
  fetchTransactionsToUpdate,
  updateTokenPrice,
  saveTransaction,
  saveTransactions,
  signIn,
  signOut,
  initializeApiClient,
} from './server'

describe('Initialize API client', () => {
  const apiClient = createApiClientMock()

  let result: ApiClient

  beforeAll(() => {
    clearMocks()
    mocked(createApiClient).mockReturnValue(apiClient)

    result = initializeApiClient()
  })

  it('should return', () => expect(result).toMatchObject(apiClient))
})

describe('Sign in', () => {
  const apiClient = createApiClientMock()

  beforeAll(async () => {
    clearMocks()
    process.env.SERVER_API_USER = 'uid@email.com'
    process.env.SERVER_API_PASSWORD = 'password'

    await signIn(apiClient)
  })

  it('should call API', () => {
    expect(callApiMock).toBeCalledTimes(1)
    expect(callApiMock.mock.calls[0][0]).toBe(apiClient)
    expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Post)
    expect(callApiMock.mock.calls[0][2]).toEqual('auth/sign_in')
    expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok])
    expect(callApiMock.mock.calls[0][5]).toEqual({
      email: 'uid@email.com',
      password: 'password',
    })
    expect(callApiMock.mock.calls[0][6]).toEqual(true)
  })

  it('should flush auth token', () => {
    expect(flushAuthTokenMock).toBeCalledTimes(1)
    expect(flushAuthTokenMock.mock.calls[0][0]).toBe(apiClient)
  })
})

describe('Sign out', () => {
  const apiClient = createApiClientMock()

  let result: boolean

  describe('Authentified', () => {
    beforeAll(async () => {
      clearMocks()
      callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok } as never)

      result = await signOut(apiClient)
    })

    it('should return', () => expect(result).toEqual(true))

    it('should call API', () => {
      expect(callApiMock).toBeCalledTimes(1)
      expect(callApiMock.mock.calls[0][0]).toBe(apiClient)
      expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Delete)
      expect(callApiMock.mock.calls[0][2]).toEqual('auth/sign_out')
      expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok, HttpStatus.NotFound])
    })

    it('should flush auth token', () => {
      expect(flushAuthTokenMock).toBeCalledTimes(1)
      expect(flushAuthTokenMock.mock.calls[0][0]).toBe(apiClient)
    })
  })

  describe('Unauthentified', () => {
    beforeAll(async () => {
      clearMocks()
      callApiMock.mockResolvedValueOnce({ status: HttpStatus.NotFound } as never)

      result = await signOut(apiClient)
    })

    it('should return', () => expect(result).toEqual(false))
  })
})

describe('Fetch contracts', () => {
  const apiClient = createApiClientMock()

  let result: Contract[]

  beforeAll(async () => {
    clearMocks()
    callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: [createContractData()] } as never)

    result = await fetchContracts(apiClient)
  })

  it('should return value', () => {
    expect(result).toHaveLength(1)
    expect(result[0]?.hash).toEqual('0x0A00000000000000000000000000000000000111')
  })

  it('should call API', () => {
    expect(callApiMock).toBeCalledTimes(1)
    expect(callApiMock.mock.calls[0][0]).toBe(apiClient)
    expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Get)
    expect(callApiMock.mock.calls[0][2]).toEqual('contracts')
  })
})

describe('Fetch tokens', () => {
  const apiClient = createApiClientMock()

  let result: Contract[]

  beforeAll(async () => {
    clearMocks()
    callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: [createTokenData()] } as never)

    result = await fetchTokens(apiClient)
  })

  it('should return value', () => {
    expect(result).toHaveLength(1)
    expect(result[0]?.hash).toEqual('0x0A00000000000000000000000000000000000111')
  })

  it('should call API', () => {
    expect(callApiMock).toBeCalledTimes(1)
    expect(callApiMock.mock.calls[0][0]).toBe(apiClient)
    expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Get)
    expect(callApiMock.mock.calls[0][2]).toEqual('contract_tokens')
  })
})

describe('Fetch transactions to update', () => {
  const apiClient = createApiClientMock()

  let result: string[]

  beforeAll(async () => {
    clearMocks()
    callApiMock.mockResolvedValueOnce({
      status: HttpStatus.Ok,
      data: [createTransactionData()],
    } as never)

    result = await fetchTransactionsToUpdate(apiClient)
  })

  it('should return value', () => {
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual('0x0000000000000000000000000000000000000000000000000000000000000001')
  })

  it('should call API', () => {
    expect(callApiMock).toBeCalledTimes(1)
    expect(callApiMock.mock.calls[0][0]).toBe(apiClient)
    expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Get)
    expect(callApiMock.mock.calls[0][2]).toEqual('block_transactions?status=mined')
  })
})

describe('Save transaction', () => {
  const apiClient = createApiClientMock()

  beforeAll(async () => {
    clearMocks()
    callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok } as never)
    const transaction = createTransactionSample()

    await saveTransaction(apiClient, transaction)
  })

  it('should call API', () => {
    expect(callApiMock).toBeCalledTimes(1)
    expect(callApiMock.mock.calls[0][0]).toBe(apiClient)
    expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Post)
    expect(callApiMock.mock.calls[0][2]).toEqual('block_transactions')
    expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok, HttpStatus.Created])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((callApiMock.mock.calls[0][5] as any).block_transaction?.transaction_hash).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000001'
    )
  })
})

describe('Save transactions', () => {
  const apiClient = createApiClientMock()

  beforeAll(async () => {
    clearMocks()
    callApiMock.mockResolvedValueOnce({ status: HttpStatus.Ok } as never)
    const transactions = [createTransactionSample()]

    await saveTransactions(apiClient, transactions)
  })

  it('should call API', () => {
    expect(callApiMock).toBeCalledTimes(1)
    expect(callApiMock.mock.calls[0][0]).toBe(apiClient)
    expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Post)
    expect(callApiMock.mock.calls[0][2]).toEqual('block_transactions')
    expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((callApiMock.mock.calls[0][5] as any).block_transactions[0]?.transaction_hash).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000001'
    )
  })
})

describe('Update token price', () => {
  const apiClient = createApiClientMock()

  beforeAll(async () => {
    clearMocks()
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 5, 11, 22, 33).valueOf())
    callApiMock.mockResolvedValueOnce({ status: HttpStatus.Created } as never)
    const token = createToken()

    await updateTokenPrice(apiClient, token)
  })

  it('should call API', () => {
    expect(callApiMock).toBeCalledTimes(1)
    expect(callApiMock.mock.calls[0][0]).toBe(apiClient)
    expect(callApiMock.mock.calls[0][1]).toEqual(RestAction.Post)
    expect(callApiMock.mock.calls[0][2]).toEqual('contract_tokens/0x0A00000000000000000000000000000000000111/prices')
    expect(callApiMock.mock.calls[0][3]).toEqual([HttpStatus.Ok, HttpStatus.Created])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(callApiMock.mock.calls[0][5]).toEqual({
      contract_token_price: { datetime: new Date(2020, 4, 5, 11, 22, 33), price: '1000' },
    })
  })
})
