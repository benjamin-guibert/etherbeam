import { Transaction, TransactionStatus } from './types'
import { parseWeb3Transaction, parseWeb3TransactionReceipt } from './web3Parsers'
import { createEthereumData } from '../../tests/fixtures/ethereum'
import { createWeb3Transaction, createWeb3TransactionReceipt } from '../../tests/fixtures/web3'
import Web3 from 'web3'
import { EthereumData } from 'libraries/ethereum'

let data: EthereumData

describe('Parse Web3 transaction', () => {
  let result: Transaction

  beforeAll(() => {
    data = createEthereumData()
    const web3Transaction = createWeb3Transaction()

    result = parseWeb3Transaction(data, web3Transaction, TransactionStatus.mined, new Date(2020, 4, 5, 11, 22, 33))
  })

  it('should parse', () => {
    expect(result).toMatchObject({
      hash: '0x0a00000000000000000000000000000000000000000000000000000000000001',
      status: TransactionStatus.mined,
      dateTime: new Date(2020, 4, 5, 11, 22, 33),
      blockNumber: 1000,
      from: '0x0a00000000000000000000000000000000000111',
      to: '0x0a00000000000000000000000000000000000222',
      value: Web3.utils.toBN('1000000000000000000'),
      gasUnitPrice: Web3.utils.toBN('500'),
      gasLimit: 10000,
      systemLogs: [],
    })
  })
})

describe('Parse Web3 transaction receipt', () => {
  let result: Transaction

  describe('Validated', () => {
    beforeAll(() => {
      data = createEthereumData()
      const web3Receipt = createWeb3TransactionReceipt()
      web3Receipt.status = true

      result = parseWeb3TransactionReceipt(data, web3Receipt)
    })

    it('should parse', () => {
      expect(result).toMatchObject({
        hash: '0x0a00000000000000000000000000000000000000000000000000000000000001',
        status: TransactionStatus.validated,
        from: '0x0a00000000000000000000000000000000000111',
        to: '0x0a00000000000000000000000000000000000222',
        gasUsed: 9000,
        logs: [],
        systemLogs: [],
      })
    })
  })
  describe('Cancelled', () => {
    beforeAll(() => {
      data = createEthereumData()
      const web3Receipt = createWeb3TransactionReceipt()
      web3Receipt.status = false

      result = parseWeb3TransactionReceipt(data, web3Receipt)
    })

    it('should parse', () => {
      expect(result).toMatchObject({
        hash: '0x0a00000000000000000000000000000000000000000000000000000000000001',
        status: TransactionStatus.cancelled,
        from: '0x0a00000000000000000000000000000000000111',
        to: '0x0a00000000000000000000000000000000000222',
        gasUsed: 9000,
        logs: [],
        systemLogs: [],
      })
    })
  })
})
