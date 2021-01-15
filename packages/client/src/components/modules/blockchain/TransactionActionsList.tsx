import React, { ReactElement, useState } from 'react'
import PaginatedList from 'components/common/PaginatedList'
import Table from 'react-bootstrap/Table'
import { TransactionAction } from 'libraries/ethereum/types'
import TransactionActionRow from './TransactionActionRow'
import { Pagination } from 'libraries/api'

const ACTIONS_PER_PAGE = 20

interface TransactionActionsListProps {
  actions: TransactionAction[]
}

const TransactionActionsList = ({ actions }: TransactionActionsListProps): ReactElement => {
  const [page, setPage] = useState<number>(1)
  const pagination: Pagination = {
    currentPage: page,
    itemsPerPage: ACTIONS_PER_PAGE,
    totalItems: actions.length,
    totalPages: Math.ceil(actions.length / ACTIONS_PER_PAGE),
  }
  const { currentPage, itemsPerPage } = pagination
  const currentPageActions = actions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <>
      <h2>Actions</h2>
      <PaginatedList pagination={pagination} setPage={setPage}>
        <Table striped variant="dark" className="shadow-lg" size="sm">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Action</th>
              <th>Time</th>
              <th className="d-none d-sm-table-cell">Holder</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentPageActions.map((action, index) => (
              <TransactionActionRow key={index} action={action} />
            ))}
          </tbody>
        </Table>
      </PaginatedList>
    </>
  )
}

export default TransactionActionsList
