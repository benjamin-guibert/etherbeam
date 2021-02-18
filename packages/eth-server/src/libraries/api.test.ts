import { AxiosResponse } from 'axios'
import { AuthToken, getAuthHeaders, getAuthTokenFromResponse } from './api'

describe('Get auth token from response', () => {
  const response = {
    headers: {
      client: 'client',
      uid: 'uid@email.com',
      'access-token': 'abcdef0123456789',
      'token-type': 'Bearer',
      expiry: '1234567890',
    },
  } as AxiosResponse
  let result: AuthToken

  beforeAll(() => {
    result = getAuthTokenFromResponse(response)
  })

  it('should return', () =>
    expect(result).toMatchObject({
      client: response.headers['client'],
      uid: response.headers['uid'],
      accessToken: response.headers['access-token'],
      tokenType: response.headers['token-type'],
      expiry: response.headers['expiry'],
    }))
})

describe('Get auth headers', () => {
  const authToken = {
    client: 'client',
    uid: 'uid@email.com',
    accessToken: 'abcdef0123456789',
    tokenType: 'Bearer',
    expiry: '1234567890',
  }
  let result: { [key: string]: string }

  beforeAll(() => {
    result = getAuthHeaders(authToken)
  })

  it('should return', () =>
    expect(result).toMatchObject({
      client: 'client',
      uid: 'uid@email.com',
      'access-token': 'abcdef0123456789',
      'token-type': 'Bearer',
      expiry: '1234567890',
    }))
})
