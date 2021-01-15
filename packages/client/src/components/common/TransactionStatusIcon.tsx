import React, { ReactElement } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TransactionStatus } from 'libraries/ethereum/types'
import { faClock, IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import startCase from 'lodash/startCase'

interface TransactionStatusIconProps {
  id: string
  status: TransactionStatus
  className?: string
}

const TransactionStatusIcon = ({ id, status, className }: TransactionStatusIconProps): ReactElement => {
  const useProps = (): { variant: string; icon: IconDefinition } => {
    switch (status) {
      case TransactionStatus.Mined:
        return { variant: 'text-muted', icon: faCube }
      case TransactionStatus.Validated:
        return { variant: 'text-success', icon: faCheckCircle }
      case TransactionStatus.Cancelled:
        return { variant: 'text-danger', icon: faTimesCircle }
      default:
        return { variant: 'text-muted', icon: faClock }
    }
  }

  const { icon, variant } = useProps()

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id={`tx-status-${id}`}>{startCase(status)}</Tooltip>}>
      <FontAwesomeIcon icon={icon} size="lg" className={[variant, className].join(' ')} />
    </OverlayTrigger>
  )
}

export default TransactionStatusIcon
