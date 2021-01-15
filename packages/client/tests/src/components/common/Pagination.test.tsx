import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Pagination from 'components/common/Pagination'
import { act } from 'react-dom/test-utils'

describe('<Pagination />', () => {
  const setCurrent = jest.fn()

  let component: ReactWrapper

  describe('All', () => {
    beforeAll(() => {
      component = mount(<Pagination total={6} current={5} setCurrent={setCurrent} size="sm" className="app-class" />)
    })

    it('should render', () => {
      const pages = component.find('PageItem')
      expect(pages).toHaveLength(10)
      expect(pages.at(0).prop('disabled')).toBeFalsy()
      expect(pages.at(1).prop('disabled')).toBeFalsy()
      expect(pages.at(2).prop('active')).toBeFalsy()
      expect(pages.at(3).prop('active')).toBeFalsy()
      expect(pages.at(4).prop('active')).toBeFalsy()
      expect(pages.at(5).prop('active')).toBeFalsy()
      expect(pages.at(6).prop('active')).toBeTruthy()
      expect(pages.at(7).prop('active')).toBeFalsy()
      expect(pages.at(8).prop('disabled')).toBeFalsy()
      expect(pages.at(9).prop('disabled')).toBeFalsy()
    })
  })

  describe('Ellipsed', () => {
    beforeAll(() => {
      component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} size="sm" className="app-class" />)
    })

    it('should render pagination', () => {
      const pagination = component.find('Pagination')
      expect(pagination.prop('size')).toBe('sm')
      expect(pagination.prop('className')).toBe('app-class')
    })

    it('should render pages', () => {
      const pages = component.find('PageItem')
      expect(pages).toHaveLength(11)
      expect(pages.at(0).prop('disabled')).toBeFalsy()
      expect(pages.at(1).prop('disabled')).toBeFalsy()
      expect(pages.at(2).prop('active')).toBeFalsy()
      expect(pages.at(3).prop('disabled')).toBeTruthy()
      expect(pages.at(4).prop('active')).toBeFalsy()
      expect(pages.at(5).prop('active')).toBeTruthy()
      expect(pages.at(6).prop('active')).toBeFalsy()
      expect(pages.at(7).prop('disabled')).toBeTruthy()
      expect(pages.at(8).prop('active')).toBeFalsy()
      expect(pages.at(9).prop('disabled')).toBeFalsy()
      expect(pages.at(10).prop('disabled')).toBeFalsy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('First page', () => {
    beforeAll(() => {
      jest.resetAllMocks()

      component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} />)
      setCurrent.mockImplementation((newValue) => {
        component.setProps({ current: newValue })
      })

      act(() => {
        component.find('PageItem').at(0).find('a').simulate('click')
        component.update()
      })
    })

    it('should set current', () => {
      expect(setCurrent).toBeCalledTimes(1)
      expect(component.prop('current')).toBe(1)
    })

    it('should render pages', () => {
      const pages = component.find('PageItem')
      expect(pages).toHaveLength(8)
      expect(pages.at(0).prop('disabled')).toBeTruthy()
      expect(pages.at(1).prop('disabled')).toBeTruthy()
      expect(pages.at(2).prop('active')).toBeTruthy()
      expect(pages.at(3).prop('active')).toBeFalsy()
      expect(pages.at(4).prop('disabled')).toBeTruthy()
      expect(pages.at(5).prop('active')).toBeFalsy()
      expect(pages.at(6).prop('disabled')).toBeFalsy()
      expect(pages.at(7).prop('disabled')).toBeFalsy()
    })
  })

  describe('Previous page', () => {
    beforeAll(() => {
      jest.resetAllMocks()

      component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} />)
      setCurrent.mockImplementation((newValue) => {
        component.setProps({ current: newValue(5) })
      })

      act(() => {
        component.find('PageItem').at(1).find('a').simulate('click')
        component.update()
      })
    })

    it('should set current', () => {
      expect(setCurrent).toBeCalledTimes(1)
      expect(component.prop('current')).toBe(4)
    })

    it('should render pages', () => {
      const pages = component.find('PageItem')
      expect(pages).toHaveLength(11)
      expect(pages.at(0).prop('disabled')).toBeFalsy()
      expect(pages.at(1).prop('disabled')).toBeFalsy()
      expect(pages.at(2).prop('active')).toBeFalsy()
      expect(pages.at(3).prop('disabled')).toBeTruthy()
      expect(pages.at(4).prop('active')).toBeFalsy()
      expect(pages.at(5).prop('active')).toBeTruthy()
      expect(pages.at(6).prop('active')).toBeFalsy()
      expect(pages.at(7).prop('disabled')).toBeTruthy()
      expect(pages.at(8).prop('active')).toBeFalsy()
      expect(pages.at(9).prop('disabled')).toBeFalsy()
      expect(pages.at(10).prop('disabled')).toBeFalsy()
    })
  })

  describe('Specific page', () => {
    beforeAll(() => {
      jest.resetAllMocks()

      component = mount(<Pagination total={10} current={3} setCurrent={setCurrent} />)
      setCurrent.mockImplementation((newValue) => {
        component.setProps({ current: newValue })
      })

      act(() => {
        component.find('PageItem').at(3).find('a').simulate('click')
        component.update()
      })
    })

    it('should set current', () => {
      expect(setCurrent).toBeCalledTimes(1)
      expect(component.prop('current')).toBe(2)
    })

    it('should render pages', () => {
      const pages = component.find('PageItem')
      expect(pages).toHaveLength(9)
      expect(pages.at(0).prop('disabled')).toBeFalsy()
      expect(pages.at(1).prop('disabled')).toBeFalsy()
      expect(pages.at(2).prop('active')).toBeFalsy()
      expect(pages.at(3).prop('active')).toBeTruthy()
      expect(pages.at(4).prop('active')).toBeFalsy()
      expect(pages.at(5).prop('disabled')).toBeTruthy()
      expect(pages.at(6).prop('active')).toBeFalsy()
      expect(pages.at(7).prop('disabled')).toBeFalsy()
      expect(pages.at(8).prop('disabled')).toBeFalsy()
    })
  })

  describe('Next page', () => {
    beforeAll(() => {
      jest.resetAllMocks()

      component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} />)
      setCurrent.mockImplementation((newValue) => {
        component.setProps({ current: newValue(5) })
      })

      act(() => {
        component.find('PageItem').at(9).find('a').simulate('click')
        component.update()
      })
    })

    it('should set current', () => {
      expect(setCurrent).toBeCalledTimes(1)
      expect(component.prop('current')).toBe(6)
    })

    it('should render pages', () => {
      const pages = component.find('PageItem')
      expect(pages).toHaveLength(11)
      expect(pages.at(0).prop('disabled')).toBeFalsy()
      expect(pages.at(1).prop('disabled')).toBeFalsy()
      expect(pages.at(2).prop('active')).toBeFalsy()
      expect(pages.at(3).prop('disabled')).toBeTruthy()
      expect(pages.at(4).prop('active')).toBeFalsy()
      expect(pages.at(5).prop('active')).toBeTruthy()
      expect(pages.at(6).prop('active')).toBeFalsy()
      expect(pages.at(7).prop('disabled')).toBeTruthy()
      expect(pages.at(8).prop('active')).toBeFalsy()
      expect(pages.at(9).prop('disabled')).toBeFalsy()
      expect(pages.at(10).prop('disabled')).toBeFalsy()
    })
  })

  describe('Last page', () => {
    beforeAll(() => {
      jest.resetAllMocks()

      component = mount(<Pagination total={10} current={5} setCurrent={setCurrent} />)
      setCurrent.mockImplementation((newValue) => {
        component.setProps({ current: newValue })
      })

      act(() => {
        component.find('PageItem').at(8).find('a').simulate('click')
        component.update()
      })
    })

    it('should set current', () => {
      expect(setCurrent).toBeCalledTimes(1)
      expect(component.prop('current')).toBe(10)
    })

    it('should render pages', () => {
      const pages = component.find('PageItem')
      expect(pages).toHaveLength(8)
      expect(pages.at(0).prop('disabled')).toBeFalsy()
      expect(pages.at(1).prop('disabled')).toBeFalsy()
      expect(pages.at(2).prop('active')).toBeFalsy()
      expect(pages.at(3).prop('disabled')).toBeTruthy()
      expect(pages.at(4).prop('active')).toBeFalsy()
      expect(pages.at(5).prop('active')).toBeTruthy()
      expect(pages.at(6).prop('disabled')).toBeTruthy()
      expect(pages.at(7).prop('disabled')).toBeTruthy()
    })
  })
})
