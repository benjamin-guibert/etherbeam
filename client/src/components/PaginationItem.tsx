import React, { FC } from 'react'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faEllipsisH,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import ListItem from './ListItem'
import Button from './Button'

type PageProp = 'first' | 'previous' | 'ellipsis' | 'next' | 'last' | number

interface PaginationItemProps {
  page: PageProp
  action?: () => void
  selected?: boolean
  disabled?: boolean
}

const PaginationItem: FC<PaginationItemProps> = ({ page, action, selected, disabled }: PaginationItemProps) => {
  const getProps = (): { description: string | null; icon: IconDefinition | null } => {
    switch (page) {
      case 'first':
        return { description: 'First page', icon: faAngleDoubleLeft }
      case 'previous':
        return { description: 'Previous page', icon: faAngleLeft }
      case 'ellipsis':
        return { description: null, icon: faEllipsisH }
      case 'next':
        return { description: 'Next page', icon: faAngleRight }
      case 'last':
        return { description: 'Last page', icon: faAngleDoubleRight }
      default:
        return {
          description: `Page ${page}`,
          icon: null,
        }
    }
  }

  const { description, icon } = getProps()

  return (
    <ListItem>
      <Button
        link
        color="secondary"
        description={description}
        action={action}
        label={typeof page === 'number' ? page.toString() : null}
        icon={typeof page !== 'number' ? icon : null}
        disabled={disabled}
        active={selected}
      />
    </ListItem>
  )
}

export default PaginationItem
