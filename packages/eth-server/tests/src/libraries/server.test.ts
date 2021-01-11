import axios, { AxiosInstance } from 'axios'
import { HttpStatus } from 'libraries/api'
import { createContractData, createTokenData, createTransactionData } from '../../fixtures/libraries/server'
import { Contract, Token } from 'libraries/types'
import { clearMocks } from '../../helpers'
import { createToken, createTransaction as createTransactionSample } from '../../fixtures/libraries/ethereum'

jest.mock('axios')
const axiosGetMock = jest.fn()
const axiosPostMock = jest.fn()
const axiosPutMock = jest.fn()
jest.spyOn(axios, 'create').mockReturnValue(({
  get: axiosGetMock,
  post: axiosPostMock,
  put: axiosPutMock,
} as unknown) as AxiosInstance)

import {
  fetchContracts,
  fetchTokens,
  fetchTransactionsToUpdate,
  updateTokenPrice,
  saveTransaction,
  saveTransactions,
} from 'libraries/server'

describe('Fetch contracts', () => {
  let result: Contract[]

  beforeAll(async () => {
    clearMocks()
    axiosGetMock.mockResolvedValue({
      status: HttpStatus.Ok,
      data: [createContractData()],
    })

    result = await fetchContracts()
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
  let result: Token[]

  beforeAll(async () => {
    clearMocks()
    axiosGetMock.mockResolvedValue({
      status: HttpStatus.Ok,
      data: [createTokenData()],
    })

    result = await fetchTokens()
  })

  it('should return value', () => {
    expect(result).toHaveLength(1)
    expect(result[0]?.hash).toEqual('0x0A00000000000000000000000000000000000111')
  })
  it('should call Axios', () => {
    expect(axiosGetMock).toBeCalledTimes(1)
    expect(axiosGetMock.mock.calls[0][0]).toEqual('tokens')
  })
})

describe('Fetch transactions to update', () => {
  let result: string[]

  beforeAll(async () => {
    clearMocks()
    axiosGetMock.mockResolvedValue({
      status: HttpStatus.Ok,
      data: [createTransactionData()],
    })

    result = await fetchTransactionsToUpdate()
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
  beforeAll(async () => {
    clearMocks()
    axiosPostMock.mockResolvedValue({ status: HttpStatus.Ok })
    const transaction = createTransactionSample()

    await saveTransaction(transaction)
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
  beforeAll(async () => {
    clearMocks()
    axiosPostMock.mockResolvedValue({ status: HttpStatus.Ok })
    const transactions = [createTransactionSample()]

    await saveTransactions(transactions)
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
  beforeAll(async () => {
    clearMocks()
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 5, 11, 22, 33).valueOf())
    axiosPostMock.mockResolvedValue({ status: HttpStatus.Created })
    const token = createToken()

    await updateTokenPrice(token)
  })

  it('should call Axios', () => {
    expect(axiosPostMock).toBeCalledTimes(1)
    expect(axiosPostMock.mock.calls[0][0]).toEqual('tokens/0x0A00000000000000000000000000000000000111/prices')
    expect(axiosPostMock.mock.calls[0][1]).toMatchObject({
      token_price: { datetime: new Date(2020, 4, 5, 11, 22, 33), price: '1000' },
    })
  })
})
