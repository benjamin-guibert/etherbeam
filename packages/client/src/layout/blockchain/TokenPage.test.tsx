import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { mocked } from 'ts-jest/utils'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, Route } from 'react-router'
import { clearMocks } from '../../../tests/helpers'
import { createToken } from '../../../tests/fixtures/ethereum'

jest.mock('libraries/ethereum/server')
jest.mock('components/blockchain/TokenChart')

import { fetchToken } from 'libraries/ethereum/server'

const fetchTokenMock = mocked(fetchToken)

import TokenPage from './TokenPage'

describe('<TokenPage />', () => {
  const token = createToken('0x0000000000000000000000000000000000000111')

  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(async () => {
      clearMocks()

      fetchTokenMock.mockResolvedValue(token)

      await act(async () => {
        component = mount(
          <MemoryRouter initialEntries={['/tokens/0x0000000000000000000000000000000000000111']}>
            <Route path="/tokens/:address" exact>
              <TokenPage />
            </Route>
          </MemoryRouter>
        )
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should fetch tokens', () => expect(fetchTokenMock).toBeCalledTimes(1))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Default', () => {
    beforeAll(async () => {
      clearMocks()

      fetchTokenMock.mockResolvedValue(null)

      await act(async () => {
        component = mount(
          <MemoryRouter initialEntries={['/tokens/0x0000000000000000000000000000000000000111']}>
            <Route path="/tokens/:address" exact>
              <TokenPage />
            </Route>
          </MemoryRouter>
        )
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should fetch tokens', () => expect(fetchTokenMock).toBeCalledTimes(1))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })
})
