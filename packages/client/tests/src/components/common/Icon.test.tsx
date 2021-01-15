import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Icon from 'components/common/Icon'

describe('<Icon />', () => {
  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = mount(<Icon src="source" alt="alt" size="xl" className="app-class" />)
    })

    it('should render', () => {
      const img = component.find('img')
      expect(img.hasClass('app-icon')).toBeTruthy()
      expect(img.hasClass('app-icon-xl')).toBeTruthy()
      expect(img.hasClass('app-class')).toBeTruthy()
      expect(img.prop('src')).toBe('source')
      expect(img.prop('alt')).toBe('alt')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('No vertical alignment', () => {
    beforeAll(() => {
      component = mount(<Icon src="source" alt="alt" size="xl" className="app-class" noVerticalAlignment />)
    })

    it('should render', () => {
      const img = component.find('img')
      expect(img.hasClass('app-icon')).toBeTruthy()
      expect(img.hasClass('app-icon-xl')).toBeTruthy()
      expect(img.hasClass('app-va-0')).toBeTruthy()
      expect(img.hasClass('app-class')).toBeTruthy()
      expect(img.prop('src')).toBe('source')
      expect(img.prop('alt')).toBe('alt')
    })
  })
})
