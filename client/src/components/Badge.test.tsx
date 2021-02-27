import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Badge from './Badge'

describe('<Badge />', () => {
  const content = 'Content.'
  const classNane = 'my-class'

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Badge>{content}</Badge>)
    })

    it('should render', () => {
      const span = component.find('span').at(0)
      expect(span.hasClass('my-badge')).toBeTruthy()
      expect(span.hasClass('my-light-bg')).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Color', () => {
    beforeAll(() => {
      component = shallow(<Badge color="primary">{content}</Badge>)
    })

    it('should render', () => expect(component.find('span').at(0).hasClass('my-primary-bg')).toBeTruthy())
  })

  describe('Size', () => {
    beforeAll(() => {
      component = shallow(<Badge size="l">{content}</Badge>)
    })

    it('should render', () => expect(component.find('span').at(0).hasClass('my-size-l')).toBeTruthy())
  })

  describe('Class', () => {
    beforeAll(() => {
      component = shallow(<Badge className={classNane}>{content}</Badge>)
    })

    it('should render', () => expect(component.find('span').at(0).hasClass(classNane)).toBeTruthy())
  })
})
