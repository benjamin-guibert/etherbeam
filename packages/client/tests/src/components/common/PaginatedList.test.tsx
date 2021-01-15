import * as React from 'react'
import { render } from 'enzyme'
import PaginatedList from 'components/common/PaginatedList'

describe('<PaginatedList />', () => {
  let component: unknown

  beforeAll(() => {
    component = render(
      <PaginatedList setPage={null} pagination={{ currentPage: 1, itemsPerPage: 10, totalItems: 100, totalPages: 10 }}>
        Content
      </PaginatedList>
    )
  })

  it('should match snapshot', () => expect(component).toMatchSnapshot())
})
