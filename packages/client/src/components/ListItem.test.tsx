import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import ListItem from './ListItem'

describe('<ListItem />', () => {
  const content = 'Content'
  const className = 'my-class'

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<ListItem>{content}</ListItem>)
    })

    it('should render', () => {
      const li = component.find('li')
      expect(li.prop('children')).toBe(content)
      expect(li.hasClass('my-listitem')).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Class', () => {
    beforeAll(() => {
      component = shallow(<ListItem className={className}>{content}</ListItem>)
    })

    it('should render', () => {
      const li = component.find('li')
      expect(li.prop('children')).toBe(content)
      expect(li.hasClass('my-listitem')).toBeTruthy()
      expect(li.hasClass('my-class')).toBeTruthy()
    })
  })
})
