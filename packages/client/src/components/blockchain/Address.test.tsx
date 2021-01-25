import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Address as AddressProp, AddressType } from 'libraries/ethereum/types'
import Address from './Address'

describe('<Address />', () => {
  let address: AddressProp
  let component: ReactWrapper

  describe('Long', () => {
    beforeAll(() => {
      address = {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      }

      component = mount(<Address address={address} />)
    })

    it('should render link', () => {
      const link = component.find('Link')
      expect(link.prop('href')).toBe(address.url)
      expect(link.prop('blank')).toBeTruthy()
    })

    it('should render span', () => {
      const span = component.find('span').at(1)
      expect(span.hasClass('my-address-hash')).toBeTruthy()
      expect(span.prop('children')).toBe(address.hash)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Short', () => {
    beforeAll(() => {
      address = {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      }

      component = mount(<Address address={address} short />)
    })

    it('should render span', () => {
      const span = component.find('span').at(1)
      expect(span.hasClass('my-address-hash')).toBeTruthy()
      expect(span.prop('children')).toBe('0x0000...0111')
    })
  })

  describe('Flag', () => {
    beforeAll(() => {
      address = {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Wallet,
        label: 'My Wallet',
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      }

      component = mount(<Address address={address} />)
    })

    it('should render icon', () => expect(component.find('Icon').prop('label')).toBe(address.label))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('No flag', () => {
    beforeAll(() => {
      address = {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Wallet,
        label: 'My Wallet',
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      }

      component = mount(<Address address={address} noFlag />)
    })

    it('should render span', () => expect(component.find('span').at(1).prop('children')).toBe(address.hash))
  })
})
