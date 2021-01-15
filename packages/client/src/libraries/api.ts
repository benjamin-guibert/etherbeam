import { AxiosResponse } from 'axios'

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
