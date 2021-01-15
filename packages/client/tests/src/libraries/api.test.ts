import { getPagination, getLimits } from 'libraries/api'

describe('Get pagination', () => {
  it('gets the pagination from headers', () => {
    const response = {
      headers: {
        'total-count': '100',
        'page-items': '20',
        'current-page': '3',
        'total-pages': '5',
      },
      data: null,
      status: 200,
      statusText: 'OK',
      config: null,
    }

    const { totalItems, itemsPerPage, currentPage, totalPages } = getPagination(response)

    expect(totalItems).toBe(100)
    expect(itemsPerPage).toBe(20)
    expect(currentPage).toBe(3)
    expect(totalPages).toBe(5)
  })
})

describe('Get limits', () => {
  it('gets the limits from headers', () => {
    const response = {
      headers: {
        'first-item': '1',
        'last-item': '1000',
      },
      data: null,
      status: 200,
      statusText: 'OK',
      config: null,
    }

    const { first, last } = getLimits(response)

    expect(first).toBe(1)
    expect(last).toBe(1000)
  })
})
