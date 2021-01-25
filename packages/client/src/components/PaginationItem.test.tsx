import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import PaginationItem from './PaginationItem'

describe('<PaginationItem />', () => {
  const onClick = jest.fn()

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page={5} onClick={onClick} />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('title')).toBe('Page 5')
      expect(link.prop('onClick')).toBe(onClick)
      expect(link.prop('disabled')).toBeFalsy()
      expect(link.prop('active')).toBeFalsy()
      expect(link.prop('children')).toBe(5)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('First', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="first" onClick={onClick} />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('title')).toBe('First page')
      expect(link.find('FontAwesomeIcon').at(0).exists()).toBeTruthy()
    })
  })

  describe('Previous', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="previous" onClick={onClick} />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('title')).toBe('Previous page')
      expect(link.find('FontAwesomeIcon').at(0).exists()).toBeTruthy()
    })
  })

  describe('Ellipsis', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="ellipsis" onClick={onClick} />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('title')).toBeNull()
      expect(link.find('FontAwesomeIcon').at(0).exists()).toBeTruthy()
    })
  })

  describe('Next', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="next" onClick={onClick} />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('title')).toBe('Next page')
      expect(link.find('FontAwesomeIcon').at(0).exists()).toBeTruthy()
    })
  })

  describe('Last', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page="last" onClick={onClick} />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('title')).toBe('Last page')
      expect(link.find('FontAwesomeIcon').at(0).exists()).toBeTruthy()
    })
  })

  describe('Selected', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page={5} onClick={onClick} selected />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('disabled')).toBeFalsy()
      expect(link.prop('active')).toBeTruthy()
    })
  })

  describe('Disabled', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page={5} onClick={onClick} disabled />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('disabled')).toBeTruthy()
      expect(link.prop('active')).toBeFalsy()
    })
  })

  describe('Selected & disabled', () => {
    beforeAll(() => {
      component = shallow(<PaginationItem page={5} onClick={onClick} selected disabled />)
    })

    it('should render', () => {
      const link = component.find('Link')
      expect(link.prop('disabled')).toBeTruthy()
      expect(link.prop('active')).toBeTruthy()
    })
  })
})
