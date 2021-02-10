import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Block from './Block'

describe('<Block />', () => {
  const content = 'Content.'
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Block>{content}</Block>)
    })

    it('should render', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('my-block')).toBeTruthy()
      expect(div.prop('children')).toBe(content)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Class', () => {
    const className = 'my-class'

    beforeAll(() => {
      component = shallow(<Block className={className}>{content}</Block>)
    })

    it('should render', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('my-block')).toBeTruthy()
      expect(div.hasClass(className)).toBeTruthy()
    })
  })
})
