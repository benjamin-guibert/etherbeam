import React, { ReactElement } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Icon from 'components/common/Icon'
import EthereumImage from 'images/ethereum.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'

const NavigationBar = (): ReactElement => {
  return (
    <Navbar className="mb-4" bg="light">
      <Navbar.Brand id="navbar-home" href="/">
        <Icon src={EthereumImage} size="lg" />
        Etherbeam
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav.Link id="navbar-nav-tokens" href="/tokens">
          <FontAwesomeIcon icon={faDotCircle} size="lg" className="mr-1" />
          Tokens
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
