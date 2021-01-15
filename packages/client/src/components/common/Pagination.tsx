import React, { ReactElement } from 'react'
import BsPagination from 'react-bootstrap/Pagination'

interface PaginationProps {
  total: number
  current: number
  setCurrent: (next: number | ((previous: number) => number)) => void
  size?: 'sm' | 'lg'
  className?: string
}

const ELLIPSIS_THRESHOLD_PAGES = 7

const Pagination = ({ total, current, setCurrent, className, size }: PaginationProps): ReactElement => {
  const displayEllipsis = total > ELLIPSIS_THRESHOLD_PAGES
  const pages = []
  Array.from({ length: total }).map((_, index) => {
    const page = index + 1
    if (!displayEllipsis || [1, current - 1, current, current + 1, total].includes(page)) {
      pages.push(() => (
        <BsPagination.Item key={page} active={page === current} onClick={() => setCurrent(page)}>
          {page}
        </BsPagination.Item>
      ))
    } else if (page == current - 2 || page == current + 2) {
      pages.push(() => <BsPagination.Ellipsis disabled />)
    }
  })

  return (
    <BsPagination className={className} size={size}>
      <BsPagination.First disabled={current === 1} onClick={() => setCurrent(1)} />
      <BsPagination.Prev disabled={current === 1} onClick={() => setCurrent((previous) => previous - 1)} />
      {pages.map((Page, index) => (
        <Page key={index} />
      ))}
      <BsPagination.Next disabled={current === total} onClick={() => setCurrent((previous) => previous + 1)} />
      <BsPagination.Last disabled={current === total} onClick={() => setCurrent(total)} />
    </BsPagination>
  )
}

export default Pagination
