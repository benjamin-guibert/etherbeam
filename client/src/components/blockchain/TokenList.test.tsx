import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { createToken } from '../../../tests/fixtures/ethereum'
import TokenList from './TokenList'
import { Token } from 'libraries/types'

describe('<TokenList />', () => {
  const goToTokenPage = jest.fn()

  let component: ReactWrapper

  describe('Default', () => {
    const tokens = [
      createToken('0x0000000000000000000000000000000000000111'),
      createToken('0x0000000000000000000000000000000000000222'),
    ]

    beforeAll(() => {
      component = mount(<TokenList tokens={tokens} goToTokenPage={goToTokenPage} />)
    })

    it('should render rows', () => {
      const rows = component.find('TokenRow')
      expect(rows.length).toBe(2)
      expect(rows.at(0).prop('token')).toBe(tokens[0])
      expect(rows.at(0).prop('goToTokenPage')).toBe(goToTokenPage)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Empty', () => {
    const tokens: Token[] = []

    beforeAll(() => {
      component = mount(<TokenList tokens={tokens} goToTokenPage={goToTokenPage} />)
    })

    it('should not render rows', () => expect(component.find('TokenRow').length).toBe(0))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })
})
