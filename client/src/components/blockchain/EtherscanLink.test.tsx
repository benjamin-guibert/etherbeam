import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import EtherscanLink from './EtherscanLink'

describe('<EtherscanLink />', () => {
  const url = 'https://etherscan.io/address/0x0000000000000000000000000000000000000111'
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<EtherscanLink url={url} />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('href')).toBe(url)
      expect(link.prop('description')).toBe('Etherscan')
      expect(link.prop('external')).toBeTruthy()

      const div = link.find('div')
      expect(div.hasClass('my-etherscanlink-img')).toBeTruthy()
      expect(div.find('img').at(0).exists()).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Size', () => {
    beforeAll(() => {
      component = shallow(<EtherscanLink url={url} size="l" />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.hasClass('my-size-l')).toBeTruthy()
    })
  })
})
