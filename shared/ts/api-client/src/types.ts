import { AxiosInstance } from 'axios'

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export enum RestAction {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
  Head = 'HEAD',
  Options = 'OPTIONS',
}

export type HttpHeaders = { [key: string]: string }

export interface AuthToken {
  tokenType: string
  client: string
  uid: string
  accessToken: string
  expiry: string
}

export type AuthTokenUpdateCallback = (authToken: AuthToken) => void

export interface AuthTokenLifecycle {
  lastCall?: number
  currentToken?: AuthToken | null
  nextToken?: AuthToken | null
  newTokenSubscriptions: AuthTokenUpdateCallback[]
}

export interface ApiClient {
  axiosInstance: AxiosInstance
  authTokenLifecycle?: AuthTokenLifecycle
}

export interface Pagination {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  totalPages: number
}

export interface PaginatedContent<T> {
  items: T[]
  pagination: Pagination
}
