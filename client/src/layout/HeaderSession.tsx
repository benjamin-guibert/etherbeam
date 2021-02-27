import React, { FC, useContext } from 'react'
import { getUserTypeIcon } from '../components/helpers'
import Icon from '../components/Icon'
import Button from '../components/Button'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { SessionContext } from './SessionContext'
import './HeaderSession.scss'

const HeaderSession: FC = () => {
  const { currentUser, signIn, signOut } = useContext(SessionContext)
  const { name, type } = currentUser || {}

  return (
    <section className="my-headersession">
      {currentUser && (
        <>
          <Icon
            className="my-headersession-name"
            icon={getUserTypeIcon(type)}
            iconSize="l"
            label={name}
            labelBreakpoint="s"
          />
          <Button
            className="my-headersession-signout"
            action={signOut}
            icon={faSignOutAlt}
            link
            description="Sign out"
            color="negative"
          />
        </>
      )}
      {currentUser == null && (
        <Button
          action={() => signIn('user@etherbeam.com', 'password')}
          icon={faSignInAlt}
          link
          description="Sign in"
          color="positive"
          size="l"
          label="Sign in"
          labelBreakpoint="s"
        />
      )}
    </section>
  )
}

export default HeaderSession
