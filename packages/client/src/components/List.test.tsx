import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import List from './List'

describe('<List />', () => {
  const content = 'Content'
  const className = 'my-class'

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<List>{content}</List>)
    })

    it('should render', () => {
      const ul = component.find('ul')
      expect(ul.prop('children')).toBe(content)
      expect(ul.hasClass('my-list-v')).toBeTruthy()
      expect(ul.hasClass('my-list-h')).toBeFalsy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Horizontal', () => {
    beforeAll(() => {
      component = shallow(<List horizontal>{content}</List>)
    })

    it('should render', () => {
      const ul = component.find('ul')
      expect(ul.prop('children')).toBe(content)
      expect(ul.hasClass('my-list-v')).toBeFalsy()
      expect(ul.hasClass('my-list-h')).toBeTruthy()
    })
  })

  describe('Center', () => {
    beforeAll(() => {
      component = shallow(<List center>{content}</List>)
    })

    it('should render', () => expect(component.find('ul').hasClass('my-list-center')).toBeTruthy())
  })

  describe('Class', () => {
    beforeAll(() => {
      component = shallow(<List className={className}>{content}</List>)
    })

    it('should render', () => expect(component.find('ul').hasClass(className)).toBeTruthy())
  })
})
