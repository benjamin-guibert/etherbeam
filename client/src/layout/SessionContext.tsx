import { createContext, useCallback, useEffect, useState } from 'react'
import {
  initializeAuthToken,
  ServerData,
  validateToken,
  signIn as signInUser,
  signOut as signOutUser,
  unsubscribeAuth,
  subscribeAuth,
} from '../libraries/server'
import { User } from 'libraries/types'
import { loadAuthToken, removeAuthToken } from 'libraries/storage'

export interface SessionContextData {
  serverData: ServerData
  currentUser: User
  initialize: () => void
  signIn: (email: string, password: string) => void
  signOut: () => void
}

export const useSessionContextValue = (serverData: ServerData): SessionContextData => {
  const [currentUser, setCurrentUser] = useState<User>(undefined)

  const initialize = useCallback((): void => {
    const tokenAuth = loadAuthToken()

    if (!tokenAuth) return setCurrentUser(null)

    initializeAuthToken(serverData, tokenAuth)
    validateToken(serverData).then((user) => {
      setCurrentUser(user)
      if (!user) removeAuthToken()
    })
  }, [serverData])

  const signIn = useCallback(
    (email: string, password: string): void => {
      signInUser(email, password, serverData).then(setCurrentUser)
    },
    [serverData]
  )

  const signOut = useCallback((): void => {
    signOutUser(serverData).then(() => setCurrentUser(null))
  }, [serverData])

  useEffect(() => {
    subscribeAuth(serverData, setCurrentUser)

    return () => unsubscribeAuth(serverData, setCurrentUser)
  }, [serverData])

  return { serverData, currentUser, initialize, signIn, signOut }
}

export const SessionContext = createContext<SessionContextData>({
  serverData: undefined,
  currentUser: undefined,
  initialize: () => undefined,
  signIn: () => undefined,
  signOut: () => undefined,
})
