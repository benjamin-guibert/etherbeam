import { getEtherscanUrl, createTransactionAddress } from 'libraries/ethereum/ethereum'
import { AddressType } from 'libraries/ethereum/types'

describe('Get Etherscan URL', () => {
  it('should get an URL from string ID', () => {
    const url = getEtherscanUrl('tx', '0x0000000000000000000000000000000000000000000000000000000000000001')

    expect(url).toBe('https://etherscan.io/tx/0x0000000000000000000000000000000000000000000000000000000000000001')
  })

  it('should get an URL from number ID', () => {
    const url = getEtherscanUrl('block', 1)

    expect(url).toBe('https://etherscan.io/block/1')
  })
})

describe('Create transaction address flag', () => {
  it('should create an address flag', () => {
    const address = createTransactionAddress('0x0000000000000000000000000000000000000000000000000000000000000001')

    expect(address).toMatchObject({
      hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
      type: AddressType.Transaction,
      url: 'https://etherscan.io/tx/0x0000000000000000000000000000000000000000000000000000000000000001',
    })
  })
})
