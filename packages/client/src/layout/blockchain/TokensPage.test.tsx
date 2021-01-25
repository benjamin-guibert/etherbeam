import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { mocked } from 'ts-jest/utils'
import { act } from 'react-dom/test-utils'
import { clearMocks } from '../../../tests/helpers'
import { createToken } from '../../../tests/fixtures/ethereum'

jest.mock('libraries/ethereum/server')

import { fetchTokens } from 'libraries/ethereum/server'

const fetchTokensMock = mocked(fetchTokens)

import TokensPage from './TokensPage'

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
        component = mount(<TokensPage />)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should render page', () => {
      const page = component.find('Page')
      expect(page.prop('title')).toBe('Tokens')
    })

    it('should fetch tokens', () => expect(fetchTokensMock).toBeCalledTimes(1))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Empty', () => {
    beforeAll(async () => {
      clearMocks()

      fetchTokensMock.mockResolvedValue([])

      await act(async () => {
        component = mount(<TokensPage />)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should fetch tokens', () => expect(fetchTokensMock).toBeCalledTimes(1))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })
})
