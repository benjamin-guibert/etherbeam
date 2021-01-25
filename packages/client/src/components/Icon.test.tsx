import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Icon from './Icon'

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    __esModule: true,
    FontAwesomeIcon: () => <svg />,
  }
})

describe('<Icon />', () => {
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Icon label="Label" icon={null} />)
    })

    it('should render', () => {
      const span = component.find('span').at(0)
      expect(span.hasClass('my-icon')).toBeTruthy()
      const iconSpan = span.children().at(0)
      expect(iconSpan.hasClass('my-icon-svg')).toBeTruthy()
      expect(iconSpan.find('FontAwesomeIcon').exists()).toBeTruthy()
      const labelSpan = span.children().at(1)
      expect(labelSpan.hasClass('my-icon-label')).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Breakpoint', () => {
    beforeAll(() => {
      component = shallow(<Icon label="Label" labelBreakpoint="m" icon={null} />)
    })

    it('should render', () => {
      const span = component.find('span').at(0).children().at(1)
      expect(span.hasClass('my-icon-label')).toBeTruthy()
      expect(span.hasClass('my-d-min-m')).toBeTruthy()
    })
  })

  describe('Class', () => {
    beforeAll(() => {
      component = shallow(<Icon label="Label" className="my-class" icon={null} />)
    })

    it('should render', () => {
      const span = component.find('span').at(0)
      expect(span.hasClass('my-icon')).toBeTruthy()
      expect(span.hasClass('my-class')).toBeTruthy()
    })
  })

  describe('No label', () => {
    beforeAll(() => {
      component = shallow(<Icon icon={null} />)
    })

    it('should render', () => expect(component.find('span').at(0).children()).toHaveLength(1))
  })
})
