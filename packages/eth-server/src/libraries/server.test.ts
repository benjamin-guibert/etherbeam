import {
  createContractData,
  createServerData,
  createTokenData,
  createTransactionData,
} from '../../tests/fixtures/server'
import axios, { AxiosInstance } from 'axios'
import { clearMocks } from '../../tests/helpers'
import { createToken, createTransaction as createTransactionSample } from '../../tests/fixtures/ethereum'
import { HttpStatus } from './api'
import { Contract, Token } from './types'

const axiosGetMock = jest.fn()
const axiosPostMock = jest.fn()
const axiosClient = {
  defaults: { headers: {} },
} as AxiosInstance

jest.mock('axios')
jest.spyOn(axios, 'create').mockReturnValue(axiosClient)

import {
  fetchContracts,
  fetchTokens,
  fetchTransactionsToUpdate,
  updateTokenPrice,
  saveTransaction,
  saveTransactions,
  ServerData,
  useServer,
  logIn,
  logOut,
} from 'libraries/server'

describe('Use server', () => {
  let result: ServerData

  beforeAll(() => {
    result = useServer()
  })

  it('should return', () =>
    expect(result).toMatchObject({
      axiosClient: axiosClient,
      authToken: null,
    }))
})

describe('Log in', () => {
  const data = createServerData()
  const headers = {
    client: 'client',
    uid: 'uid@email.com',
    'access-token': 'abcdef0123456789',
    'token-type': 'Bearer',
    expiry: '1234567890',
  }

  beforeAll(async () => {
    clearMocks()
    process.env.SERVER_API_USER = 'uid@email.com'
    process.env.SERVER_API_PASSWORD = 'password'
    data.axiosClient.post = axiosPostMock
    axiosPostMock.mockResolvedValue({
      status: HttpStatus.Ok,
      headers,
    })

    await logIn(data)
  })

  it('should call Axios', () => {
    expect(axiosPostMock).toBeCalledTimes(1)
    expect(axiosPostMock.mock.calls[0][0]).toEqual('auth/login')
    expect(axiosPostMock.mock.calls[0][1]).toEqual({
      email: 'uid@email.com',
      password: 'password',
    })
  })

  it('should set authToken', () => {
    expect(data.authToken).toMatchObject({
      client: headers['client'],
      uid: headers['uid'],
      accessToken: headers['access-token'],
      tokenType: headers['token-type'],
      expiry: headers['expiry'],
    })
  })

  it('should set headers', () => {
    expect(data.axiosClient.defaults.headers).toMatchObject(headers)
  })
})

describe('Log out', () => {
  const data = createServerData()
  const headers = {
    client: 'client',
    uid: 'uid@email.com',
    'access-token': 'abcdef0123456789',
    'token-type': 'Bearer',
    expiry: '1234567890',
  }
  const authToken = {
    client: 'client',
    uid: 'uid@email.com',
    accessToken: 'abcdef0123456789',
    tokenType: 'Bearer',
    expiry: '1234567890',
  }

  describe('Authentified', () => {
    beforeAll(async () => {
      clearMocks()
      data.axiosClient.post = axiosPostMock
      data.axiosClient.defaults.headers = headers
      data.authToken = authToken

      await logOut(data)
    })

    it('should call Axios', () => {
      expect(axiosPostMock).toBeCalledTimes(1)
      expect(axiosPostMock.mock.calls[0][0]).toEqual('auth/logout')
    })

    it('should set authToken', () => expect(data.authToken).toBeNull())

    it('should set headers', () => {
      expect(data.axiosClient.defaults.headers).not.toMatchObject(headers)
    })
  })

  describe('Unauthentified', () => {
    beforeAll(async () => {
      clearMocks()
      data.axiosClient.post = axiosPostMock

      await logOut(data)
    })

    it('should not call Axios', () => expect(axiosPostMock).toBeCalledTimes(0))
  })
})

