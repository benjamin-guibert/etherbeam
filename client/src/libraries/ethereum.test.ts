import { AddressType, Address } from './types'
import { getEtherscanUrl, createTransactionAddress } from './ethereum'

describe('Get Etherscan URL', () => {
  let result: string

  describe('Address', () => {
    beforeAll(() => {
      result = getEtherscanUrl('address', '0x0000000000000000000000000000000000000001')
    })

    it('should return', () =>
      expect(result).toBe('https://etherscan.io/address/0x0000000000000000000000000000000000000001'))
  })

  describe('Token', () => {
    beforeAll(() => {
      result = getEtherscanUrl('token', '0x0000000000000000000000000000000000000001')
    })

    it('should return', () =>
      expect(result).toBe('https://etherscan.io/token/0x0000000000000000000000000000000000000001'))
  })

  describe('Transaction', () => {
    beforeAll(() => {
      result = getEtherscanUrl('tx', '0x0000000000000000000000000000000000000000000000000000000000000001')
    })

    it('should return', () =>
      expect(result).toBe('https://etherscan.io/tx/0x0000000000000000000000000000000000000000000000000000000000000001'))
  })

  describe('Block', () => {
    beforeAll(() => {
      result = getEtherscanUrl('block', 1)
    })

    it('should return', () => expect(result).toBe('https://etherscan.io/block/1'))
  })
})

describe('Create transaction address flag', () => {
  let result: Address

  beforeAll(() => {
    result = createTransactionAddress('0x0000000000000000000000000000000000000000000000000000000000000001')
  })

  it('should return', () => {
    expect(result).toMatchObject({
      hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
      type: AddressType.Transaction,
      url: 'https://etherscan.io/tx/0x0000000000000000000000000000000000000000000000000000000000000001',
    })
  })
})
