import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { clearMocks, mockFontAwesome } from '../../tests/helpers'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

mockFontAwesome()

describe('<Button />', () => {
  const description = 'Description'
  const label = 'Label'
  const icon = faExclamationCircle
  const className = 'my-class'
  const action = jest.fn()

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Button action={action} label={label} />)
    })

    it('should render button', () => {
      const button = component.find('button')
      expect(button.hasClass('my-button')).toBeTruthy()
      expect(button.hasClass('my-clickable')).toBeTruthy()
      expect(button.hasClass('my-light-bg')).toBeTruthy()
      expect(button.prop('onClick')).toBe(action)
    })

    it('should render icon', () => expect(component.find('span').at(0).prop('children')).toBe(label))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Description', () => {
    beforeAll(() => {
      component = shallow(<Button action={action} label={label} description={description} />)
    })

    it('should render', () => expect(component.find('button').prop('title')).toBe(description))
  })

  describe('Link', () => {
    beforeAll(() => {
      component = shallow(<Button action={action} label={label} link />)
    })

    it('should render', () => {
      const button = component.find('button')
      expect(button.hasClass('my-button-link')).toBeTruthy()
      expect(button.hasClass('my-clickable')).toBeTruthy()
      expect(button.hasClass('my-light-fg')).toBeTruthy()
      expect(button.prop('onClick')).toBe(action)
      expect(button.prop('title')).toBeUndefined()
    })
  })

  describe('Color', () => {
    beforeAll(() => {
      component = shallow(<Button action={action} label={label} color="primary" />)
    })

    it('should render', () => expect(component.find('button').hasClass('my-primary-bg')).toBeTruthy())
  })

  describe('Icon', () => {
    beforeAll(() => {
      component = shallow(<Button action={action} label={label} icon={icon} />)
    })

    it('should render icon', () => {
      const icon = component.find('Icon')
      expect(icon.prop('icon')).toBeDefined()
      expect(icon.prop('label')).toBe(label)
    })
  })

  describe('Disabled', () => {
    beforeAll(() => {
      component = shallow(<Button action={action} label={label} disabled />)
    })

    it('should render', () => expect(component.find('button').hasClass('my-disabled-fg')).toBeTruthy())
  })

  describe('Active', () => {
    beforeAll(() => {
      component = shallow(<Button action={action} label={label} active />)
    })

    it('should render', () => expect(component.find('button').hasClass('my-active')).toBeTruthy())
  })

  describe('Class', () => {
    beforeAll(() => {
      component = shallow(<Button action={action} label={label} className={className} />)
    })

    it('should render', () => expect(component.find('button').hasClass(className)).toBeTruthy())
  })

  describe('On click', () => {
    beforeAll(() => {
      clearMocks()
      component = shallow(<Button action={action} label={label} />)

      act(() => {
        component.find('button').simulate('click')
        component.update()
      })
    })

    it('should call action', () => expect(action).toBeCalledTimes(1))
  })
})
