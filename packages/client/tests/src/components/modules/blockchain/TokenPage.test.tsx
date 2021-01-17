import * as React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { mount, ReactWrapper } from 'enzyme'
import { mocked } from 'ts-jest/utils'
import { act } from 'react-dom/test-utils'
import { clearMocks, mockTradingViewWidget } from '../../../../helpers'
import { createToken } from '../../../../fixtures/ethereum'

jest.mock('libraries/ethereum/server')
mockTradingViewWidget()

import { fetchToken } from 'libraries/ethereum/server'
import TokenPage from 'components/modules/blockchain/TokenPage'

const fetchTokenMock = mocked(fetchToken)
const addToast = jest.fn()

describe('<TokenPage />', () => {
  let component: ReactWrapper

  describe('Valid', () => {
    beforeAll(async () => {
      clearMocks()

      const token = createToken('0x0000000000000000000000000000000000000111')
      fetchTokenMock.mockResolvedValue(token)

      await act(async () => {
        component = mount(
          <MemoryRouter initialEntries={['/tokens/0x0000000000000000000000000000000000000111']}>
            <Route path="/tokens/:address" exact>
              <TokenPage addToast={addToast} />
            </Route>
          </MemoryRouter>
        )
        jest.runTimersToTime(16 * 1000)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should fetch tokens', () => {
      expect(fetchTokenMock).toBeCalledTimes(1)
      expect(fetchTokenMock.mock.calls[0][0]).toBe('0x0000000000000000000000000000000000000111')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('No price', () => {
    beforeAll(async () => {
      clearMocks()

      const token = createToken('0x0000000000000000000000000000000000000111')
      token.price = undefined
      token.priceHistory = []
      fetchTokenMock.mockResolvedValue(token)

      await act(async () => {
        component = mount(
          <MemoryRouter initialEntries={['/tokens/0x0000000000000000000000000000000000000111']}>
            <Route path="/tokens/:address" exact>
              <TokenPage addToast={addToast} />
            </Route>
          </MemoryRouter>
        )
        jest.runTimersToTime(16 * 1000)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('No price history', () => {
    beforeAll(async () => {
      clearMocks()

      const token = createToken('0x0000000000000000000000000000000000000111')
      token.priceHistory = []
      fetchTokenMock.mockResolvedValue(token)

      await act(async () => {
        component = mount(
          <MemoryRouter initialEntries={['/tokens/0x0000000000000000000000000000000000000111']}>
            <Route path="/tokens/:address" exact>
              <TokenPage addToast={addToast} />
            </Route>
          </MemoryRouter>
        )
        jest.runTimersToTime(16 * 1000)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Unknown', () => {
    beforeAll(async () => {
      clearMocks()

      fetchTokenMock.mockResolvedValue(null)

      await act(async () => {
        component = mount(
          <MemoryRouter initialEntries={['/tokens/0x0000000000000000000000000000000000000111']}>
            <Route path="/tokens/:address" exact>
              <TokenPage addToast={addToast} />
            </Route>
          </MemoryRouter>
        )
        jest.runTimersToTime(16 * 1000)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should fetch tokens', () => {
      expect(fetchTokenMock).toBeCalledTimes(1)
      expect(fetchTokenMock.mock.calls[0][0]).toBe('0x0000000000000000000000000000000000000111')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Error', () => {
    beforeAll(async () => {
      clearMocks()

      fetchTokenMock.mockRejectedValue(new Error('Error'))

      await act(async () => {
        component = mount(
          <MemoryRouter initialEntries={['/tokens/0x0000000000000000000000000000000000000111']}>
            <Route path="/tokens/:address" exact>
              <TokenPage addToast={addToast} />
            </Route>
          </MemoryRouter>
        )
        jest.runTimersToTime(16 * 1000)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should fetch tokens', () => {
      expect(fetchTokenMock).toBeCalledTimes(1)
      expect(fetchTokenMock.mock.calls[0][0]).toBe('0x0000000000000000000000000000000000000111')
    })

    it('should add toast', () => {
      expect(addToast).toBeCalledTimes(1)
      expect(addToast.mock.calls[0][0]).toMatchObject({ type: 'error', message: 'Error while fetching token.' })
    })
  })
})
