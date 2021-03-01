import { createContext, useEffect, useRef, useState } from 'react'
import { isAuthentified } from '@cryptotentanz/api-client'
import {
  initializeServerData,
  ServerData,
  signIn as signInUser,
  signOut as signOutUser,
  subscribeToUserUpdates,
  unsubscribeFromUserUpdates,
  validateToken,
} from '../libraries/server'
import { User } from '../libraries/types'

const serverData = initializeServerData()

export interface SessionContextData {
  serverData: ServerData
  currentUser: User | null | undefined
  initialize: () => void
  signIn: (email: string, password: string) => void
  signOut: () => void
}

export const useSessionContextValue = (): SessionContextData => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)
  const serverDataRef = useRef<ServerData>(serverData)

  const initialize = () => {
    if (isAuthentified(serverDataRef.current.apiClient)) {
      validateToken(serverDataRef.current)
    } else {
      setCurrentUser(null)
    }
  }
  const signIn = (email: string, password: string) => signInUser(serverDataRef.current, email, password)

  const signOut = () => signOutUser(serverDataRef.current)

  useEffect(() => {
    const serverData = serverDataRef.current

    subscribeToUserUpdates(serverData, setCurrentUser)

    return () => unsubscribeFromUserUpdates(serverData, setCurrentUser)
  }, [])

  return { serverData: serverDataRef.current, currentUser, initialize, signIn, signOut }
}

export const SessionContext = createContext<SessionContextData>({
  serverData: (undefined as unknown) as ServerData,
  currentUser: undefined,
  initialize: () => undefined,
  signIn: () => undefined,
  signOut: () => undefined,
})
