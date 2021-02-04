import React, { FC } from 'react'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import Link from '../components/Link'
import Icon from '../components/Icon'
import Title from '../components/Title'
import List from '../components/List'
import ListItem from '../components/ListItem'
import './Header.scss'

const Header: FC = () => {
  return (
    <header className="my-header">
      <nav>
        <List horizontal>
          <ListItem>
            <Link className="my-header-title" href="/" color="light" noUnderline>
              <Title />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/tokens" color="light" description="Tokens" noUnderline>
              <Icon icon={faCoins} label="Tokens" labelBreakpoint="s" />
            </Link>
          </ListItem>
        </List>
      </nav>
    </header>
  )
}

export default Header
