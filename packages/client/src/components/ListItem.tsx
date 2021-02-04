import React, { FC, ReactNode } from 'react'
import './ListItem.scss'

interface ListItemProps {
  children?: ReactNode
}

const ListItem: FC<ListItemProps> = ({ children }) => {
  return <li className="my-listitem">{children}</li>
}

export default ListItem
