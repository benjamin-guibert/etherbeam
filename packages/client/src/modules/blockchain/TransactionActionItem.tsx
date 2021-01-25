import React, { ReactElement } from 'react'
import { Token, TransactionAction, TransactionActionDirection, TransactionActionType } from 'libraries/ethereum/types'
import './TransactionActionItem.scss'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowAltCircleRight,
  faCheckCircle,
  faMinusCircle,
  faPlusCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'
import Icon from 'components/Icon'
import TokenAmount from 'components/blockchain/TokenAmount'
import Address from 'components/blockchain/Address'
import Time from 'components/Time'
import EtherscanLink from 'components/blockchain/EtherscanLink'

interface TransactionActionItemProps {
  action: TransactionAction
}

const UnknownAction = (): ReactElement => {
  return <span>Unknown action</span>
}

const ApprovalAction = (): ReactElement => {
  return <span>Approved</span>
}

const TransferAction = ({ action }: { action: TransactionAction }): ReactElement => {
  const { fromAmount, fromAddress, toAddress } = action

  return (
    <span>
      <TokenAmount amount={fromAmount} token={fromAddress as Token} />
      <span> to </span>
      <Address address={toAddress} short />
    </span>
  )
}

const BuyAction = ({ action }: { action: TransactionAction }): ReactElement => {
  const { fromAmount, toAmount, toAddress } = action

  return (
    <span>
      <TokenAmount amount={toAmount} token={toAddress as Token} amountPrintOptions={{ decimals: 0 }} />
      {fromAmount?.isZero() == false && (
        <>
          <span> for </span>
          <TokenAmount amount={fromAmount} amountPrintOptions={{ decimals: 5 }} />
        </>
      )}
    </span>
  )
}

const SellAction = ({ action }: { action: TransactionAction }): ReactElement => {
  const { fromAmount, fromAddress, toAmount } = action
  return (
    <span>
      <TokenAmount amount={fromAmount} token={fromAddress as Token} amountPrintOptions={{ decimals: 0 }} />
      {toAmount?.isZero() == false && (
        <>
          <span> for </span>
          <TokenAmount amount={toAmount} amountPrintOptions={{ decimals: 5 }} />
        </>
      )}
    </span>
  )
}

const TransactionActionRow = ({ action }: TransactionActionItemProps): ReactElement => {
  const {
    type,
    direction,
    transaction: {
      address: { url },
      dateTime,
    },
    holder,
  } = action

  const getProps = (): { rowClassName: string; icon: IconProp; Action: ReactElement } => {
    switch (type) {
      case TransactionActionType.Approval:
        return {
          rowClassName: 'my-transactionactionitem my-transactionactionitem-approval',
          icon: faCheckCircle,
          Action: <ApprovalAction />,
        }
      case TransactionActionType.Transfer:
        return {
          rowClassName: 'my-transactionactionitem my-transactionactionitem-transfer',
          icon: faArrowAltCircleRight,
          Action: <TransferAction action={action} />,
        }
      case TransactionActionType.Swap:
        if (direction == TransactionActionDirection.Buy) {
          return {
            rowClassName: 'my-transactionactionitem my-transactionactionitem-buy',
            icon: faPlusCircle,
            Action: <BuyAction action={action} />,
          }
        } else {
          return {
            rowClassName: 'my-transactionactionitem my-transactionactionitem-sell',
            icon: faMinusCircle,
            Action: <SellAction action={action} />,
          }
        }
      default: {
        return {
          rowClassName: 'my-transactionactionitem my-transactionactionitem-unknown',
          icon: faQuestionCircle,
          Action: <UnknownAction />,
        }
      }
    }
  }

  const { rowClassName, icon, Action } = getProps()

  return (
    <tr className={rowClassName}>
      <td className="my-transactionactionitem-td">
        <div className="my-transactionactionitem-action">
          <Icon className="my-transactionactionitem-icon" icon={icon} />
          {Action}
        </div>
      </td>
      <td className="my-text-center">
        <Time dateTime={dateTime} />
      </td>
      <td className="my-d-min-xs my-text-center">
        <Address address={holder} short />
      </td>
      <td className="my-text-center">
        <EtherscanLink url={url} />
      </td>
    </tr>
  )
}

export default TransactionActionRow
