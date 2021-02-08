import React, { FC, ReactNode } from 'react'
import './List.scss'

interface ListProps {
  horizontal?: boolean
  center?: boolean
  className?: string
  children?: ReactNode
}

const List: FC<ListProps> = ({ horizontal, center, className, children }) => {
  const ulClassName = [horizontal ? 'my-list-h' : 'my-list-v', center ? 'my-list-center' : '', className].join(' ')

  return <ul className={ulClassName}>{children}</ul>
}

export default List
