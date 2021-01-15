import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import TokenAmount from 'components/common/TokenAmount'
import { createToken } from '../../../../tests/fixtures/ethereum'
import { BigNumber } from 'ethers'

describe('<TokenAmount />', () => {
  let component: ReactWrapper

  describe('Ether', () => {
    beforeAll(() => {
      component = mount(<TokenAmount amount={BigNumber.from('1000000000000000000000')} />)
    })

    it('should render', () => {
      const spans = component.find('Badge').find('span')
      expect(spans.at(1).prop('children')).toEqual('ETH')
      expect(spans.at(2).prop('children')).toEqual('1,000')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })
  describe('Token', () => {
    beforeAll(() => {
      const token = createToken('0x0000000000000000000000000000000000000111')
      component = mount(<TokenAmount amount={BigNumber.from('1000000000000000000000')} token={token} />)
    })

    it('should render', () => {
      const spans = component.find('Badge').find('span')
      expect(spans.at(1).prop('children')).toEqual('TKN')
      expect(spans.at(2).prop('children')).toEqual('1,000')
    })
  })
})
