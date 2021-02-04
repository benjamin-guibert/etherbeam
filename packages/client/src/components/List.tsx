import React, { FC, ReactNode } from 'react'
import './List.scss'

interface ListProps {
  horizontal?: boolean
  className?: string
  children?: ReactNode
}

const List: FC<ListProps> = ({ horizontal, className, children }) => {
  const ulClassName = [horizontal ? 'my-list-h' : 'my-list-v', className].join(' ')

  return <ul className={ulClassName}>{children}</ul>
}

export default List
