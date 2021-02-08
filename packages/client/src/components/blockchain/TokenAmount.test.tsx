import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { createToken } from '../../../tests/fixtures/ethereum'
import { BigNumber } from 'ethers'
import TokenAmount from './TokenAmount'

describe('<TokenAmount />', () => {
  const className = 'my-class'
  let component: ShallowWrapper

  describe('Ether', () => {
    beforeAll(() => {
      component = shallow(<TokenAmount amount={BigNumber.from('1000000000000000000000')} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('color')).toBe('light')

      const spans = badge.find('span')
      expect(spans.at(0).hasClass('my-tokenamount-symbol')).toBeTruthy()
      expect(spans.at(0).prop('children')).toEqual('ETH')
      expect(spans.at(1).hasClass('my-tokenamount-amount')).toBeTruthy()
      expect(spans.at(1).prop('children')[1]).toEqual('1,000')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Token', () => {
    const token = createToken('0x0000000000000000000000000000000000000111')

    beforeAll(() => {
      component = shallow(<TokenAmount amount={BigNumber.from('1000000000000000000000')} token={token} />)
    })

    it('should render', () => {
      const spans = component.find('Badge').find('span')
      expect(spans.at(0).prop('children')).toEqual(token.symbol)
      expect(spans.at(1).prop('children')[1]).toEqual('1,000')
    })
  })

  describe('Color', () => {
    beforeAll(() => {
      component = shallow(<TokenAmount amount={BigNumber.from('1000000000000000000000')} color="primary" />)
    })

    it('should render', () => expect(component.find('Badge').prop('color')).toBe('primary'))
  })

  describe('Size', () => {
    beforeAll(() => {
      component = shallow(<TokenAmount amount={BigNumber.from('1000000000000000000000')} size="l" />)
    })

    it('should render', () => expect(component.find('Badge').prop('size')).toBe('l'))
  })

  describe('Print options', () => {
    beforeAll(() => {
      component = shallow(
        <TokenAmount
          amount={BigNumber.from('1000000000000000000000')}
          amountPrintOptions={{ decimals: 2, forceDecimals: true }}
        />
      )
    })

    it('should render', () => {
      const spans = component.find('Badge').find('span')
      expect(spans.at(1).prop('children')[1]).toEqual('1,000.00')
    })
  })

  describe('No symbol', () => {
    beforeAll(() => {
      component = shallow(<TokenAmount amount={BigNumber.from('1000000000000000000000')} noSymbol />)
    })

    it('should render', () => {
      const spans = component.find('Badge').find('span')
      expect(spans.at(0).hasClass('my-tokenamount-amount')).toBeTruthy()
      expect(spans.at(0).prop('children')[1]).toEqual('1,000')
    })
  })

  describe('Class', () => {
    beforeAll(() => {
      component = shallow(<TokenAmount amount={BigNumber.from('1000000000000000000000')} className={className} />)
    })

    it('should render', () => expect(component.find('Badge').prop('className')).toBe(className))
  })
})
