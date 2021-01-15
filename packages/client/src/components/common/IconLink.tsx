import React, { ReactElement, ReactNode } from 'react'
import Button from 'react-bootstrap/Button'

interface IconLinkProps {
  url: string
  title?: string
  className?: string
  children: ReactNode
}

const IconLink = ({ url, title, className, children }: IconLinkProps): ReactElement => {
  return (
    <Button
      className={['shadow-none', className].join(' ')}
      variant="link"
      title={title}
      href={url}
      onClick={(event) => event.stopPropagation()}
      target="_blank"
    >
      {children}
    </Button>
  )
}

export default IconLink
