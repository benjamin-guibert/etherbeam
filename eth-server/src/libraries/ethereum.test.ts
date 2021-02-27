import { mocked } from 'ts-jest/utils'
import { clearMocks } from '../../tests/helpers'
import { createApiClient } from '../../tests/fixtures/server'
import {
  createContract,
  createEthereumData as createEthereumDataMock,
  createToken,
  createTransaction,
} from '../../tests/fixtures/ethereum'
import { BlockHeader } from 'web3-eth'
import { Subscription } from 'web3-core-subscriptions'
import { fetchBlockTransactions, fetchPendingTransaction, fetchTransactionReceipt } from './web3'
import {
  fetchContracts,
  fetchTokens,
  fetchTransactionsToUpdate,
  updateTokenPrice,
  saveTransaction,
  saveTransactions,
} from './server'
import { fetchTokenPrice } from './uniswap'

jest.mock('./web3')
jest.mock('./server')
jest.mock('./uniswap')
const fetchBlockTransactionsMock = mocked(fetchBlockTransactions)
const fetchTransactionReceiptMock = mocked(fetchTransactionReceipt)
const fetchTokenPriceMock = mocked(fetchTokenPrice)
const fetchContractsMock = mocked(fetchContracts)
const fetchTokensMock = mocked(fetchTokens)
const fetchTransactionsToUpdateMock = mocked(fetchTransactionsToUpdate)
const fetchPendingTransactionMock = mocked(fetchPendingTransaction)
const saveTransactionsMock = mocked(saveTransactions)
const saveTransactionMock = mocked(saveTransaction)
const updateTokenPriceMock = mocked(updateTokenPrice)
const subscribeOnMock = jest.fn()
const subscribeMock = jest.fn().mockReturnValue({
  on: subscribeOnMock,
})
const unsubscribeMock = jest.fn().mockImplementation((action) => action?.())

import {
  createEthereumData,
  EthereumData,
  startFetchingTokenPrices,
  startFetchingTransactionReceipts,
  stopFetchingTokenPrices,
  stopFetchingTransactionReceipts,
  subscribeToNewBlocks,
  subscribeToPendingTransactions,
  unsubscribeFromNewBlocks,
  unsubscribeFromPendingTransactions,
} from './ethereum'

const error = new Error()

let data: EthereumData

describe('Create Ethereum data', () => {
  let result: EthereumData
  const apiClient = createApiClient()
  const contract = createContract('0x0000000000000000000000000000000000000111')
  const token = createToken('0x0000000000000000000000000000000000000222')

  beforeAll(async () => {
    fetchContractsMock.mockResolvedValue([token, contract])
    fetchTokensMock.mockResolvedValue([token])

    result = await createEthereumData(apiClient)
  })

  it('should return value', () =>
    expect(result).toMatchObject({
      apiClient,
      ethersProvider: undefined,
      contracts: [contract, token],
      newBlocksSubscription: null,
      fetchingTransactionReceipts: false,
      fetchingTokenPrices: false,
      pendingTransactionsSubscription: null,
    }))

  it('should create Web3 contracts', () => {
    expect(result.contracts?.[0]?.web3).toBeDefined()
    expect(result.contracts?.[1]?.web3).toBeDefined()
  })
})

