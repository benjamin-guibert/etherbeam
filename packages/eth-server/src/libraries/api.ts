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

export interface AuthToken {
  client: string
  uid: string
  accessToken: string
  tokenType: string
  expiry: string
}

export const getAuthTokenFromResponse = ({ headers }: AxiosResponse): AuthToken => {
  return {
    client: headers['client'],
    uid: headers['uid'],
    accessToken: headers['access-token'],
    tokenType: headers['token-type'],
    expiry: headers['expiry'],
  }
}

export const getAuthHeaders = ({
  client,
  uid,
  accessToken,
  tokenType,
  expiry,
}: AuthToken): { [key: string]: string } => {
  return {
    client,
    uid,
    'access-token': accessToken,
    'token-type': tokenType,
    expiry,
  }
}
