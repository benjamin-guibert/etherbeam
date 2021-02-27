import { mocked } from 'ts-jest/utils'
import { clearMocks } from '../tests/helpers'
import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios'
import { ApiClient, AuthToken, AuthTokenLifecycle, HttpStatus, RestAction } from './types'

const response = { status: HttpStatus.Ok, data: true }
const requestInterceptorMock = jest.fn()
const responseInterceptorMock = jest.fn()
const getMock = jest.fn().mockResolvedValue(response)
const postMock = jest.fn().mockResolvedValue(response)
const putMock = jest.fn().mockResolvedValue(response)
const patchMock = jest.fn().mockResolvedValue(response)
const deleteMock = jest.fn().mockResolvedValue(response)
const headMock = jest.fn().mockResolvedValue(response)
const optionsMock = jest.fn().mockResolvedValue(response)
const axiosInstance = ({
  defaults: { headers: {} },
  interceptors: {
    request: {
      use: requestInterceptorMock,
    },
    response: {
      use: responseInterceptorMock,
    },
  },
  get: getMock,
  post: postMock,
  put: putMock,
  patch: patchMock,
  delete: deleteMock,
  head: headMock,
  options: optionsMock,
} as unknown) as AxiosInstance
// TODO: `axios.create` always return `undefined` despite the mock being overriden.
jest.mock('axios')
mocked(axios).mockReturnValue(({ create: jest.fn().mockReturnValue(axiosInstance) } as unknown) as AxiosPromise)

import {
  getPagination,
  getLimits,
  flushAuthToken,
  callApi,
  subscribeToNewTokens,
  unsubscribeFromNewTokens,
  setAuthToken,
} from './api'

const createAuthToken = (token = 'abcdef1234567890'): AuthToken => {
  return {
    tokenType: 'Bearer',
    client: 'client',
    uid: 'user@email.com',
    accessToken: token,
    expiry: '10000000000',
  }
}

const createApiClientMock = (authTokenLifecycle?: AuthTokenLifecycle): ApiClient => {
  return {
    axiosInstance: axiosInstance,
    authTokenLifecycle,
  }
}

// describe('Create API client', () => {
//   let result: ApiClient

//   describe('Without token auth', () => {
//     beforeAll(() => {
//       jest.resetAllMocks()

//       result = createApiClient('http://url')
//     })

//     it('should return', () =>
//       expect(result).toMatchObject({
//         axiosInstance,
//       }))

//     it('should not add interceptors', () => {
//       expect(requestInterceptorMock).toBeCalledTimes(0)
//       expect(responseInterceptorMock).toBeCalledTimes(0)
//     })
//   })

//   describe('With token auth', () => {
//     beforeAll(() => {
//       jest.resetAllMocks()

//       result = createApiClient('http://url', true)
//     })

//     it('should return', () => {
//       expect(result).toMatchObject({
//         axiosInstance,
//         authTokenLifecycle: {},
//       })
//     })

//     it('should add interceptors', () => {
//       expect(requestInterceptorMock).toBeCalledTimes(1)
//       expect(responseInterceptorMock).toBeCalledTimes(2)
//     })
//   })
// })

describe('Set auth token', () => {
  const authToken = createAuthToken('abcdef12345678903')
  const tokenAuthLifecycle: AuthTokenLifecycle = {
    currentToken: createAuthToken('abcdef12345678900'),
    nextToken: createAuthToken('abcdef12345678901'),
    newTokenSubscriptions: [jest.fn()],
  }
  const apiClient = createApiClientMock(tokenAuthLifecycle)

  beforeAll(() => {
    setAuthToken(apiClient, authToken)
  })

  it('should set token', () =>
    expect(apiClient.authTokenLifecycle).toMatchObject({
      currentToken: authToken,
      newTokenSubscriptions: [],
    }))
})

describe('Subscribe to new tokens', () => {
  const callback = jest.fn()
  const tokenAuthLifecycle: AuthTokenLifecycle = {
    newTokenSubscriptions: [],
  }
  const apiClient = createApiClientMock(tokenAuthLifecycle)

  beforeAll(() => {
    subscribeToNewTokens(apiClient, callback)
  })

  it('should subscribe', () => {
    expect(apiClient.authTokenLifecycle?.newTokenSubscriptions).toEqual([callback])
  })
})

describe('Unsubscribe from new tokens', () => {
  const callback = jest.fn()
  const tokenAuthLifecycle: AuthTokenLifecycle = {
    newTokenSubscriptions: [callback],
  }
  const apiClient = createApiClientMock(tokenAuthLifecycle)

  beforeAll(() => {
    unsubscribeFromNewTokens(apiClient, callback)
  })

  it('should unsubscribe', () => {
    expect(apiClient.authTokenLifecycle?.newTokenSubscriptions).toEqual([])
  })
})

