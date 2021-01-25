import React, { ReactElement } from 'react'
import './Loader.scss'

type LoaderTypeProp = 'spinner' | 'dots'

interface LoaderProps {
  type: LoaderTypeProp
}

const Loader = ({ type }: LoaderProps): ReactElement => {
  return (
    <div className="my-loader">
      <div className={`my-loader-${type}`}></div>
    </div>
  )
}

export default Loader