describe('Subscribe to new blocks', () => {
  const transactions = [createTransaction(), createTransaction()]
  transactions[0].from = '0x0A00000000000000000000000000000000000111'

  describe('Unsubscribed', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.web3.eth.subscribe = subscribeMock
      subscribeOnMock.mockImplementation((subject, action) => {
        if (subject == 'data') action?.({ number: 1000 })

        return { on: subscribeOnMock }
      })
      fetchBlockTransactionsMock.mockResolvedValue(transactions)

      subscribeToNewBlocks(data)

      await new Promise(setImmediate)
    })

    it('should update data', () => expect(data.newBlocksSubscription).toBeDefined())
    it('should be subscribed', () => {
      expect(subscribeMock).toBeCalledTimes(1)
      expect(subscribeMock.mock.calls[0][0]).toEqual('newBlockHeaders')
      expect(subscribeOnMock).toBeCalledTimes(3)
      expect(subscribeOnMock.mock.calls[0][0]).toEqual('connected')
      expect(subscribeOnMock.mock.calls[1][0]).toEqual('data')
      expect(subscribeOnMock.mock.calls[2][0]).toEqual('error')
    })
    it('should fetch block transactions', () => {
      expect(fetchBlockTransactionsMock).toBeCalledTimes(1)
      expect(fetchBlockTransactionsMock.mock.calls[0][0]).toBe(data)
      expect(fetchBlockTransactionsMock.mock.calls[0][1]).toEqual(1000)
    })
    it('should save transactions', () => {
      expect(saveTransactionsMock).toBeCalledTimes(1)
      expect(saveTransactionsMock.mock.calls[0][0]).toBe(data.apiClient)
      expect(saveTransactionsMock.mock.calls[0][1]).toEqual([transactions[0]])
    })
  })

  describe('Subscribed', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.newBlocksSubscription = (true as unknown) as Subscription<BlockHeader>
      data.web3.eth.subscribe = subscribeMock

      subscribeToNewBlocks(data)

      await new Promise(setImmediate)
    })

    it('should not subscribe again', () => expect(subscribeMock).toBeCalledTimes(0))
  })

  describe('Fetch block null', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.web3.eth.subscribe = subscribeMock
      subscribeOnMock.mockImplementation((subject, action) => {
        if (subject == 'data') action?.({ number: 1000 })

        return { on: subscribeOnMock }
      })
      fetchBlockTransactionsMock.mockResolvedValue(null)

      subscribeToNewBlocks(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch block transactions', () => {
      expect(fetchBlockTransactionsMock).toBeCalledTimes(2)
      expect(fetchBlockTransactionsMock.mock.calls[0][0]).toBe(data)
      expect(fetchBlockTransactionsMock.mock.calls[0][1]).toEqual(1000)
      expect(fetchBlockTransactionsMock.mock.calls[1][1]).toEqual(1000)
    })
    it('should not save transactions', () => expect(saveTransactionsMock).toBeCalledTimes(0))
  })

  describe('Fetch block error', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.web3.eth.subscribe = subscribeMock
      subscribeOnMock.mockImplementation((subject, action) => {
        if (subject == 'data') action?.({ number: 1000 })

        return { on: subscribeOnMock }
      })
      fetchBlockTransactionsMock.mockRejectedValue(error)

      subscribeToNewBlocks(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch block', () => {
      expect(fetchBlockTransactionsMock).toBeCalledTimes(2)
      expect(fetchBlockTransactionsMock.mock.calls[0][0]).toBe(data)
      expect(fetchBlockTransactionsMock.mock.calls[0][1]).toEqual(1000)
      expect(fetchBlockTransactionsMock.mock.calls[1][1]).toEqual(1000)
    })
    it('should not save transactions', () => expect(saveTransactionsMock).toBeCalledTimes(0))
  })

  describe('Save transactions error', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.web3.eth.subscribe = subscribeMock
      subscribeOnMock.mockImplementation((subject, action) => {
        if (subject == 'data') action?.({ number: 1000 })

        return { on: subscribeOnMock }
      })
      fetchBlockTransactionsMock.mockResolvedValue(transactions)
      saveTransactionsMock.mockRejectedValue(error)

      subscribeToNewBlocks(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch block', () => {
      expect(fetchBlockTransactionsMock).toBeCalledTimes(1)
      expect(fetchBlockTransactionsMock.mock.calls[0][0]).toBe(data)
      expect(fetchBlockTransactionsMock.mock.calls[0][1]).toEqual(1000)
    })
    it('should save transactions', () => {
      expect(saveTransactionsMock).toBeCalledTimes(2)
      expect(saveTransactionsMock.mock.calls[0][0]).toBe(data.apiClient)
      expect(saveTransactionsMock.mock.calls[0][1]).toEqual([transactions[0]])
      expect(saveTransactionsMock.mock.calls[1][1]).toEqual([transactions[0]])
    })
  })
})

