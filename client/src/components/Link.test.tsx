import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { clearMocks, mockFontAwesome } from '../../tests/helpers'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Link from './Link'

mockFontAwesome()

describe('<Link />', () => {
  const description = 'Description'
  const label = 'Label'
  const icon = faExclamationCircle
  const href = '/href'
  const className = 'my-class'

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      clearMocks()

      component = shallow(<Link href={href} label={label} />)
    })

    it('should render', () => {
      const a = component.find('a')
      expect(a.prop('href')).toBeUndefined()
      expect(a.prop('target')).toBeUndefined()
      expect(a.prop('onClick')).toBeDefined()
      expect(a.prop('onKeyUp')).toBeDefined()
      expect(a.prop('tabIndex')).toBe(0)
      expect(a.hasClass('my-ulink')).toBeTruthy()
      expect(a.hasClass('my-secondary-fg')).toBeTruthy()
    })

    it('should render icon', () => expect(component.find('span').at(0).prop('children')).toBe(label))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Icon', () => {
    beforeAll(() => {
      component = shallow(<Link href={href} label={label} icon={icon} />)
    })

    it('should render icon', () => {
      const icon = component.find('Icon')
      expect(icon.prop('icon')).toBeDefined()
      expect(icon.prop('label')).toBe(label)
    })
  })

  describe('Custom', () => {
    beforeAll(() => {
      component = shallow(<Link href={href}>{label}</Link>)
    })

    it('should render items', () => expect(component.find('a').prop('children')).toContain(label))
  })

  describe('Description', () => {
    beforeAll(() => {
      clearMocks()

      component = shallow(<Link href={href} label={label} description={description} />)
    })

    it('should render', () => expect(component.find('a').prop('title')).toBe(description))
  })

  describe('External', () => {
    beforeAll(() => {
      clearMocks()

      component = shallow(<Link href={href} label={label} external />)
    })

    it('should render', () => {
      const a = component.find('a')
      expect(a.prop('href')).toBe(href)
      expect(a.prop('target')).toBe('_blank')
      expect(a.prop('onClick')).toBeUndefined()
      expect(a.prop('onKeyUp')).toBeUndefined()
    })
  })

  describe('No underline', () => {
    beforeAll(() => {
      clearMocks()

      component = shallow(<Link href={href} label={label} noUnderline />)
    })

    it('should render', () => expect(component.find('a').hasClass('my-link')).toBeTruthy())
  })

  describe('Active', () => {
    beforeAll(() => {
      clearMocks()

      component = shallow(<Link href={href} label={label} active />)
    })

    it('should render', () => expect(component.find('a').hasClass('my-active')).toBeTruthy())
  })

  describe('Disabled', () => {
    beforeAll(() => {
      clearMocks()

      component = shallow(<Link href={href} label={label} disabled />)
    })

    it('should render', () => {
      const a = component.find('a')
      expect(a.prop('tabIndex')).toBeUndefined()
      expect(a.hasClass('my-disabled-fg')).toBeTruthy()
    })
  })

  describe('Class', () => {
    beforeAll(() => {
      clearMocks()

      component = shallow(<Link href={href} label={label} className={className} />)
    })

    it('should render', () => expect(component.find('a').hasClass(className)).toBeTruthy())
  })
})
