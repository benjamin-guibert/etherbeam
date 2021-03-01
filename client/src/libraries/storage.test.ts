import { mocked } from 'ts-jest/utils'
import { clearMocks } from '../../tests/helpers'
import Cookies from 'universal-cookie'
import { AuthToken } from '@cryptotentanz/api-client'

const getMock = jest.fn()
const setMock = jest.fn()
const removeMock = jest.fn()

jest.mock('universal-cookie')
mocked(Cookies).mockReturnValue(({
  get: getMock,
  set: setMock,
  remove: removeMock,
} as unknown) as Cookies)

import { loadAuthToken, removeAuthToken, saveAuthToken } from './storage'

const createAuthToken = (token = 'abcdef1234567890'): AuthToken => {
  return {
    tokenType: 'Bearer',
    client: 'client',
    uid: 'user@email.com',
    accessToken: token,
    expiry: '10000000000',
  }
}

describe('Remove auth token', () => {
  beforeAll(() => {
    clearMocks()

    removeAuthToken()
  })

  it('should remove cookies', () => {
    expect(removeMock).toBeCalledTimes(5)
    expect(removeMock.mock.calls[0][0]).toEqual('tokenType')
    expect(removeMock.mock.calls[1][0]).toEqual('client')
    expect(removeMock.mock.calls[2][0]).toEqual('uid')
    expect(removeMock.mock.calls[3][0]).toEqual('accessToken')
    expect(removeMock.mock.calls[4][0]).toEqual('expiry')
  })
})

describe('Save auth token', () => {
  describe('Token', () => {
    const authToken = createAuthToken()

    beforeAll(() => {
      clearMocks()

      saveAuthToken(authToken)
    })

    it('should set cookies', () => {
      expect(setMock).toBeCalledTimes(5)
      expect(setMock.mock.calls[0][0]).toEqual('tokenType')
      expect(setMock.mock.calls[0][1]).toBe(authToken.tokenType)
      expect(setMock.mock.calls[1][0]).toEqual('client')
      expect(setMock.mock.calls[1][1]).toBe(authToken.client)
      expect(setMock.mock.calls[2][0]).toEqual('uid')
      expect(setMock.mock.calls[2][1]).toBe(authToken.uid)
      expect(setMock.mock.calls[3][0]).toEqual('accessToken')
      expect(setMock.mock.calls[3][1]).toBe(authToken.accessToken)
      expect(setMock.mock.calls[4][0]).toEqual('expiry')
      expect(setMock.mock.calls[4][1]).toBe(authToken.expiry)
    })
  })

  describe('No token', () => {
    beforeAll(() => {
      clearMocks()

      saveAuthToken(null)
    })

    it('should remove cookies', () => expect(removeMock).toBeCalledTimes(5))

    it('should not set cookies', () => expect(setMock).toBeCalledTimes(0))
  })
})

describe('Load auth token', () => {
  let result: AuthToken | null

  describe('Token', () => {
    beforeAll(() => {
      clearMocks()
      getMock.mockImplementation((key) => `v_${key}`)

      result = loadAuthToken()
    })

    it('should return', () =>
      expect(result).toMatchObject({
        tokenType: 'v_tokenType',
        client: 'v_client',
        uid: 'v_uid',
        accessToken: 'v_accessToken',
        expiry: 'v_expiry',
      }))

    it('should get cookies', () => {
      expect(getMock).toBeCalledTimes(5)
      expect(getMock.mock.calls[0][0]).toEqual('tokenType')
      expect(getMock.mock.calls[1][0]).toEqual('client')
      expect(getMock.mock.calls[2][0]).toEqual('uid')
      expect(getMock.mock.calls[3][0]).toEqual('accessToken')
      expect(getMock.mock.calls[4][0]).toEqual('expiry')
    })
  })
  describe('No token', () => {
    beforeAll(() => {
      clearMocks()
      getMock.mockReturnValue(undefined)

      result = loadAuthToken()
    })

    it('should return', () => expect(result).toBeNull())

    it('should get cookies', () => {
      expect(getMock).toBeCalledTimes(5)
      expect(getMock.mock.calls[0][0]).toEqual('tokenType')
      expect(getMock.mock.calls[1][0]).toEqual('client')
      expect(getMock.mock.calls[2][0]).toEqual('uid')
      expect(getMock.mock.calls[3][0]).toEqual('accessToken')
      expect(getMock.mock.calls[4][0]).toEqual('expiry')
    })
  })
})
