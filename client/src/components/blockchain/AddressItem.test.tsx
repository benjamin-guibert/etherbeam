import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Address, AddressType } from 'libraries/types'
import AddressItem from './AddressItem'

describe('<AddressItem />', () => {
  const className = 'my-class'
  let address: Address
  let component: ReactWrapper

  describe('Address hash', () => {
    beforeAll(() => {
      address = {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      }

      component = mount(<AddressItem address={address} />)
    })

    it('should render link', () => {
      const link = component.find('Link')
      expect(link.prop('href')).toBe(address.url)
      expect(link.prop('external')).toBeTruthy()
      expect(link.prop('color')).toBeUndefined()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Address flag', () => {
    beforeAll(() => {
      address = {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Wallet,
        label: 'My Wallet',
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      }

      component = mount(<AddressItem address={address} />)
    })

    it('should render link', () => {
      const link = component.find('Link')
      expect(link.prop('href')).toBe(address.url)
      expect(link.prop('external')).toBeTruthy()
      expect(link.prop('color')).toBeUndefined()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Color', () => {
    beforeAll(() => {
      address = {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      }

      component = mount(<AddressItem address={address} color="primary" />)
    })

    it('should render link', () => expect(component.find('Link').prop('color')).toBe('primary'))
  })

  describe('Class', () => {
    beforeAll(() => {
      address = {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      }

      component = mount(<AddressItem address={address} className={className} />)
    })

    it('should render span', () => expect(component.find('span').at(0).prop('className')).toBe(className))
  })
})
