import React, { FC, ReactNode } from 'react'
import './Table.scss'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'

interface TableProps {
  color?: ColorProp
  children?: ReactNode
}

const Table: FC<TableProps> = ({ color = 'dark', children }: TableProps) => {
  return <table className={`my-table my-${color}-bg`}>{children}</table>
}

export default Table
