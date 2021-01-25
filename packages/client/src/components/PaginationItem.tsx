import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faEllipsisH,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import Link from './Link'

type PageProp = 'first' | 'previous' | 'ellipsis' | 'next' | 'last' | number

interface PaginationItemProps {
  page: PageProp
  onClick?: () => void
  selected?: boolean
  disabled?: boolean
}

const PaginationItem = ({ page, onClick, selected, disabled }: PaginationItemProps): ReactElement => {
  const getProps = (): { title: string; icon: IconDefinition } => {
    switch (page) {
      case 'first':
        return { title: 'First page', icon: faAngleDoubleLeft }
      case 'previous':
        return { title: 'Previous page', icon: faAngleLeft }
      case 'ellipsis':
        return { title: null, icon: faEllipsisH }
      case 'next':
        return { title: 'Next page', icon: faAngleRight }
      case 'last':
        return { title: 'Last page', icon: faAngleDoubleRight }
      default:
        return {
          title: `Page ${page}`,
          icon: null,
        }
    }
  }

  const { title, icon } = getProps()

  return (
    <li>
      <Link title={title} onClick={onClick} disabled={disabled} active={selected}>
        {typeof page === 'number' ? page : <FontAwesomeIcon icon={icon} />}
      </Link>
    </li>
  )
}

export default PaginationItem
