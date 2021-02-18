import { clearMocks } from '../../tests/helpers'
import { createWeb3Block, createWeb3Transaction, createWeb3TransactionReceipt } from '../../tests/fixtures/web3'
import { createEthereumData } from '../../tests/fixtures/ethereum'
import { EthereumData } from './ethereum'
import { Transaction } from './types'
import { fetchBlockTransactions, fetchTransactionReceipt, fetchPendingTransaction } from './web3'

const getBlockMock = jest.fn()
const getTransactionReceiptMock = jest.fn()
const getTransactionMock = jest.fn()

let data: EthereumData

describe('Fetch block transactions', () => {
  const block = createWeb3Block()
  let result: Transaction[]

  describe('Resolved', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumData()
      data.web3.eth.getBlock = getBlockMock
      getBlockMock.mockResolvedValue(block)

      result = await fetchBlockTransactions(1000, data)
    })

    it('should return value', () => {
      expect(result).toHaveLength(1)
      expect(result[0]?.hash).toEqual('0x0a00000000000000000000000000000000000000000000000000000000000001')
    })
    it('should call Web3', () => {
      expect(data.web3.eth.getBlock).toBeCalledTimes(1)
      expect(getBlockMock.mock.calls[0][0]).toEqual(1000)
    })
  })

  describe('Null', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumData()
      data.web3.eth.getBlock = getBlockMock
      getBlockMock.mockResolvedValue(null)

      result = await fetchBlockTransactions(1000, data)
    })

    it('should return null', () => expect(result).toBeNull())
    it('should call Web3', () => {
      expect(data.web3.eth.getBlock).toBeCalledTimes(1)
      expect(getBlockMock.mock.calls[0][0]).toEqual(1000)
    })
  })
})

describe('Fetch transaction receipt', () => {
  let result: Transaction

  describe('Resolved', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumData()
      data.web3.eth.getTransactionReceipt = getTransactionReceiptMock
      getTransactionReceiptMock.mockResolvedValue(createWeb3TransactionReceipt())

      result = await fetchTransactionReceipt('0x0a00000000000000000000000000000000000000000000000000000000000001', data)
    })

    it('should return value', () =>
      expect(result?.hash).toEqual('0x0a00000000000000000000000000000000000000000000000000000000000001'))
    it('should call Web3', () => {
      expect(data.web3.eth.getTransactionReceipt).toBeCalledTimes(1)
      expect(getTransactionReceiptMock.mock.calls[0][0]).toEqual(
        '0x0a00000000000000000000000000000000000000000000000000000000000001'
      )
    })
  })

  describe('Null', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumData()
      data.web3.eth.getTransactionReceipt = getTransactionReceiptMock
      getTransactionReceiptMock.mockResolvedValue(null)

      result = await fetchTransactionReceipt('0x0a00000000000000000000000000000000000000000000000000000000000001', data)
    })

    it('should return null', () => expect(result).toBeNull())
    it('should call Web3', () => {
      expect(data.web3.eth.getTransactionReceipt).toBeCalledTimes(1)
      expect(getTransactionReceiptMock.mock.calls[0][0]).toEqual(
        '0x0a00000000000000000000000000000000000000000000000000000000000001'
      )
    })
  })
})

describe('Fetch pending transaction', () => {
  const transaction = createWeb3Transaction()
  let result: Transaction

  describe('Resolved', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumData()
      data.web3.eth.getTransaction = getTransactionMock
      getTransactionMock.mockResolvedValue(transaction)

      result = await fetchPendingTransaction('0x0a00000000000000000000000000000000000000000000000000000000000001', data)
    })

    it('should return value', () =>
      expect(result?.hash).toEqual('0x0a00000000000000000000000000000000000000000000000000000000000001'))
    it('should call Web3', () => {
      expect(data.web3.eth.getTransaction).toBeCalledTimes(1)
      expect(getTransactionMock.mock.calls[0][0]).toEqual(
        '0x0a00000000000000000000000000000000000000000000000000000000000001'
      )
    })
  })

  describe('Null', () => {
    beforeAll(async () => {
      clearMocks()
      data = createEthereumData()
      data.web3.eth.getTransaction = getTransactionMock
      getTransactionMock.mockResolvedValue(null)

      result = await fetchPendingTransaction('0x0a00000000000000000000000000000000000000000000000000000000000001', data)
    })

    it('should return null', () => expect(result).toBeNull())
    it('should call Web3', () => {
      expect(data.web3.eth.getTransaction).toBeCalledTimes(1)
      expect(getTransactionMock.mock.calls[0][0]).toEqual(
        '0x0a00000000000000000000000000000000000000000000000000000000000001'
      )
    })
  })
})
