import React, { ReactElement } from 'react'
import Spinner from 'react-bootstrap/Spinner'

interface LoaderProps {
  size?: 'sm'
  className?: string
}

const Loader = ({ size, className }: LoaderProps): ReactElement => {
  return (
    <div className={['text-center', className].join(' ')}>
      <Spinner className="text-center m-1" variant="secondary" animation="border" role="status" size={size}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
