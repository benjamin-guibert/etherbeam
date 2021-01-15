import axios, { AxiosInstance } from 'axios'
import { BigNumber } from 'ethers'
import { HttpStatus, PaginatedContent } from 'libraries/api'

jest.mock('axios')
const axiosGetMock = jest.fn()
const axiosPostMock = jest.fn()
const axiosPutMock = jest.fn()
jest.spyOn(axios, 'create').mockReturnValue(({
  get: axiosGetMock,
  post: axiosPostMock,
  put: axiosPutMock,
} as unknown) as AxiosInstance)

import { fetchTokens, fetchToken, fetchPendingTransactions } from 'libraries/ethereum/server'
import { AddressType, HistoryTime, Transaction, USDC_HASH, WETH_HASH } from 'libraries/ethereum/types'
import { createTokenData, createTransactionData } from '../../../../tests/fixtures/server'

describe('Fetch tokens', () => {
  const tokensData = [
    createTokenData(WETH_HASH),
    createTokenData('0x0000000000000000000000000000000000000111'),
    createTokenData(USDC_HASH),
    createTokenData('0x0000000000000000000000000000000000000222'),
    createTokenData('0x0000000000000000000000000000000000000333'),
  ]

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should fetch tokens', async () => {
    axiosGetMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: tokensData, headers: [] })
    const tokens = await fetchTokens()

    expect(tokens).toBeDefined()
    expect(tokens).toHaveLength(3)
    expect(tokens[0]).toMatchObject({
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
    expect(axiosGetMock).toBeCalledTimes(1)
    expect(axiosGetMock.mock.calls[0][0]).toBe('tokens')
  })
})

describe('Fetch token', () => {
  const tokenData = createTokenData('0x0000000000000000000000000000000000000111')

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should fetch a token', async () => {
    axiosGetMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: tokenData, headers: [] })
    const token = await fetchToken('0x0000000000000000000000000000000000000111')

    expect(token).toBeDefined()
    expect(axiosGetMock).toBeCalledTimes(1)
    expect(axiosGetMock.mock.calls[0][0]).toBe('tokens/0x0000000000000000000000000000000000000111?list=')
  })
  it('should fetch a token with actions', async () => {
    axiosGetMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: tokenData, headers: [] })
    const token = await fetchToken('0x0000000000000000000000000000000000000111', 'actions')

    expect(token).toBeDefined()
    expect(axiosGetMock).toBeCalledTimes(1)
    expect(axiosGetMock.mock.calls[0][0]).toBe('tokens/0x0000000000000000000000000000000000000111?list=actions')
  })

  it('should return nothing if token not found', async () => {
    axiosGetMock.mockResolvedValue({
      status: HttpStatus.NotFound,
      data: null,
    })

    const result = await fetchToken('0x0000000000000000000000000000000000000222')

    expect(result).toBeNull()
  })
})

describe('Fetch pending transactions', () => {
  const transactionsData = [
    createTransactionData('0x0000000000000000000000000000000000000000000000000000000000000001'),
    createTransactionData('0x0000000000000000000000000000000000000000000000000000000000000002'),
    createTransactionData('0x0000000000000000000000000000000000000000000000000000000000000003'),
  ]
  let result: PaginatedContent<Transaction>

  beforeAll(async () => {
    jest.resetAllMocks()
    axiosGetMock.mockResolvedValueOnce({ status: HttpStatus.Ok, data: transactionsData, headers: [] })

    result = await fetchPendingTransactions(2)
  })

  it('should return items', () => {
    expect(result.items).toBeDefined()
    expect(result.items).toHaveLength(3)
    expect(result.items[0]?.address?.hash).toEqual('0x0000000000000000000000000000000000000000000000000000000000000001')
  })

  it('should return pagination', () => expect(result.pagination).toBeDefined())
})
