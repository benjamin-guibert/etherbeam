import React, { FC } from 'react'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import Link from '../components/Link'
import Title from '../components/Title'
import List from '../components/List'
import ListItem from '../components/ListItem'
import './Header.scss'
import HeaderSession from './HeaderSession'

const Header: FC = () => {
  return (
    <header className="my-header">
      <nav>
        <List horizontal>
          <ListItem>
            <Link className="my-header-title" href="/" color="light" noUnderline>
              <Title labelBreakpoint="s" />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="/tokens"
              color="light"
              label="Tokens"
              icon={faCoins}
              description="Tokens"
              noUnderline
              labelBreakpoint="s"
            />
          </ListItem>
        </List>
      </nav>
      <HeaderSession />
    </header>
  )
}

export default Header
