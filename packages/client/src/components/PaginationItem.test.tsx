import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import PaginationItem from './PaginationItem'

describe('<PaginationItem />', () => {
  const onClick = jest.fn()

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page={5} action={onClick} />)
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.prop('description')).toBe('Page 5')
      expect(button.prop('action')).toBe(onClick)
      expect(button.prop('disabled')).toBeFalsy()
      expect(button.prop('active')).toBeFalsy()
      expect(button.prop('label')).toBe('5')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('First', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="first" action={onClick} />)
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.prop('description')).toBe('First page')
      expect(button.prop('icon')).toBeDefined()
    })
  })

  describe('Previous', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="previous" action={onClick} />)
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.prop('description')).toBe('Previous page')
      expect(button.prop('icon')).toBeDefined()
    })
  })

  describe('Ellipsis', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="ellipsis" action={onClick} />)
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.prop('description')).toBeNull()
      expect(button.prop('icon')).toBeDefined()
    })
  })

  describe('Next', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="next" action={onClick} />)
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.prop('description')).toBe('Next page')
      expect(button.prop('icon')).toBeDefined()
    })
  })

  describe('Last', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="last" action={onClick} />)
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.prop('description')).toBe('Last page')
      expect(button.prop('icon')).toBeDefined()
    })
  })

  describe('Selected', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page={5} action={onClick} selected />)
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.prop('disabled')).toBeFalsy()
      expect(button.prop('active')).toBeTruthy()
    })
  })

  describe('Disabled', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page={5} action={onClick} disabled />)
    })

    it('should render', () => {
      const button = component.find('Button')
      expect(button.prop('disabled')).toBeTruthy()
      expect(button.prop('active')).toBeFalsy()
    })
  })
})
