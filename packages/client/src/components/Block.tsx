import React, { FC, ReactNode } from 'react'
import './Block.scss'

interface BlockProps {
  className?: string
  children?: ReactNode
}

const Block: FC<BlockProps> = ({ className, children }) => {
  return <div className={['my-block', className].join(' ')}>{children}</div>
}

export default Block