describe('flush auth token', () => {
  describe('Token auth', () => {
    const tokenAuthLifecycle: AuthTokenLifecycle = {
      lastCall: Date.now(),
      currentToken: createAuthToken(),
      nextToken: createAuthToken(),
      newTokenSubscriptions: [],
    }
    const apiClient = createApiClientMock(tokenAuthLifecycle)

    beforeAll(() => {
      flushAuthToken(apiClient)
    })

    it('should remove tokens', () =>
      expect(apiClient.authTokenLifecycle).toEqual({
        newTokenSubscriptions: [],
      }))
  })

  describe('No token auth', () => {
    const apiClient = createApiClientMock()

    beforeAll(() => {
      flushAuthToken(apiClient)
    })

    it('should do nothing', () => expect(apiClient.authTokenLifecycle).toBeUndefined())
  })
})

describe('Call API', () => {
  const token1 = createAuthToken('abcdef0000000001')
  const token2 = createAuthToken('abcdef0000000002')
  const url = 'path'
  const payload = 'payload'

  let result: AxiosResponse<boolean>

  describe('Get', () => {
    beforeAll(async () => {
      clearMocks()
      const apiClient = createApiClientMock()

      result = await callApi<boolean>(apiClient, RestAction.Get, url)
    })

    it('should return', () => expect(result).toEqual(response))

    it('should call API', () => {
      expect(getMock).toBeCalledTimes(1)
      expect(getMock.mock.calls[0][0]).toEqual(url)
    })
  })

  describe('Post', () => {
    beforeAll(async () => {
      clearMocks()
      const apiClient = createApiClientMock()

      result = await callApi<boolean>(apiClient, RestAction.Post, url, [HttpStatus.Ok], null, payload)
    })

    it('should return', () => expect(result).toEqual(response))

    it('should call API', () => {
      expect(postMock).toBeCalledTimes(1)
      expect(postMock.mock.calls[0][0]).toEqual(url)
      expect(postMock.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('Put', () => {
    beforeAll(async () => {
      clearMocks()
      const apiClient = createApiClientMock()

      result = await callApi<boolean>(apiClient, RestAction.Put, url, [HttpStatus.Ok], null, payload)
    })

    it('should return', () => expect(result).toEqual(response))

    it('should call API', () => {
      expect(putMock).toBeCalledTimes(1)
      expect(putMock.mock.calls[0][0]).toEqual(url)
      expect(putMock.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('Patch', () => {
    beforeAll(async () => {
      clearMocks()
      const apiClient = createApiClientMock()

      result = await callApi<boolean>(apiClient, RestAction.Patch, url, [HttpStatus.Ok], null, payload)
    })

    it('should return', () => expect(result).toEqual(response))

    it('should call API', () => {
      expect(patchMock).toBeCalledTimes(1)
      expect(patchMock.mock.calls[0][0]).toEqual(url)
      expect(patchMock.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('Delete', () => {
    beforeAll(async () => {
      clearMocks()
      const apiClient = createApiClientMock()

      result = await callApi<boolean>(apiClient, RestAction.Delete, url)
    })

    it('should return', () => expect(result).toEqual(response))

    it('should call API', () => {
      expect(deleteMock).toBeCalledTimes(1)
      expect(deleteMock.mock.calls[0][0]).toEqual(url)
    })
  })

  describe('Head', () => {
    beforeAll(async () => {
      clearMocks()
      const apiClient = createApiClientMock()

      result = await callApi<boolean>(apiClient, RestAction.Head, url)
    })

    it('should return', () => expect(result).toEqual(response))

    it('should call API', () => {
      expect(headMock).toBeCalledTimes(1)
      expect(headMock.mock.calls[0][0]).toEqual(url)
    })
  })

  describe('Options', () => {
    beforeAll(async () => {
      clearMocks()
      const apiClient = createApiClientMock()

      result = await callApi<boolean>(apiClient, RestAction.Options, url)
    })

    it('should return', () => expect(result).toEqual(response))

    it('should call API', () => {
      expect(optionsMock).toBeCalledTimes(1)
      expect(optionsMock.mock.calls[0][0]).toEqual(url)
    })
  })

  describe('Unauthorized', () => {
    const response = { status: HttpStatus.Unauthorized }

    describe('Retry', () => {
      beforeAll(async () => {
        clearMocks()
        const authTokenLifecycle = {
          currentToken: token1,
          nextToken: token2,
          newTokenSubscriptions: [],
        }
        const apiClient = createApiClientMock(authTokenLifecycle)
        getMock.mockResolvedValue(response)

        result = await callApi<boolean>(apiClient, RestAction.Get, url)
      })

      it('should call API', () => {
        expect(getMock).toBeCalledTimes(2)
      })
    })

    describe('No next token', () => {
      beforeAll(async () => {
        clearMocks()
        const authTokenLifecycle = {
          currentToken: token1,
          newTokenSubscriptions: [],
        }
        const apiClient = createApiClientMock(authTokenLifecycle)
        getMock.mockResolvedValue(response)

        result = await callApi<boolean>(apiClient, RestAction.Get, url)
      })

      it('should call API', () => {
        expect(getMock).toBeCalledTimes(1)
      })
    })

    describe('No token auth', () => {
      beforeAll(async () => {
        clearMocks()
        const apiClient = createApiClientMock()
        getMock.mockResolvedValue(response)

        result = await callApi<boolean>(apiClient, RestAction.Get, url)
      })

      it('should call API', () => {
        expect(getMock).toBeCalledTimes(1)
      })
    })

    describe('No retry', () => {
      beforeAll(async () => {
        clearMocks()
        const authTokenLifecycle = {
          currentToken: token1,
          nextToken: token2,
          newTokenSubscriptions: [],
        }
        const apiClient = createApiClientMock(authTokenLifecycle)
        getMock.mockResolvedValue(response)

        result = await callApi<boolean>(apiClient, RestAction.Get, url, [HttpStatus.Ok], null, null, true)
      })

      it('should call API', () => {
        expect(getMock).toBeCalledTimes(1)
      })
    })
  })
})

// describe('Get auth token from response', () => {
//   let result: AuthToken | null

//   describe('With token', () => {
//     const response = {
//       headers: {
//         'token-type': 'Bearer',
//         client: 'client',
//         uid: 'uid@email.com',
//         'access-token': 'abcdef0123456789',
//         expiry: '1234567890',
//       },
//     } as AxiosResponse

//     beforeAll(() => {
//       result = getAuthTokenFromResponse(response)
//     })

//     it('should return', () =>
//       expect(result).toMatchObject({
//         tokenType: response.headers['token-type'],
//         client: response.headers['client'],
//         uid: response.headers['uid'],
//         accessToken: response.headers['access-token'],
//         expiry: response.headers['expiry'],
//       }))
//   })

//   describe('Without token', () => {
//     const response = {
//       headers: undefined,
//     } as AxiosResponse

//     beforeAll(() => {
//       result = getAuthTokenFromResponse(response)
//     })

//     it('should not return', () => expect(result).toBeNull())
//   })

//   describe('Response null', () => {
//     beforeAll(() => {
//       result = getAuthTokenFromResponse(null)
//     })

//     it('should not return', () => expect(result).toBeNull())
//   })
// })

// describe('Get auth headers', () => {
//   const authToken = {
//     tokenType: 'Bearer',
//     client: 'client',
//     uid: 'uid@email.com',
//     accessToken: 'abcdef0123456789',
//     expiry: '1234567890',
//   }
//   let result: { [key: string]: string }

//   beforeAll(() => {
//     result = getAuthHeaders(authToken)
//   })

//   it('should return', () =>
//     expect(result).toMatchObject({
//       'token-type': 'Bearer',
//       client: 'client',
//       uid: 'uid@email.com',
//       'access-token': 'abcdef0123456789',
//       expiry: '1234567890',
//     }))
// })

describe('Get pagination', () => {
  it('gets the pagination from headers', () => {
    const response = {
      headers: {
        'total-count': '100',
        'page-items': '20',
        'current-page': '3',
        'total-pages': '5',
      },
      data: null,
      status: 200,
      statusText: 'OK',
      config: {},
    }

    const { totalItems, itemsPerPage, currentPage, totalPages } = getPagination(response)

    expect(totalItems).toBe(100)
    expect(itemsPerPage).toBe(20)
    expect(currentPage).toBe(3)
    expect(totalPages).toBe(5)
  })
})

describe('Get limits', () => {
  it('gets the limits from headers', () => {
    const response = {
      headers: {
        'first-item': '1',
        'last-item': '1000',
      },
      data: null,
      status: 200,
      statusText: 'OK',
      config: {},
    }

    const { first, last } = getLimits(response)

    expect(first).toBe(1)
    expect(last).toBe(1000)
  })
})
