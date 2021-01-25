import React, { ReactElement } from 'react'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import Link from 'components/Link'
import Icon from 'components/Icon'
import './Header.scss'

const Header = (): ReactElement => {
  return (
    <header className="my-header">
      <nav>
        <ul className="my-hlist">
          <li className="my-header-title">
            <Link href="/">
              <img src="/images/ethereum.png" />
              <span>Etherbeam</span>
            </Link>
          </li>
          <li>
            <Link href="/tokens" title="Tokens">
              <Icon icon={faCoins} label="Tokens" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
