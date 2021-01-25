import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { createToken } from '../../../tests/fixtures/ethereum'
import { BigNumber } from 'ethers'
import TokenAmount from './TokenAmount'

describe('<TokenAmount />', () => {
  let component: ShallowWrapper

  describe('Ether', () => {
    beforeAll(() => {
      component = shallow(<TokenAmount amount={BigNumber.from('1000000000000000000000')} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('type')).toBeUndefined()

      const spans = badge.find('span')
      expect(spans.at(0).hasClass('my-symbol')).toBeTruthy()
      expect(spans.at(0).prop('children')).toEqual('ETH')
      expect(spans.at(1).hasClass('my-amount')).toBeTruthy()
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
      component = shallow(<TokenAmount amount={BigNumber.from('1000000000000000000000')} color="success" />)
    })

    it('should render', () => expect(component.find('Badge').prop('type')).toBe('success'))
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
})
