import React, { FC } from 'react'
import { Token } from '../../libraries/ethereum/types'
import TableRow from '../TableRow'
import AddressItem from './AddressItem'
import TokenPriceHistory from './TokenPriceHistory'
import TokenAmount from './TokenAmount'

interface TokenRowProps {
  token: Token
  goToTokenPage: (hash: string) => void
}

const TokenRow: FC<TokenRowProps> = ({ token, goToTokenPage }) => {
  const { hash, name, price, priceHistory } = token

  return (
    <TableRow action={() => goToTokenPage(hash)} clickable>
      <td>{name}</td>
      <td>
        <TokenAmount amount={price} noBadge noSymbol />
        {!!priceHistory?.length && (
          <TokenPriceHistory size="s" className="my-tokenrow-pricehistory" priceHistory={priceHistory} />
        )}
      </td>
      <td className="my-d-min-xs my-text-center">
        <AddressItem address={token} short noFlag />
      </td>
    </TableRow>
  )
}

export default TokenRow
