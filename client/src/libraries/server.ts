import compact from 'lodash/compact'
import {
  HttpStatus,
  AuthToken,
  RestAction,
  callApi,
  ApiClient,
  createApiClient,
  setAuthToken,
  subscribeToNewTokens,
  flushAuthToken,
} from '@cryptotentanz/api-client'
import { Token, USDC_HASH, User, WETH_HASH } from './types'
import { TokenData, UserData } from './serverTypes'
import { parseTokenData, parseUserData } from './serverParsers'
import { loadAuthToken, removeAuthToken, saveAuthToken } from './storage'

const TIMEOUT = 60 * 1000

type UserUpdateCallback = (user: User | null) => void

export interface ServerData {
  apiClient: ApiClient
  userSubscriptions: UserUpdateCallback[]
}

const onNewAuthToken = (token: AuthToken): void => {
  saveAuthToken(token)
}

const initializeAuthToken = (apiClient: ApiClient): void => {
  const token = loadAuthToken()

  if (token) setAuthToken(apiClient, token)
}

export const initializeServerData = (): ServerData => {
  const apiClient = createApiClient(process.env.SERVER_API_HOST as string, true, TIMEOUT)
  initializeAuthToken(apiClient)
  subscribeToNewTokens(apiClient, onNewAuthToken)

  const onUserUpdateCallback = (user: User | null): void => {
    flushAuthToken(apiClient)

    if (!user) removeAuthToken()
  }

  return {
    apiClient,
    userSubscriptions: [onUserUpdateCallback],
  }
}

export const subscribeToUserUpdates = ({ userSubscriptions }: ServerData, callback: UserUpdateCallback): void => {
  userSubscriptions.push(callback)
}

export const unsubscribeFromUserUpdates = ({ userSubscriptions }: ServerData, callback: UserUpdateCallback): void => {
  const index = userSubscriptions.indexOf(callback)

  if (index < 0) return

  userSubscriptions.splice(index, 1)
}

const onUserUpdate = ({ userSubscriptions }: ServerData, user: User | null): void => {
  userSubscriptions.forEach((callback) => callback(user))
}

export const signIn = async (serverData: ServerData, email: string, password: string): Promise<User | null> => {
  const payload = { email, password }

  const { data, status } = await callApi<UserData>(
    serverData.apiClient,
    RestAction.Post,
    'auth/sign_in',
    [HttpStatus.Ok],
    null,
    payload,
    true
  )

  const user = status != HttpStatus.Unauthorized ? parseUserData(data) : null
  onUserUpdate(serverData, user)

  return user
}

export const validateToken = async (serverData: ServerData): Promise<User | null> => {
  const { data, status } = await callApi<UserData>(
    serverData.apiClient,
    RestAction.Get,
    'auth/validate_token',
    [HttpStatus.Ok],
    null,
    null,
    true
  )

  const user = status != HttpStatus.Unauthorized ? parseUserData(data) : null
  onUserUpdate(serverData, user)

  return user
}

export const signOut = async (data: ServerData): Promise<void> => {
  const { apiClient } = data
  await callApi(apiClient, RestAction.Delete, 'auth/sign_out', [HttpStatus.Ok, HttpStatus.NotFound], null, null, true)

  onUserUpdate(data, null)
}

export const fetchTokens = async (serverData: ServerData): Promise<Token[]> => {
  const { data } = await callApi<TokenData[]>(serverData.apiClient, RestAction.Get, 'contract_tokens')

  const ignoredHashes = [WETH_HASH, USDC_HASH]

  return compact(data.map((token) => (!ignoredHashes.includes(token.address_hash) ? parseTokenData(token) : null)))
}

export const fetchToken = async (
  serverData: ServerData,
  address: string,
  withList?: 'actions'
): Promise<Token | null> => {
  const { status, data } = await callApi<TokenData>(
    serverData.apiClient,
    RestAction.Get,
    `contract_tokens/${address}?list=${withList || ''}`,
    [HttpStatus.Ok, HttpStatus.NotFound]
  )

  if (status != HttpStatus.Ok) return null

  return parseTokenData(data)
}
