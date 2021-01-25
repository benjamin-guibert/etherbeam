import React, { ReactElement, ReactNode } from 'react'
import './ClickableTableRow.scss'

interface ClickableTableRowProps {
  onClick: () => void
  children?: ReactNode
}

const ClickableTableRow = ({ onClick, children }: ClickableTableRowProps): ReactElement => {
  const onKeyUp = (event: React.KeyboardEvent<HTMLTableRowElement>): void => {
    if (event.key == 'Enter') onClick()
  }

  return (
    <tr onClick={onClick} onKeyUp={onKeyUp} className="my-clickabletablerow" tabIndex={0}>
      {children}
    </tr>
  )
}

export default ClickableTableRow
