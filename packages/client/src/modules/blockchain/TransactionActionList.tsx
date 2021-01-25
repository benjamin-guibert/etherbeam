import React, { ReactElement, useState } from 'react'
import PaginatedList from 'components/PaginatedList'
import { TransactionAction } from 'libraries/ethereum/types'
import { Pagination } from 'libraries/api'
import TransactionActionItem from 'modules/blockchain/TransactionActionItem'

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
      <h3>Actions</h3>
      <PaginatedList pagination={pagination} setPage={setPage}>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Time</th>
              <th className="my-d-min-xs">Holder</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentPageActions.map((action, index) => (
              <TransactionActionItem key={index} action={action} />
            ))}
          </tbody>
        </table>
      </PaginatedList>
    </>
  )
}

export default TransactionActionsList