describe('Unsubscribe from new blocks', () => {
  describe('Subscribed', () => {
    beforeAll(() => {
      data = createEthereumDataMock()
      data.newBlocksSubscription = ({ unsubscribe: unsubscribeMock } as unknown) as Subscription<BlockHeader>

      unsubscribeFromNewBlocks(data)
    })

    it('should unsubscribe', () => expect(unsubscribeMock).toBeCalledTimes(1))
    it('should update data', () => expect(data.newBlocksSubscription).toBeNull())
  })

  describe('Unsubscribed', () => {
    beforeAll(() => {
      data = createEthereumDataMock()

      unsubscribeFromNewBlocks(data)
    })

    it('should not update data', () => expect(data.newBlocksSubscription).toBeNull())
  })
})

describe('Start fetching transaction receipts', () => {
  const transaction = createTransaction()

  describe('Not started', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      fetchTransactionsToUpdateMock
        .mockResolvedValueOnce(['0x0000000000000000000000000000000000000000000000000000000000000001'])
        .mockResolvedValue([])
      fetchTransactionReceiptMock.mockResolvedValue(transaction)
      saveTransactionsMock.mockResolvedValue()

      startFetchingTransactionReceipts(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should update data', () => expect(data.fetchingTransactionReceipts).toBeTruthy())
    it('should fetch transactions', () => expect(fetchTransactionsToUpdateMock).toBeCalledTimes(3))
    it('should fetch transaction receipt', () => {
      expect(fetchTransactionReceiptMock).toBeCalledTimes(1)
      expect(fetchTransactionReceiptMock.mock.calls[0][0]).toBe(data)
      expect(fetchTransactionReceiptMock.mock.calls[0][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
    })
    it('should save transactions', () => {
      expect(saveTransactionsMock).toBeCalledTimes(1)
      expect(saveTransactionsMock.mock.calls[0][0]).toBe(data.apiClient)
      expect(saveTransactionsMock.mock.calls[0][1]).toEqual([transaction])
    })
  })

  describe('Started', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.fetchingTransactionReceipts = true

      startFetchingTransactionReceipts(data)

      await new Promise(setImmediate)
    })

    it('should not fetch again', () => expect(fetchTransactionsToUpdateMock).toBeCalledTimes(0))
  })

  describe('Fetch transactions error', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      fetchTransactionsToUpdateMock.mockRejectedValue(error)
      fetchTransactionReceiptMock.mockResolvedValue(transaction)

      startFetchingTransactionReceipts(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch transactions', () => {
      expect(fetchTransactionsToUpdateMock).toBeCalledTimes(2)
      expect(fetchTransactionsToUpdateMock.mock.calls[0][0]).toEqual(data.apiClient)
    })
    it('should not fetch transaction receipt', () => expect(fetchTransactionReceiptMock).toBeCalledTimes(0))
    it('should not save transactions', () => expect(saveTransactionsMock).toBeCalledTimes(0))
  })

  describe('Fetch transaction receipt null', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      fetchTransactionsToUpdateMock
        .mockResolvedValueOnce(['0x0000000000000000000000000000000000000000000000000000000000000001'])
        .mockResolvedValue([])
      fetchTransactionReceiptMock.mockResolvedValue(null)
      saveTransactionsMock.mockResolvedValue()

      startFetchingTransactionReceipts(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch transactions', () => expect(fetchTransactionsToUpdateMock).toBeCalledTimes(2))
    it('should fetch transaction receipt', () => {
      expect(fetchTransactionReceiptMock).toBeCalledTimes(1)
      expect(fetchTransactionReceiptMock.mock.calls[0][0]).toBe(data)
      expect(fetchTransactionReceiptMock.mock.calls[0][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
    })
    it('should not save transactions', () => expect(saveTransactionsMock).toBeCalledTimes(0))
  })

  describe('Fetch transaction receipt error', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      fetchTransactionsToUpdateMock
        .mockResolvedValueOnce(['0x0000000000000000000000000000000000000000000000000000000000000001'])
        .mockResolvedValue([])
      fetchTransactionReceiptMock.mockRejectedValue(error)
      saveTransactionsMock.mockResolvedValue()

      startFetchingTransactionReceipts(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch transactions', () => expect(fetchTransactionsToUpdateMock).toBeCalledTimes(2))
    it('should fetch transaction receipt', () => {
      expect(fetchTransactionReceiptMock).toBeCalledTimes(1)
      expect(fetchTransactionReceiptMock.mock.calls[0][0]).toBe(data)
      expect(fetchTransactionReceiptMock.mock.calls[0][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
    })
    it('should not save transactions', () => expect(saveTransactionsMock).toBeCalledTimes(0))
  })

  describe('Save transactions error', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      fetchTransactionsToUpdateMock
        .mockResolvedValueOnce(['0x0000000000000000000000000000000000000000000000000000000000000001'])
        .mockResolvedValue([])
      fetchTransactionReceiptMock.mockResolvedValue(transaction)
      saveTransactionsMock.mockRejectedValue(error)

      startFetchingTransactionReceipts(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch transactions', () => expect(fetchTransactionsToUpdateMock).toBeCalledTimes(1))
    it('should fetch transaction receipt', () => {
      expect(fetchTransactionReceiptMock).toBeCalledTimes(1)
      expect(fetchTransactionReceiptMock.mock.calls[0][0]).toBe(data)
      expect(fetchTransactionReceiptMock.mock.calls[0][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
    })
    it('should save transactions', () => {
      expect(saveTransactionsMock).toBeCalledTimes(3)
      expect(saveTransactionsMock.mock.calls[0][0]).toBe(data.apiClient)
      expect(saveTransactionsMock.mock.calls[0][1]).toEqual([transaction])
      expect(saveTransactionsMock.mock.calls[1][1]).toEqual([transaction])
      expect(saveTransactionsMock.mock.calls[2][1]).toEqual([transaction])
    })
  })
})

describe('Stop fetching transaction receipts', () => {
  beforeAll(() => {
    clearMocks()
    data = createEthereumDataMock()
    data.fetchingTransactionReceipts = true

    stopFetchingTransactionReceipts(data)
  })

  it('should update data', () => expect(data.fetchingTransactionReceipts).toBeFalsy())
})

describe('Start fetching token prices', () => {
  const token = createToken()

  describe('Resolved', () => {
    beforeAll(async () => {
      data = createEthereumDataMock()
      data.contracts.push(createContract(), token)

      startFetchingTokenPrices(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(30000)
      await new Promise(setImmediate)
    })

    it('should update data', () => expect(data.fetchingTokenPrices).toBeTruthy())
    it('should fetch token price', () => {
      expect(fetchTokenPriceMock).toBeCalledTimes(2)
      expect(fetchTokenPriceMock.mock.calls[0][0]).toBe(data)
      expect(fetchTokenPriceMock.mock.calls[0][1]).toBe(token)
      expect(fetchTokenPriceMock.mock.calls[1][1]).toBe(token)
    })
    it('should update token price', () => {
      expect(updateTokenPriceMock).toBeCalledTimes(2)
      expect(updateTokenPriceMock.mock.calls[0][0]).toBe(data.apiClient)
      expect(updateTokenPriceMock.mock.calls[0][1]).toBe(token)
      expect(updateTokenPriceMock.mock.calls[1][1]).toBe(token)
    })
  })

  describe('Fetch error', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createContract(), token)
      fetchTokenPriceMock.mockRejectedValue(error)

      startFetchingTokenPrices(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch token price', () => {
      expect(fetchTokenPriceMock).toBeCalledTimes(1)
      expect(fetchTokenPriceMock.mock.calls[0][0]).toBe(data)
      expect(fetchTokenPriceMock.mock.calls[0][1]).toBe(token)
    })
    it('should not update token price', () => expect(updateTokenPriceMock).toBeCalledTimes(0))
  })

  describe('Update error', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createContract(), token)
      fetchTokenPriceMock.mockResolvedValue()
      updateTokenPriceMock.mockRejectedValue(error)

      startFetchingTokenPrices(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should update data', () => expect(data.fetchingTokenPrices).toBeTruthy())
    it('should fetch token price', () => {
      expect(fetchTokenPriceMock).toBeCalledTimes(1)
      expect(fetchTokenPriceMock.mock.calls[0][0]).toBe(data)
      expect(fetchTokenPriceMock.mock.calls[0][1]).toBe(token)
    })
    it('should update token price', () => {
      expect(updateTokenPriceMock).toBeCalledTimes(1)
      expect(updateTokenPriceMock.mock.calls[0][0]).toBe(data.apiClient)
      expect(updateTokenPriceMock.mock.calls[0][1]).toBe(token)
    })
  })
})

describe('Stop fetching token prices', () => {
  beforeAll(() => {
    clearMocks()
    data = createEthereumDataMock()
    data.fetchingTokenPrices = true

    stopFetchingTokenPrices(data)
  })

  it('should update data', () => expect(data.fetchingTokenPrices).toBeFalsy())
})

describe('Subscribe to pending transactions', () => {
  const transaction = createTransaction('0x0000000000000000000000000000000000000000000000000000000000000001')
  transaction.from = '0x0A00000000000000000000000000000000000111'

  describe('Unsubscribed', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.web3Pool.eth.subscribe = subscribeMock
      subscribeOnMock.mockImplementation((subject, action) => {
        if (subject == 'data') action?.('0x0000000000000000000000000000000000000000000000000000000000000001')

        return { on: subscribeOnMock }
      })
      fetchPendingTransactionMock.mockResolvedValue(transaction)

      subscribeToPendingTransactions(data)

      await new Promise(setImmediate)
    })

    it('should update data', () => expect(data.pendingTransactionsSubscription).toBeDefined())
    it('should be subscribed', () => {
      expect(subscribeMock).toBeCalledTimes(1)
      expect(subscribeMock.mock.calls[0][0]).toEqual('pendingTransactions')
      expect(subscribeOnMock).toBeCalledTimes(3)
      expect(subscribeOnMock.mock.calls[0][0]).toEqual('connected')
      expect(subscribeOnMock.mock.calls[1][0]).toEqual('data')
      expect(subscribeOnMock.mock.calls[2][0]).toEqual('error')
    })
    it('should fetch pending transaction', () => {
      expect(fetchPendingTransactionMock).toBeCalledTimes(1)
      expect(fetchPendingTransactionMock.mock.calls[0][0]).toBe(data)
      expect(fetchPendingTransactionMock.mock.calls[0][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
    })
    it('should save transaction', () => {
      expect(saveTransactionMock).toBeCalledTimes(1)
      expect(saveTransactionMock.mock.calls[0][0]).toBe(data.apiClient)
      expect(saveTransactionMock.mock.calls[0][1]).toEqual(transaction)
    })
  })

  describe('Subscribed', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.pendingTransactionsSubscription = (true as unknown) as Subscription<string>
      data.web3Pool.eth.subscribe = subscribeMock

      subscribeToPendingTransactions(data)

      await new Promise(setImmediate)
    })

    it('should not subscribe again', () => expect(subscribeMock).toBeCalledTimes(0))
  })

  describe('Fetch transaction null', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.web3Pool.eth.subscribe = subscribeMock
      subscribeOnMock.mockImplementation((subject, action) => {
        if (subject == 'data') action?.('0x0000000000000000000000000000000000000000000000000000000000000001')

        return { on: subscribeOnMock }
      })
      fetchPendingTransactionMock.mockResolvedValue(null)

      subscribeToPendingTransactions(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch transaction', () => {
      expect(fetchPendingTransactionMock).toBeCalledTimes(2)
      expect(fetchPendingTransactionMock.mock.calls[0][0]).toBe(data)
      expect(fetchPendingTransactionMock.mock.calls[0][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
      expect(fetchPendingTransactionMock.mock.calls[1][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
    })
    it('should not save transaction', () => expect(saveTransactionMock).toBeCalledTimes(0))
  })

  describe('Fetch transaction error', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.web3Pool.eth.subscribe = subscribeMock
      subscribeOnMock.mockImplementation((subject, action) => {
        if (subject == 'data') action?.('0x0000000000000000000000000000000000000000000000000000000000000001')

        return { on: subscribeOnMock }
      })
      fetchPendingTransactionMock.mockRejectedValue(error)

      subscribeToPendingTransactions(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch transaction', () => {
      expect(fetchPendingTransactionMock).toBeCalledTimes(2)
      expect(fetchPendingTransactionMock.mock.calls[0][0]).toBe(data)
      expect(fetchPendingTransactionMock.mock.calls[0][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
      expect(fetchPendingTransactionMock.mock.calls[1][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
    })
    it('should not save transaction', () => {
      expect(saveTransactionMock).toBeCalledTimes(0)
    })
  })

  describe('Save transaction error', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumDataMock()
      data.contracts.push(createToken('0x0A00000000000000000000000000000000000111'))
      data.web3Pool.eth.subscribe = subscribeMock
      subscribeOnMock.mockImplementation((subject, action) => {
        if (subject == 'data') action?.('0x0000000000000000000000000000000000000000000000000000000000000001')

        return { on: subscribeOnMock }
      })
      fetchPendingTransactionMock.mockResolvedValue(transaction)
      saveTransactionMock.mockRejectedValue(error)

      subscribeToPendingTransactions(data)

      await new Promise(setImmediate)
      jest.runTimersToTime(10000)
      await new Promise(setImmediate)
    })

    it('should fetch transaction', () => {
      expect(fetchPendingTransactionMock).toBeCalledTimes(1)
      expect(fetchPendingTransactionMock.mock.calls[0][0]).toBe(data)
      expect(fetchPendingTransactionMock.mock.calls[0][1]).toEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      )
    })
    it('should save transaction', () => {
      expect(saveTransactionMock).toBeCalledTimes(2)
      expect(saveTransactionMock.mock.calls[0][0]).toBe(data.apiClient)
      expect(saveTransactionMock.mock.calls[0][1]).toEqual(transaction)
      expect(saveTransactionMock.mock.calls[1][1]).toEqual(transaction)
    })
  })
})

describe('Unsubscribe from pending transactions', () => {
  describe('Subscribed', () => {
    beforeAll(() => {
      data = createEthereumDataMock()
      data.pendingTransactionsSubscription = ({ unsubscribe: unsubscribeMock } as unknown) as Subscription<string>

      unsubscribeFromPendingTransactions(data)
    })

    it('should unsubscribe', () => expect(unsubscribeMock).toBeCalledTimes(1))
    it('should update data', () => expect(data.pendingTransactionsSubscription).toBeNull())
  })

  describe('Unsubscribed', () => {
    beforeAll(() => {
      data = createEthereumDataMock()

      unsubscribeFromPendingTransactions(data)
    })

    it('should not update data', () => expect(data.pendingTransactionsSubscription).toBeNull())
  })
})
