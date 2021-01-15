import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Address from 'components/common/Address'
import { AddressType } from 'libraries/ethereum/types'

describe('<Address />', () => {
  let component: ReactWrapper

  describe('Long', () => {
    beforeAll(() => {
      component = mount(
        <Address
          address={{
            hash: '0x0000000000000000000000000000000000000111',
            type: AddressType.Unknown,
            url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
          }}
          size="lg"
          className="app-class"
        />
      )
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.hasClass('app-text-lg')).toBeTruthy()
      expect(button.hasClass('app-class')).toBeTruthy()
      expect(button.prop('href')).toBe('https://etherscan.io/address/0x0000000000000000000000000000000000000111')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Short', () => {
    beforeAll(() => {
      component = mount(
        <Address
          address={{
            hash: '0x0000000000000000000000000000000000000111',
            type: AddressType.Unknown,
            url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
          }}
          size="lg"
          short
        />
      )
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.hasClass('app-text-lg')).toBeTruthy()
      expect(button.prop('href')).toBe('https://etherscan.io/address/0x0000000000000000000000000000000000000111')
    })
  })
})
