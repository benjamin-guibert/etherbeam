import React, { ReactElement, ReactNode } from 'react'
import { Pagination as PaginationType } from 'libraries/api'
import Pagination from './Pagination'

interface PaginatedListProps {
  pagination: PaginationType
  setPage: (next: number | ((previous: number) => number)) => void
  children?: ReactNode
}

const PaginatedList = ({ pagination, setPage, children }: PaginatedListProps): ReactElement => {
  const { totalPages, currentPage } = pagination || {}

  const PaginationComponent = (): ReactElement => (
    <>{totalPages > 1 && <Pagination total={totalPages} current={currentPage} setCurrent={setPage} />}</>
  )

  return (
    <>
      <PaginationComponent />
      {children}
      <PaginationComponent />
    </>
  )
}

export default PaginatedList
