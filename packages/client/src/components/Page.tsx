import React, { ReactElement, ReactNode } from 'react'
import Loader from './Loader'
import './Page.scss'

type WidthLimitProp = 'xs' | 's' | 'm' | 'l'

interface PageProps {
  title: string | ReactNode
  widthLimit?: WidthLimitProp
  titleLoading?: boolean
  children?: ReactNode
}

const Page = ({ title, children, widthLimit = 's', titleLoading }: PageProps): ReactElement => {
  return (
    <main className={`my-page ${widthLimit ? `my-mw-${widthLimit}` : ''}`}>
      <h1 className="my-page-header">
        {titleLoading ? (
          <div className="my-page-titleloader">
            <Loader type="dots" />
          </div>
        ) : (
          title
        )}
      </h1>
      {children}
    </main>
  )
}

export default Page
