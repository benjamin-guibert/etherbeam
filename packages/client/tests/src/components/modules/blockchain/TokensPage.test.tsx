import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { mocked } from 'ts-jest/utils'
import { act } from 'react-dom/test-utils'
import { clearMocks, mockTradingViewWidget } from '../../../../helpers'
import { createToken } from '../../../../fixtures/ethereum'

jest.mock('libraries/ethereum/server')
mockTradingViewWidget()

import { fetchTokens } from 'libraries/ethereum/server'
import TokensPage from 'components/modules/blockchain/TokensPage'

const fetchTokensMock = mocked(fetchTokens)
const addToast = jest.fn()

describe('<TokensPage />', () => {
  const tokens = [
    createToken('0x0000000000000000000000000000000000000111'),
    createToken('0x0000000000000000000000000000000000000222'),
    createToken('0x0000000000000000000000000000000000000333'),
  ]

  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(async () => {
      clearMocks()

      fetchTokensMock.mockResolvedValue(tokens)

      await act(async () => {
        component = mount(<TokensPage addToast={addToast} />)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should fetch tokens', () => expect(fetchTokensMock).toBeCalledTimes(1))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Empty', () => {
    beforeAll(async () => {
      clearMocks()

      fetchTokensMock.mockResolvedValue([])

      await act(async () => {
        component = mount(<TokensPage addToast={addToast} />)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should fetch tokens', () => expect(fetchTokensMock).toBeCalledTimes(1))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Error', () => {
    beforeAll(async () => {
      clearMocks()

      fetchTokensMock.mockRejectedValue(new Error('Error'))

      await act(async () => {
        component = mount(<TokensPage addToast={addToast} />)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should fetch tokens', () => expect(fetchTokensMock).toBeCalledTimes(1))

    it('should add toast', () => {
      expect(addToast).toBeCalledTimes(1)
      expect(addToast.mock.calls[0][0]).toMatchObject({ type: 'error', message: 'Error while fetching tokens.' })
    })
  })
})
