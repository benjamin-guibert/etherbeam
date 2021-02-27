import React, { FC } from 'react'
import './Title.scss'

type LabelBreakpointProp = 'xs' | 's' | 'm' | 'l'

interface TitleProps {
  labelBreakpoint?: LabelBreakpointProp
}

const Title: FC<TitleProps> = ({ labelBreakpoint }) => {
  const labelClassName = ['my-title-label', labelBreakpoint ? `my-d-min-${labelBreakpoint}` : ''].join(' ')

  return (
    <span className="my-title">
      <img className="my-title-img" src="/images/ethereum.png" />
      <span className={labelClassName}>Etherbeam</span>
    </span>
  )
}

export default Title