describe('Fetch contracts', () => {
  const data = createServerData()
  let result: Contract[]

  beforeAll(async () => {
    clearMocks()
    data.axiosClient.get = axiosGetMock
    axiosGetMock.mockResolvedValue({
      status: HttpStatus.Ok,
      data: [createContractData()],
    })

    result = await fetchContracts(data)
  })

  it('should return value', () => {
    expect(result).toHaveLength(1)
    expect(result[0]?.hash).toEqual('0x0A00000000000000000000000000000000000111')
  })
  it('should call Axios', () => {
    expect(axiosGetMock).toBeCalledTimes(1)
    expect(axiosGetMock.mock.calls[0][0]).toEqual('contracts')
  })
})

describe('Fetch tokens', () => {
  const data = createServerData()
  let result: Token[]

  beforeAll(async () => {
    clearMocks()
    data.axiosClient.get = axiosGetMock
    axiosGetMock.mockResolvedValue({
      status: HttpStatus.Ok,
      data: [createTokenData()],
    })

    result = await fetchTokens(data)
  })

  it('should return value', () => {
    expect(result).toHaveLength(1)
    expect(result[0]?.hash).toEqual('0x0A00000000000000000000000000000000000111')
  })
  it('should call Axios', () => {
    expect(axiosGetMock).toBeCalledTimes(1)
    expect(axiosGetMock.mock.calls[0][0]).toEqual('contract_tokens')
  })
})

describe('Fetch transactions to update', () => {
  const data = createServerData()
  let result: string[]

  beforeAll(async () => {
    clearMocks()
    data.axiosClient.get = axiosGetMock
    axiosGetMock.mockResolvedValue({
      status: HttpStatus.Ok,
      data: [createTransactionData()],
    })

    result = await fetchTransactionsToUpdate(data)
  })

  it('should return value', () => {
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual('0x0000000000000000000000000000000000000000000000000000000000000001')
  })
  it('should call Axios', () => {
    expect(axiosGetMock).toBeCalledTimes(1)
    expect(axiosGetMock.mock.calls[0][0]).toEqual('block_transactions?status=mined')
  })
})

describe('Save transaction', () => {
  const data = createServerData()

  beforeAll(async () => {
    clearMocks()
    data.axiosClient.post = axiosPostMock
    axiosPostMock.mockResolvedValue({ status: HttpStatus.Ok })
    const transaction = createTransactionSample()

    await saveTransaction(transaction, data)
  })

  it('should call Axios', () => {
    expect(axiosPostMock).toBeCalledTimes(1)
    expect(axiosPostMock.mock.calls[0][0]).toEqual('block_transactions')
    expect(axiosPostMock.mock.calls[0][1].block_transaction?.transaction_hash).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000001'
    )
  })
})

describe('Save transactions', () => {
  const data = createServerData()

  beforeAll(async () => {
    clearMocks()
    data.axiosClient.post = axiosPostMock
    axiosPostMock.mockResolvedValue({ status: HttpStatus.Ok })
    const transactions = [createTransactionSample()]

    await saveTransactions(transactions, data)
  })

  it('should call Axios', () => {
    expect(axiosPostMock).toBeCalledTimes(1)
    expect(axiosPostMock.mock.calls[0][0]).toEqual('block_transactions')
    expect(axiosPostMock.mock.calls[0][1]?.block_transactions).toHaveLength(1)
    expect(axiosPostMock.mock.calls[0][1].block_transactions[0]?.transaction_hash).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000001'
    )
  })
})

describe('Update token price', () => {
  const data = createServerData()

  beforeAll(async () => {
    clearMocks()
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 5, 11, 22, 33).valueOf())
    data.axiosClient.post = axiosPostMock
    axiosPostMock.mockResolvedValue({ status: HttpStatus.Created })
    const token = createToken()

    await updateTokenPrice(token, data)
  })

  it('should call Axios', () => {
    expect(axiosPostMock).toBeCalledTimes(1)
    expect(axiosPostMock.mock.calls[0][0]).toEqual('contract_tokens/0x0A00000000000000000000000000000000000111/prices')
    expect(axiosPostMock.mock.calls[0][1]).toMatchObject({
      contract_token_price: { datetime: new Date(2020, 4, 5, 11, 22, 33), price: '1000' },
    })
  })
})
