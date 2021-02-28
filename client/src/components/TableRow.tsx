import React, { FC, ReactNode } from 'react'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'

interface TableRowProps {
  color?: ColorProp
  clickable?: boolean
  action?: () => void
  active?: boolean
  disabled?: boolean
  className?: string
  children?: ReactNode
}

const TableRow: FC<TableRowProps> = ({
  color = 'dark',
  clickable,
  action,
  active,
  disabled,
  className,
  children,
}: TableRowProps) => {
  const onKeyUp = (event: React.KeyboardEvent<HTMLTableRowElement>): void => {
    if (event.key == 'Enter') runAction()
  }

  const runAction = (): void => {
    if (!disabled) action?.()
  }

  const getClassName = (): string => {
    const classNames = [`my-${color}-bg`]
    if (clickable) classNames.push('my-clickable')
    if (disabled) classNames.push('my-disabled-fg')
    if (active) classNames.push('my-active')
    if (className) classNames.push(className)

    return classNames.join(' ')
  }

  return (
    <tr
      onClick={runAction}
      onKeyUp={onKeyUp}
      className={getClassName()}
      tabIndex={clickable && !disabled ? 0 : undefined}
    >
      {children}
    </tr>
  )
}

export default TableRow
