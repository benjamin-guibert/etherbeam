import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { clearMocks } from '../../tests/helpers'
import Pagination from './Pagination'

describe('<Pagination />', () => {
  const setCurrent = jest.fn()

  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(<Pagination total={6} current={5} setCurrent={setCurrent} />)
    })

    it('should render', () => {
      const ul = component.find('ul')
      expect(ul.hasClass('my-pagination')).toBeTruthy()
      expect(ul.hasClass('my-hlist')).toBeTruthy()
    })

    it('should render items', () => {
      const items = component.find('PaginationItem')
      expect(items).toHaveLength(10)
      expect(items.at(0).prop('disabled')).toBeFalsy()
      expect(items.at(1).prop('disabled')).toBeFalsy()
      expect(items.at(2).prop('selected')).toBeFalsy()
      expect(items.at(3).prop('selected')).toBeFalsy()
      expect(items.at(4).prop('selected')).toBeFalsy()
      expect(items.at(5).prop('selected')).toBeFalsy()
      expect(items.at(6).prop('selected')).toBeTruthy()
      expect(items.at(7).prop('selected')).toBeFalsy()
      expect(items.at(8).prop('disabled')).toBeFalsy()
      expect(items.at(9).prop('disabled')).toBeFalsy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Ellipsed', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} />)
    })

    it('should render items', () => {
      const items = component.find('PaginationItem')
      expect(items).toHaveLength(11)
      expect(items.at(0).prop('disabled')).toBeFalsy()
      expect(items.at(1).prop('disabled')).toBeFalsy()
      expect(items.at(2).prop('selected')).toBeFalsy()
      expect(items.at(3).prop('disabled')).toBeTruthy()
      expect(items.at(4).prop('selected')).toBeFalsy()
      expect(items.at(5).prop('selected')).toBeTruthy()
      expect(items.at(6).prop('selected')).toBeFalsy()
      expect(items.at(7).prop('disabled')).toBeTruthy()
      expect(items.at(8).prop('selected')).toBeFalsy()
      expect(items.at(9).prop('disabled')).toBeFalsy()
      expect(items.at(10).prop('disabled')).toBeFalsy()
    })
  })

  describe('Class', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(<Pagination total={6} current={5} setCurrent={setCurrent} className="my-class" />)
    })

    it('should render', () => {
      const ul = component.find('ul')
      expect(ul.hasClass('my-pagination')).toBeTruthy()
      expect(ul.hasClass('my-hlist')).toBeTruthy()
      expect(ul.hasClass('my-class')).toBeTruthy()
    })
  })

  describe('On click', () => {
    describe('First', () => {
      beforeAll(() => {
        clearMocks()
        setCurrent.mockImplementation((newValue) => {
          component.setProps({ current: newValue })
        })

        component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} />)

        act(() => {
          component.find('PaginationItem').at(0).find('a').simulate('click')
          component.update()
        })
      })

      it('should set current', () => {
        expect(setCurrent).toBeCalledTimes(1)
        expect(component.prop('current')).toBe(1)
      })

      it('should render items', () => {
        const items = component.find('PaginationItem')
        expect(items).toHaveLength(8)
        expect(items.at(0).prop('disabled')).toBeTruthy()
        expect(items.at(1).prop('disabled')).toBeTruthy()
        expect(items.at(2).prop('selected')).toBeTruthy()
        expect(items.at(3).prop('selected')).toBeFalsy()
        expect(items.at(4).prop('disabled')).toBeTruthy()
        expect(items.at(5).prop('selected')).toBeFalsy()
        expect(items.at(6).prop('disabled')).toBeFalsy()
        expect(items.at(7).prop('disabled')).toBeFalsy()
      })
    })
    describe('Previous', () => {
      beforeAll(() => {
        clearMocks()
        setCurrent.mockImplementation((newValue) => {
          component.setProps({ current: newValue(5) })
        })

        component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} />)

        act(() => {
          component.find('PaginationItem').at(1).find('a').simulate('click')
          component.update()
        })
      })

      it('should set current', () => {
        expect(setCurrent).toBeCalledTimes(1)
        expect(component.prop('current')).toBe(4)
      })

      it('should render items', () => {
        const items = component.find('PaginationItem')
        expect(items).toHaveLength(11)
        expect(items.at(0).prop('disabled')).toBeFalsy()
        expect(items.at(1).prop('disabled')).toBeFalsy()
        expect(items.at(2).prop('selected')).toBeFalsy()
        expect(items.at(3).prop('disabled')).toBeTruthy()
        expect(items.at(4).prop('selected')).toBeFalsy()
        expect(items.at(5).prop('selected')).toBeTruthy()
        expect(items.at(6).prop('selected')).toBeFalsy()
        expect(items.at(7).prop('disabled')).toBeTruthy()
        expect(items.at(8).prop('selected')).toBeFalsy()
        expect(items.at(9).prop('disabled')).toBeFalsy()
        expect(items.at(10).prop('disabled')).toBeFalsy()
      })
    })

    describe('Specific', () => {
      beforeAll(() => {
        clearMocks()
        setCurrent.mockImplementation((newValue) => {
          component.setProps({ current: newValue })
        })

        component = mount(<Pagination total={10} current={3} setCurrent={setCurrent} />)

        act(() => {
          component.find('PaginationItem').at(3).find('a').simulate('click')
          component.update()
        })
      })

      it('should set current', () => {
        expect(setCurrent).toBeCalledTimes(1)
        expect(component.prop('current')).toBe(2)
      })

      it('should render items', () => {
        const items = component.find('PaginationItem')
        expect(items).toHaveLength(9)
        expect(items.at(0).prop('disabled')).toBeFalsy()
        expect(items.at(1).prop('disabled')).toBeFalsy()
        expect(items.at(2).prop('selected')).toBeFalsy()
        expect(items.at(3).prop('selected')).toBeTruthy()
        expect(items.at(4).prop('selected')).toBeFalsy()
        expect(items.at(5).prop('disabled')).toBeTruthy()
        expect(items.at(6).prop('selected')).toBeFalsy()
        expect(items.at(7).prop('disabled')).toBeFalsy()
        expect(items.at(8).prop('disabled')).toBeFalsy()
      })
    })

    describe('Next', () => {
      beforeAll(() => {
        clearMocks()
        setCurrent.mockImplementation((newValue) => {
          component.setProps({ current: newValue(5) })
        })

        component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} />)

        act(() => {
          component.find('PaginationItem').at(9).find('a').simulate('click')
          component.update()
        })
      })

      it('should set current', () => {
        expect(setCurrent).toBeCalledTimes(1)
        expect(component.prop('current')).toBe(6)
      })

      it('should render items', () => {
        const items = component.find('PaginationItem')
        expect(items).toHaveLength(11)
        expect(items.at(0).prop('disabled')).toBeFalsy()
        expect(items.at(1).prop('disabled')).toBeFalsy()
        expect(items.at(2).prop('selected')).toBeFalsy()
        expect(items.at(3).prop('disabled')).toBeTruthy()
        expect(items.at(4).prop('selected')).toBeFalsy()
        expect(items.at(5).prop('selected')).toBeTruthy()
        expect(items.at(6).prop('selected')).toBeFalsy()
        expect(items.at(7).prop('disabled')).toBeTruthy()
        expect(items.at(8).prop('selected')).toBeFalsy()
        expect(items.at(9).prop('disabled')).toBeFalsy()
        expect(items.at(10).prop('disabled')).toBeFalsy()
      })
    })

    describe('Last', () => {
      beforeAll(() => {
        clearMocks()
        setCurrent.mockImplementation((newValue) => {
          component.setProps({ current: newValue })
        })

        component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} />)

        act(() => {
          component.find('PaginationItem').at(8).find('a').simulate('click')
          component.update()
        })
      })

      it('should set current', () => {
        expect(setCurrent).toBeCalledTimes(1)
        expect(component.prop('current')).toBe(10)
      })

      it('should render items', () => {
        const items = component.find('PaginationItem')
        expect(items).toHaveLength(8)
        expect(items.at(0).prop('disabled')).toBeFalsy()
        expect(items.at(1).prop('disabled')).toBeFalsy()
        expect(items.at(2).prop('selected')).toBeFalsy()
        expect(items.at(3).prop('disabled')).toBeTruthy()
        expect(items.at(4).prop('selected')).toBeFalsy()
        expect(items.at(5).prop('selected')).toBeTruthy()
        expect(items.at(6).prop('disabled')).toBeTruthy()
        expect(items.at(7).prop('disabled')).toBeTruthy()
      })
    })
  })
})
