import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import EtherscanLink from 'components/common/EtherscanLink'

describe('<EtherscanLink />', () => {
  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = mount(
        <EtherscanLink
          url="https://etherscan.io/address/0x0000000000000000000000000000000000000111"
          size="sm"
          className="app-class"
        />
      )
    })

    it('should render button', () => {
      const button = component.find('Button')
      expect(button.prop('href')).toBe('https://etherscan.io/address/0x0000000000000000000000000000000000000111')
      expect(button.hasClass('app-class')).toBeTruthy()
    })

    it('should render icon', () => {
      const icon = component.find('Icon')
      expect(icon.prop('size')).toBe('sm')
      expect(icon.prop('alt')).toBe('Link to Etherscan')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Without vertical alignment', () => {
    beforeAll(() => {
      component = mount(
        <EtherscanLink
          url="https://etherscan.io/address/0x0000000000000000000000000000000000000111"
          size="sm"
          className="app-class"
          noVerticalAlignment
        />
      )
    })

    it('should render button', () => {
      const button = component.find('Button')
      expect(button.prop('href')).toBe('https://etherscan.io/address/0x0000000000000000000000000000000000000111')
      expect(button.hasClass('app-class')).toBeTruthy()
    })

    it('should render icon', () => {
      const icon = component.find('Icon')
      expect(icon.prop('size')).toBe('sm')
      expect(icon.prop('alt')).toBe('Link to Etherscan')
      expect(icon.prop('noVerticalAlignment')).toBeTruthy()
    })
  })
})
