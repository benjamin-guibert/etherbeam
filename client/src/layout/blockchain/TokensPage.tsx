import React, { FC } from 'react'
import { Token } from '../../libraries/types'
import TokenList from '../../components/blockchain/TokenList'

interface TokensPageProps {
  tokens: Token[]
  goToTokenPage: (hash: string) => void
  loading?: boolean
}

const TokensPage: FC<TokensPageProps> = ({ tokens, goToTokenPage, loading }) => {
  return (
    <>
      <h1>Tokens</h1>
      <TokenList tokens={tokens} goToTokenPage={goToTokenPage} loading={loading} />
    </>
  )
}

export default TokensPage
