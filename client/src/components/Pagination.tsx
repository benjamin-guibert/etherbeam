import React, { FC } from 'react'
import PaginationItem from './PaginationItem'
import List from './List'

interface PaginationProps {
  total: number
  current: number
  setCurrent: (next: number | ((previous: number) => number)) => void
  className?: string
}

const ELLIPSIS_THRESHOLD_PAGES = 7

const Pagination: FC<PaginationProps> = ({ total, current, setCurrent, className }: PaginationProps) => {
  const displayEllipsis = total > ELLIPSIS_THRESHOLD_PAGES
  const pages: FC[] = []

  Array.from({ length: total }).map((_, index) => {
    const page = index + 1
    const isCurrent = page === current
    if (!displayEllipsis || [1, current - 1, current, current + 1, total].includes(page)) {
      pages.push(() => (
        <PaginationItem page={page} action={() => setCurrent(page)} selected={isCurrent} disabled={isCurrent} />
      ))
    } else if (page == current - 2 || page == current + 2) {
      pages.push(() => <PaginationItem page="ellipsis" disabled />)
    }
  })

  return (
    <nav>
      <List horizontal center className={className}>
        <PaginationItem page="first" action={() => setCurrent(1)} disabled={current === 1} />
        <PaginationItem
          page="previous"
          action={() => setCurrent((previous) => previous - 1)}
          disabled={current === 1}
        />
        {pages.map((Page, index) => (
          <Page key={index} />
        ))}
        <PaginationItem
          page="next"
          action={() => setCurrent((previous) => previous + 1)}
          disabled={current === total}
        />
        <PaginationItem page="last" action={() => setCurrent(total)} disabled={current === total} />
      </List>
    </nav>
  )
}

export default Pagination
