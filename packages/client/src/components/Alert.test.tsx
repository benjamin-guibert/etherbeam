import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Alert from './Alert'

describe('<Alert />', () => {
  const content = 'Alert.'
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Alert>{content}</Alert>)
    })

    it('should render', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('my-alert')).toBeTruthy()
      expect(div.hasClass('my-color-neutral')).toBeTruthy()
      expect(div.prop('children')).toBe(content)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Type', () => {
    beforeAll(() => {
      component = shallow(<Alert type="primary">{content}</Alert>)
    })

    it('should render', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('my-alert')).toBeTruthy()
      expect(div.hasClass('my-color-primary')).toBeTruthy()
      expect(div.prop('children')).toBe(content)
    })
  })
})
