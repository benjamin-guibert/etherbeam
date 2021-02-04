import React, { FC } from 'react'
import './Title.scss'

const Title: FC = () => {
  return (
    <span className="my-title">
      <img className="my-title-img" src="/images/ethereum.png" />
      <span className="my-title-label">Etherbeam</span>
    </span>
  )
}

export default Title
