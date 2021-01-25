import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import PaginatedList from './PaginatedList'

describe('<PaginatedList />', () => {
  const setPage = jest.fn()

  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = mount(
        <PaginatedList
          setPage={setPage}
          pagination={{ currentPage: 1, itemsPerPage: 10, totalItems: 100, totalPages: 10 }}
        >
          Content.
        </PaginatedList>
      )
    })

    it('should render', () => {
      const paginations = component.find('Pagination')
      expect(paginations).toHaveLength(2)

      const pagination = paginations.at(0)
      expect(pagination.prop('total')).toBe(10)
      expect(pagination.prop('current')).toBe(1)
      expect(pagination.prop('setCurrent')).toBe(setPage)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Single page', () => {
    beforeAll(() => {
      component = mount(
        <PaginatedList
          setPage={setPage}
          pagination={{ currentPage: 1, itemsPerPage: 10, totalItems: 10, totalPages: 1 }}
        >
          Content.
        </PaginatedList>
      )
    })

    it('should render', () => {
      const paginations = component.find('Pagination')
      expect(paginations).toHaveLength(0)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })
})
