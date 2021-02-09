import React, { FC } from 'react'
import { Token } from '../../libraries/ethereum/types'
import Loader from '../Loader'
import Table from '../Table'
import TableRow from '../TableRow'
import TokenRow from './TokenRow'

const LoaderRow: FC = () => {
  return (
    <TableRow>
      <td>
        <Loader type="dots" />
      </td>
      <td>
        <Loader type="dots" />
      </td>
      <td className="my-d-min-xs">
        <Loader type="dots" />
      </td>
    </TableRow>
  )
}

interface TokenListProps {
  tokens: Token[]
  goToTokenPage: (hash: string) => void
  loading?: boolean
}

const TokenList: FC<TokenListProps> = ({ tokens, goToTokenPage, loading }) => {
  return (
    <Table>
      <thead>
        <TableRow>
          <th>Name</th>
          <th>Price (Ether)</th>
          <th className="my-d-min-xs">Address</th>
        </TableRow>
      </thead>
      <tbody>
        {loading && !tokens?.length && <LoaderRow />}
        {!!tokens?.length &&
          tokens.map((token) => <TokenRow token={token} goToTokenPage={goToTokenPage} key={token.hash} />)}
      </tbody>
    </Table>
  )
}

export default TokenList
