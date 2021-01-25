import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Badge from './Badge'

describe('<Badge />', () => {
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Badge className="my-class">Content.</Badge>)
    })

    it('should render', () => {
      const span = component.find('span').at(0)
      expect(span.hasClass('my-badge')).toBeTruthy()
      expect(span.hasClass('my-color-neutral')).toBeTruthy()
      expect(span.hasClass('my-class')).toBeTruthy()
      expect(span.prop('children')).toBe('Content.')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Type', () => {
    beforeAll(() => {
      component = shallow(<Badge type="primary">Content.</Badge>)
    })

    it('should render', () => {
      const span = component.find('span').at(0)
      expect(span.hasClass('my-badge')).toBeTruthy()
      expect(span.hasClass('my-color-primary')).toBeTruthy()
      expect(span.prop('children')).toBe('Content.')
    })
  })
})
