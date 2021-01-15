import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import Address from 'components/common/Address'
import EtherscanLink from 'components/common/EtherscanLink'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Token, TransactionAction, TransactionActionDirection, TransactionActionType } from 'libraries/ethereum/types'
import {
  faArrowAltCircleRight,
  faCheckCircle,
  faMinusCircle,
  faPlusCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'
import TokenAmount from 'components/common/TokenAmount'

interface TransactionActionRowProps {
  action: TransactionAction
}

const getActionData = (
  type: TransactionActionType,
  direction: TransactionActionDirection
): { label: string; icon: IconDefinition; variant: string } => {
  switch (type) {
    case TransactionActionType.Approval:
      return { label: 'Approval', icon: faCheckCircle, variant: '' }
    case TransactionActionType.Transfer:
      return { label: 'Transfer', icon: faArrowAltCircleRight, variant: '' }
    case TransactionActionType.Swap:
      return direction == TransactionActionDirection.Buy
        ? { label: 'Buy', icon: faPlusCircle, variant: 'text-success' }
        : { label: 'Sell', icon: faMinusCircle, variant: 'text-danger' }
    default:
      return { label: 'Unknown', icon: faQuestionCircle, variant: 'text-warning' }
  }
}

const ApprovalAction = (): ReactElement => {
  return <span>Approved</span>
}

const TransferAction = ({ action }: { action: TransactionAction }): ReactElement => {
  const { fromAmount, fromAddress, toAddress } = action
  return (
    <span>
      <TokenAmount amount={fromAmount} token={fromAddress as Token} />
      to
      <Address address={toAddress} size="m" short />
    </span>
  )
}

const BuyAction = ({ action }: { action: TransactionAction }): ReactElement => {
  const { fromAmount, toAmount, toAddress } = action
  return (
    <span>
      <TokenAmount amount={toAmount} token={toAddress as Token} />
      {fromAmount?.isZero() == false && (
        <>
          for
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
      <TokenAmount amount={fromAmount} token={fromAddress as Token} />
      {toAmount?.isZero() == false && (
        <>
          for
          <TokenAmount amount={toAmount} amountPrintOptions={{ decimals: 5 }} />
        </>
      )}
    </span>
  )
}

const Action = ({ action }: { action: TransactionAction }): ReactElement => {
  const { type, direction } = action
  switch (type) {
    case TransactionActionType.Approval:
      return <ApprovalAction />
    case TransactionActionType.Transfer:
      return <TransferAction action={action} />
    case TransactionActionType.Swap:
      return direction == TransactionActionDirection.Buy ? (
        <BuyAction action={action} />
      ) : (
        <SellAction action={action} />
      )
    default:
      return <></>
  }
}

const TransactionActionRow = ({ action }: TransactionActionRowProps): ReactElement => {
  const { transaction, holder, type, direction } = action
  const { address, dateTime } = transaction
  const { label, icon, variant } = getActionData(type, direction)
  return (
    <tr>
      <td className="text-center">
        <OverlayTrigger placement="top" overlay={<Tooltip id={`type-${address.hash}`}>{label}</Tooltip>}>
          <FontAwesomeIcon icon={icon} size="lg" className={variant} />
        </OverlayTrigger>
      </td>
      <td>
        <Action action={action} />
      </td>
      <td className="text-center text-monospace">{moment(dateTime).format('HH:mm:ss')}</td>
      <td className="d-none d-sm-table-cell text-center">
        <Address address={holder} short size="m" />
      </td>
      <td className="text-center">
        <EtherscanLink className="my-auto py-0" url={address.url} white />
      </td>
    </tr>
  )
}

export default TransactionActionRow
