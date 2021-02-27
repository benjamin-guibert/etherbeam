import React, { FC, ReactElement } from 'react'
import { Token, TransactionAction, TransactionActionDirection, TransactionActionType } from '../../libraries/types'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowAltCircleRight,
  faCheckCircle,
  faMinusCircle,
  faPlusCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'
import TableRow from '../TableRow'
import Icon from '../Icon'
import Time from '../Time'
import TokenAmount from './TokenAmount'
import Address from './AddressItem'
import EtherscanLink from './EtherscanLink'
import './TransactionActionRow.scss'

interface ActionProps {
  action: TransactionAction
}

const UnknownAction: FC = () => {
  return <span>Unknown action</span>
}

const ApprovalAction: FC = () => {
  return <span>Approved</span>
}

const TransferAction: FC<ActionProps> = ({ action }) => {
  const { fromAmount, fromAddress, toAddress } = action

  return (
    <span>
      <TokenAmount amount={fromAmount} token={fromAddress as Token} />
      <span> to </span>
      <Address address={toAddress} short />
    </span>
  )
}

const BuyAction: FC<ActionProps> = ({ action }) => {
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

const SellAction: FC<ActionProps> = ({ action }) => {
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

interface TransactionActionRowProps {
  action: TransactionAction
}

const TransactionActionRow: FC<TransactionActionRowProps> = ({ action }) => {
  const {
    type,
    direction,
    transaction: {
      address: { url },
      dateTime,
    },
    holder,
  } = action

  const getProps = (): { color: string; icon: IconProp; Action: ReactElement } => {
    switch (type) {
      case TransactionActionType.Approval:
        return {
          color: 'dark',
          icon: faCheckCircle,
          Action: <ApprovalAction />,
        }
      case TransactionActionType.Transfer:
        return {
          color: 'dark',
          icon: faArrowAltCircleRight,
          Action: <TransferAction action={action} />,
        }
      case TransactionActionType.Swap:
        if (direction == TransactionActionDirection.Buy) {
          return {
            color: 'positive',
            icon: faPlusCircle,
            Action: <BuyAction action={action} />,
          }
        } else {
          return {
            color: 'negative',
            icon: faMinusCircle,
            Action: <SellAction action={action} />,
          }
        }
      default: {
        return {
          color: 'dark',
          icon: faQuestionCircle,
          Action: <UnknownAction />,
        }
      }
    }
  }

  const { color, icon, Action } = getProps()

  return (
    <TableRow className={`my-transactionactionrow my-${color}-bg`}>
      <td>
        <div className="my-transactionactionrow-action">
          <Icon className="my-transactionactionrow-icon my-alt" icon={icon} size="xl" />
          <span>{Action}</span>
        </div>
      </td>
      <td className="my-text-center">
        <Time dateTime={dateTime} />
      </td>
      <td className="my-d-min-xs my-text-center">
        <Address address={holder} short color="light" />
      </td>
      <td className="my-text-center">
        <EtherscanLink url={url} size="l" />
      </td>
    </TableRow>
  )
}

export default TransactionActionRow
