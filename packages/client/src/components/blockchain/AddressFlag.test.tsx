import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import AddressFlag from './AddressFlag'
import { AddressType } from 'libraries/ethereum/types'

describe('<AddressFlag />', () => {
  const address = {
    hash: '0x0000000000000000000000000000000000000111',
    type: AddressType.Wallet,
    label: 'Wallet',
    url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
  }
  const className = 'my-class'

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<AddressFlag address={address} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('color')).toBeUndefined()
      expect(badge.prop('className')).toBeUndefined()
      const icon = badge.find('Icon')
      expect(icon.prop('icon')).toBeDefined()
      expect(icon.prop('label')).toBe(address.label)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Color', () => {
    beforeAll(() => {
      component = shallow(<AddressFlag address={address} color="primary" />)
    })

    it('should render', () => expect(component.find('Badge').prop('color')).toBe('primary'))
  })

  describe('Class', () => {
    beforeAll(() => {
      component = shallow(<AddressFlag address={address} className={className} />)
    })

    it('should render', () => expect(component.find('Badge').hasClass(className)).toBeTruthy())
  })
})
