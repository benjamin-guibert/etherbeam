import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockFontAwesome } from '../../tests/helpers'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon'

mockFontAwesome()

describe('<Icon />', () => {
  const icon = faExclamationCircle
  const label = 'Label'
  const className = 'my-class'

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Icon icon={icon} />)
    })

    it('should render', () => {
      const span = component.find('span').at(0)
      expect(span.hasClass('my-icon')).toBeTruthy()
      expect(span.find('FontAwesomeIcon').exists()).toBeTruthy()
    })
  })

  describe('Label', () => {
    beforeAll(() => {
      component = shallow(<Icon icon={icon} label={label} />)
    })

    it('should render', () =>
      expect(component.find('span').at(0).children().at(1).hasClass('my-icon-label')).toBeTruthy())

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Label breakpoint', () => {
    beforeAll(() => {
      component = shallow(<Icon icon={icon} label={label} labelBreakpoint="m" />)
    })

    it('should render', () => expect(component.find('span').at(0).children().at(1).hasClass('my-d-min-m')).toBeTruthy())
  })

  describe('Size', () => {
    beforeAll(() => {
      component = shallow(<Icon icon={icon} size="l" />)
    })

    it('should render', () => expect(component.find('span').at(0).hasClass('my-size-l')).toBeTruthy())
  })

  describe('Icon size', () => {
    beforeAll(() => {
      component = shallow(<Icon icon={icon} iconSize="l" />)
    })

    it('should render', () =>
      expect(component.find('span').at(1).find('span').at(0).hasClass('my-size-l')).toBeTruthy())
  })

  describe('Class', () => {
    beforeAll(() => {
      component = shallow(<Icon icon={icon} className={className} />)
    })

    it('should render', () => expect(component.find('span').at(0).hasClass(className)).toBeTruthy())
  })
})
