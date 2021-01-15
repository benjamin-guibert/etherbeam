import React, { ReactElement, ReactNode } from 'react'
import Container from 'react-bootstrap/Container'

interface PageProps {
  title: string
  children: ReactNode
}

const Page = ({ title, children }: PageProps): ReactElement => {
  return (
    <Container>
      <h1>{title}</h1>
      {children}
    </Container>
  )
}

export default Page
