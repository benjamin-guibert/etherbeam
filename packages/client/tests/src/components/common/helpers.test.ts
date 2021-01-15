import { printEtherAmount, printTokenAmount, shortenAddress } from 'components/common/helpers'
import { BigNumber } from 'ethers'
import { createToken } from '../../../fixtures/ethereum'

describe('Print Ether amount', () => {
  const amount = BigNumber.from('1234567890000000000000')

  let result: string

  describe('Default', () => {
    beforeAll(() => {
      result = printEtherAmount(amount)
    })

    it('should return', () => expect(result).toBe('1,234.56789'))
  })

  describe('Decimals below', () => {
    beforeAll(() => {
      result = printEtherAmount(amount, { decimals: 4 })
    })

    it('should return', () => expect(result).toBe('1,234.5679'))
  })

  describe('Decimals above', () => {
    beforeAll(() => {
      result = printEtherAmount(amount, { decimals: 8 })
    })

    it('should return', () => expect(result).toBe('1,234.56789'))
  })

  describe('Forced decimals', () => {
    beforeAll(() => {
      result = printEtherAmount(amount, { decimals: 8, forceDecimals: true })
    })

    it('should return', () => expect(result).toBe('1,234.56789000'))
  })

  describe('Unit', () => {
    beforeAll(() => {
      result = printEtherAmount(amount, null, 'gwei')
    })

    it('should return', () => expect(result).toBe('1,234,567,890,000'))
  })

  describe('Symbol', () => {
    beforeAll(() => {
      result = printEtherAmount(amount, { withSymbol: true })
    })

    it('should return', () => expect(result).toBe('ETH 1,234.56789'))
  })

  describe('Null', () => {
    beforeAll(() => {
      result = printEtherAmount(null)
    })

    it('should return', () => expect(result).toBe('?'))
  })
})

describe('Print Token amount', () => {
  const token = createToken('0x0000000000000000000000000000000000000111')
  const amount = BigNumber.from('1234567890000000000000')

  let result: string

  describe('Default', () => {
    beforeAll(() => {
      result = printTokenAmount(amount, token)
    })

    it('should return', () => expect(result).toBe('1,234.56789'))
  })

  describe('Decimals below', () => {
    beforeAll(() => {
      result = printTokenAmount(amount, token, { decimals: 4 })
    })

    it('should return', () => expect(result).toBe('1,234.5679'))
  })

  describe('Decimals above', () => {
    beforeAll(() => {
      result = printTokenAmount(amount, token, { decimals: 8 })
    })

    it('should return', () => expect(result).toBe('1,234.56789'))
  })

  describe('Forced decimals', () => {
    beforeAll(() => {
      result = printTokenAmount(amount, token, { decimals: 8, forceDecimals: true })
    })

    it('should return', () => expect(result).toBe('1,234.56789000'))
  })

  describe('Symbol', () => {
    beforeAll(() => {
      result = printTokenAmount(amount, token, { withSymbol: true })
    })

    it('should return', () => expect(result).toBe('TKN 1,234.56789'))
  })

  describe('Low value', () => {
    beforeAll(() => {
      result = printTokenAmount(BigNumber.from('1234567890000000'), token)
    })

    it('should return', () => expect(result).toBe('0.00123456789'))
  })

  describe('Null', () => {
    beforeAll(() => {
      result = printTokenAmount(null, token)
    })

    it('should return', () => expect(result).toBe('?'))
  })
})

describe('Shorten address', () => {
  let result: string

  beforeAll(() => {
    result = shortenAddress('0x1234567890000000000000000000000123456789')
  })
  it('should return', () => expect(result).toBe('0x1234...6789'))
})
