import React, { ReactElement } from 'react'
import PaginationItem from './PaginationItem'
import './Pagination.scss'

interface PaginationProps {
  total: number
  current: number
  setCurrent: (next: number | ((previous: number) => number)) => void
  className?: string
}

const ELLIPSIS_THRESHOLD_PAGES = 7

const Pagination = ({ total, current, setCurrent, className }: PaginationProps): ReactElement => {
  const displayEllipsis = total > ELLIPSIS_THRESHOLD_PAGES
  const pages = []
  Array.from({ length: total }).map((_, index) => {
    const page = index + 1
    const isCurrent = page === current
    if (!displayEllipsis || [1, current - 1, current, current + 1, total].includes(page)) {
      pages.push(() => (
        <PaginationItem page={page} onClick={() => setCurrent(page)} selected={isCurrent} disabled={isCurrent} />
      ))
    } else if (page == current - 2 || page == current + 2) {
      pages.push(() => <PaginationItem page="ellipsis" disabled />)
    }
  })

  return (
    <nav>
      <ul className={['my-pagination my-hlist', className].join(' ')}>
        <PaginationItem page="first" onClick={() => setCurrent(1)} disabled={current === 1} />
        <PaginationItem
          page="previous"
          onClick={() => setCurrent((previous) => previous - 1)}
          disabled={current === 1}
        />
        {pages.map((Page, index) => (
          <Page key={index} />
        ))}
        <PaginationItem
          page="next"
          onClick={() => setCurrent((previous) => previous + 1)}
          disabled={current === total}
        />
        <PaginationItem page="last" onClick={() => setCurrent(total)} disabled={current === total} />
      </ul>
    </nav>
  )
}

export default Pagination
