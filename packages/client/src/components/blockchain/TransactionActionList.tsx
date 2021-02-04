import React, { FC, useState } from 'react'
import { Pagination } from '../../libraries/api'
import { TransactionAction } from '../../libraries/ethereum/types'
import Table from '../Table'
import PaginatedList from '../PaginatedList'
import TransactionActionRow from 'components/blockchain/TransactionActionRow'

const ACTIONS_PER_PAGE = 20

interface TransactionActionsListProps {
  actions: TransactionAction[]
}

const TransactionActionsList: FC<TransactionActionsListProps> = ({ actions }) => {
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
        <Table>
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
              <TransactionActionRow key={index} action={action} />
            ))}
          </tbody>
        </Table>
      </PaginatedList>
    </>
  )
}

export default TransactionActionsList
