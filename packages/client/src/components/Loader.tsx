import React, { FC } from 'react'
import './Loader.scss'

type LoaderTypeProp = 'spinner' | 'dots'

interface LoaderProps {
  type: LoaderTypeProp
}

const Loader: FC<LoaderProps> = ({ type }) => {
  return (
    <div className="my-loader">
      <div className={`my-loader-${type}`}></div>
    </div>
  )
}

export default Loader
