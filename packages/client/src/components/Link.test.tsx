import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { clearMocks } from '../../tests/helpers'
import Link from './Link'

describe('<Link />', () => {
  const onClick = jest.fn()

  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Link title="Title" href="/href" onClick={onClick}>
          Link
        </Link>
      )
    })

    it('should render', () => {
      const a = component.find('a')
      expect(a.prop('title')).toBe('Title')
      expect(a.prop('href')).toBe('/href')
      expect(a.prop('target')).toBe(null)
      expect(a.prop('tabIndex')).toBe(0)
      expect(a.prop('children')).toBe('Link')
      expect(a.hasClass('my-link')).toBeTruthy()
      expect(a.hasClass('my-active')).toBeFalsy()
      expect(a.hasClass('my-disabled')).toBeFalsy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('On click', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Link title="Title" onClick={onClick}>
          Link
        </Link>
      )

      act(() => {
        component.find('a').simulate('click')
        component.update()
      })
    })

    it('should call onClick', () => expect(onClick).toBeCalledTimes(1))
  })

  describe('On key up (enter)', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Link title="Title" onClick={onClick}>
          Link
        </Link>
      )

      act(() => {
        component.find('a').simulate('keyUp', { key: 'Enter' })
        component.update()
      })
    })

    it('should call onClick', () => expect(onClick).toBeCalledTimes(1))
  })

  describe('On key up (other)', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Link title="Title" onClick={onClick}>
          Link
        </Link>
      )

      act(() => {
        component.find('a').simulate('keyUp', { key: 'a' })
        component.update()
      })
    })

    it('should not call onClick', () => expect(onClick).toBeCalledTimes(0))
  })

  describe('Blank', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Link title="Title" href="/href" onClick={onClick} blank>
          Link
        </Link>
      )
    })

    it('should render', () => expect(component.find('a').prop('target')).toBe('_blank'))
  })

  describe('Active', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Link title="Title" href="/href" onClick={onClick} active>
          Link
        </Link>
      )
    })

    it('should render', () => {
      const a = component.find('a')
      expect(a.prop('tabIndex')).toBe(0)
      expect(a.hasClass('my-link')).toBeTruthy()
      expect(a.hasClass('my-active')).toBeTruthy()
      expect(a.hasClass('my-disabled')).toBeFalsy()
    })
  })

  describe('Disabled', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Link title="Title" href="/href" onClick={onClick} disabled>
          Link
        </Link>
      )
    })

    it('should render', () => {
      const a = component.find('a')
      expect(a.prop('tabIndex')).toBeNull()
      expect(a.hasClass('my-link')).toBeTruthy()
      expect(a.hasClass('my-active')).toBeFalsy()
      expect(a.hasClass('my-disabled')).toBeTruthy()
    })
  })

  describe('Active & disabled', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Link title="Title" href="/href" onClick={onClick} active disabled>
          Link
        </Link>
      )
    })

    it('should render', () => {
      const a = component.find('a')
      expect(a.prop('tabIndex')).toBeNull()
      expect(a.hasClass('my-link')).toBeTruthy()
      expect(a.hasClass('my-active')).toBeTruthy()
      expect(a.hasClass('my-disabled')).toBeTruthy()
    })
  })
})
