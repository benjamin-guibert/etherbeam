import Cookies from 'universal-cookie'
import { AuthToken } from '@cryptotentanz/api-client'

const cookies = new Cookies()

export const removeAuthToken = (): void => {
  cookies.remove('tokenType')
  cookies.remove('client')
  cookies.remove('uid')
  cookies.remove('accessToken')
  cookies.remove('expiry')
}

export const saveAuthToken = (authToken: AuthToken | null): void => {
  if (!authToken) return removeAuthToken()

  const { client, uid, accessToken, tokenType, expiry } = authToken
  const cookieOptions = {
    expires: new Date(parseInt(expiry) * 1000),
    // TODO: Add the secure option when HTTPS
    // secure: true,
    sameSite: true,
  }

  cookies.set('tokenType', tokenType, cookieOptions)
  cookies.set('client', client, cookieOptions)
  cookies.set('uid', uid, cookieOptions)
  cookies.set('accessToken', accessToken, cookieOptions)
  cookies.set('expiry', expiry, cookieOptions)
}

export const loadAuthToken = (): AuthToken | null => {
  const authToken = {
    tokenType: cookies.get('tokenType'),
    client: cookies.get('client'),
    uid: cookies.get('uid'),
    accessToken: cookies.get('accessToken'),
    expiry: cookies.get('expiry'),
  }

  return !Object.values(authToken).filter((v) => !v).length ? authToken : null
}
