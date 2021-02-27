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
      expect(div.hasClass('my-light-bg')).toBeTruthy()
      expect(div.prop('children')).toBe(content)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Color', () => {
    beforeAll(() => {
      component = shallow(<Alert color="primary">{content}</Alert>)
    })

    it('should render', () => expect(component.find('div').at(0).hasClass('my-primary-bg')).toBeTruthy())
  })
})
