import React, { FC, ReactNode } from 'react'
import './ListItem.scss'

interface ListItemProps {
  className?: string
  children?: ReactNode
}

const ListItem: FC<ListItemProps> = ({ className, children }: ListItemProps) => {
  return <li className={['my-listitem', className].join(' ')}>{children}</li>
}

export default ListItem
