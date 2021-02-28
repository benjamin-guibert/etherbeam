import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  ApiClient,
  AuthToken,
  AuthTokenLifecycle,
  AuthTokenUpdateCallback,
  HttpHeaders,
  HttpStatus,
  Pagination,
  RestAction,
} from './types'

const TOKEN_AUTH_BATCH_REQUEST_BUFFER = 5 * 1000

const getAuthHeaders = ({ client, uid, accessToken, tokenType, expiry }: AuthToken): HttpHeaders => {
  return {
    'token-type': tokenType,
    client,
    uid,
    'access-token': accessToken,
    expiry,
  }
}

const getAuthTokenFromHeaders = (headers: HttpHeaders): AuthToken | null => {
  if (!headers['access-token']) return null

  return {
    tokenType: headers['token-type'],
    client: headers['client'],
    uid: headers['uid'],
    accessToken: headers['access-token'],
    expiry: headers['expiry'],
  }
}

const onNewToken = async (apiClient: ApiClient, token: AuthToken): Promise<void> => {
  apiClient.authTokenLifecycle?.newTokenSubscriptions.forEach((callback) => callback(token))
}

const useRequestTokenAuth = (apiClient: ApiClient, config: AxiosRequestConfig): AxiosRequestConfig => {
  const authTokenLifecycle = apiClient.authTokenLifecycle as AuthTokenLifecycle

  if (
    (authTokenLifecycle.lastCall &&
      authTokenLifecycle.nextToken &&
      Date.now() - authTokenLifecycle.lastCall > TOKEN_AUTH_BATCH_REQUEST_BUFFER) ||
    !authTokenLifecycle.currentToken
  ) {
    authTokenLifecycle.currentToken = authTokenLifecycle.nextToken
    authTokenLifecycle.nextToken = null
  }

  if (authTokenLifecycle.currentToken) {
    config.headers = {
      ...getAuthHeaders(authTokenLifecycle.currentToken),
      ...config.headers,
    }
  }

  authTokenLifecycle.lastCall = Date.now()

  return config
}

const useResponseAuthHeaders = (apiClient: ApiClient, response: AxiosResponse): AxiosResponse => {
  const authTokenLifecycle = apiClient.authTokenLifecycle as AuthTokenLifecycle
  const nextToken = getAuthTokenFromHeaders(response.headers)

  if (nextToken) {
    authTokenLifecycle.nextToken = nextToken
    onNewToken(apiClient, nextToken)
  }

  return response
}

const useResponseNextTokenOnFailure = (apiClient: ApiClient, response: AxiosResponse): AxiosResponse => {
  const authTokenLifecycle = apiClient.authTokenLifecycle as AuthTokenLifecycle

  if (response.status == HttpStatus.Unauthorized) authTokenLifecycle.currentToken = null

  return response
}

const initializeTokenAuth = (apiClient: ApiClient): void => {
  apiClient.authTokenLifecycle = {
    newTokenSubscriptions: [],
  }

  apiClient.axiosInstance.interceptors.request.use((config) => useRequestTokenAuth(apiClient, config))
  apiClient.axiosInstance.interceptors.response.use((response) => useResponseAuthHeaders(apiClient, response))
  apiClient.axiosInstance.interceptors.response.use((response) => useResponseNextTokenOnFailure(apiClient, response))
}

const defaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' }

export const createApiClient = (
  baseUrl: string,
  withTokenAuth?: boolean,
  timeout?: number,
  headers = defaultHeaders
): ApiClient => {
  const apiClient: ApiClient = {
    axiosInstance: axios.create({
      baseURL: baseUrl,
      timeout,
      headers,
    }),
  }

  if (withTokenAuth) initializeTokenAuth(apiClient)

  return apiClient
}

export const setAuthToken = (apiClient: ApiClient, token: AuthToken): void => {
  flushAuthToken(apiClient)

  if (apiClient.authTokenLifecycle) apiClient.authTokenLifecycle.currentToken = token
}

export const isAuthentified = (apiClient: ApiClient): boolean | null => {
  if (!apiClient.authTokenLifecycle) return null

  return !!apiClient.authTokenLifecycle.currentToken || !!apiClient.authTokenLifecycle.nextToken
}

export const subscribeToNewTokens = (apiClient: ApiClient, callback: AuthTokenUpdateCallback): void => {
  apiClient.authTokenLifecycle?.newTokenSubscriptions.push(callback)
}

export const unsubscribeFromNewTokens = (apiClient: ApiClient, callback: AuthTokenUpdateCallback): void => {
  const index = apiClient.authTokenLifecycle?.newTokenSubscriptions.indexOf(callback)

  if (index == undefined || index < 0) return

  apiClient.authTokenLifecycle?.newTokenSubscriptions.splice(index, 1)
}

export const flushAuthToken = (apiClient: ApiClient): void => {
  if (!apiClient.authTokenLifecycle) return

  apiClient.authTokenLifecycle.lastCall = undefined
  apiClient.authTokenLifecycle.currentToken = undefined
  apiClient.authTokenLifecycle.nextToken = undefined
}

export const callApi = async <T>(
  apiClient: ApiClient,
  action: RestAction,
  url: string,
  expectedStatuses: HttpStatus[] = [HttpStatus.Ok],
  configuration?: AxiosRequestConfig | null,
  data?: unknown,
  noRetryOnUnauthentified?: boolean
): Promise<AxiosResponse<T>> => {
  const { axiosInstance, authTokenLifecycle } = apiClient
  const statuses = [...expectedStatuses]
  if (apiClient.authTokenLifecycle) statuses.push(HttpStatus.Unauthorized)
  const config = {
    validateStatus: (status: number) => statuses.includes(status),
    ...configuration,
  }

  let response: AxiosResponse<T>

  switch (action) {
    case RestAction.Get:
      response = await axiosInstance.get<T>(url, config)
      break
    case RestAction.Post:
      response = await axiosInstance.post<T>(url, data, config)
      break
    case RestAction.Put:
      response = await axiosInstance.put<T>(url, data, config)
      break
    case RestAction.Patch:
      response = await axiosInstance.patch<T>(url, data, config)
      break
    case RestAction.Delete:
      response = await axiosInstance.delete<T>(url, config)
      break
    case RestAction.Head:
      response = await axiosInstance.head<T>(url, config)
      break
    case RestAction.Options:
      response = await axiosInstance.options<T>(url, config)
      break
  }

  if (!noRetryOnUnauthentified && response.status == HttpStatus.Unauthorized && authTokenLifecycle?.nextToken) {
    return callApi(apiClient, action, url, expectedStatuses, configuration, data, true)
  }

  return response
}

export const getPagination = ({ headers }: AxiosResponse): Pagination => {
  return {
    totalItems: Number(headers['total-count']),
    itemsPerPage: Number(headers['page-items']),
    currentPage: Number(headers['current-page']),
    totalPages: Number(headers['total-pages']),
  }
}

export const getLimits = ({ headers }: AxiosResponse): { first: number; last: number } => {
  return {
    first: Number(headers['first-item']),
    last: Number(headers['last-item']),
  }
}
