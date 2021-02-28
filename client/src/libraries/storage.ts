import Cookies, { CookieSetOptions } from 'universal-cookie'
import { AuthToken } from '@cryptotentanz/api-client'

const cookies = new Cookies()

export const removeAuthToken = (): void => {
  const options: CookieSetOptions = {
    path: '/',
  }
  cookies.remove('tokenType', options)
  cookies.remove('client', options)
  cookies.remove('uid', options)
  cookies.remove('accessToken', options)
  cookies.remove('expiry', options)
}

export const saveAuthToken = (authToken: AuthToken | null): void => {
  if (!authToken) return removeAuthToken()

  const { client, uid, accessToken, tokenType, expiry } = authToken
  const options: CookieSetOptions = {
    path: '/',
    expires: new Date(parseInt(expiry) * 1000),
    // TODO: Add the secure option when HTTPS
    // secure: true,
    sameSite: 'strict',
  }

  cookies.set('tokenType', tokenType, options)
  cookies.set('client', client, options)
  cookies.set('uid', uid, options)
  cookies.set('accessToken', accessToken, options)
  cookies.set('expiry', expiry, options)
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
