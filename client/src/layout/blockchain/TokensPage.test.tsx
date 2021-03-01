import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { createToken } from '../../../tests/fixtures/ethereum'
import TokensPage from './TokensPage'

describe('<TokensPage />', () => {
  const tokens = [
    createToken('0x0000000000000000000000000000000000000111'),
    createToken('0x0000000000000000000000000000000000000222'),
  ]
  const goToTokenPage = jest.fn()

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(async () => {
      component = shallow(<TokensPage tokens={tokens} goToTokenPage={goToTokenPage} />)
    })

    it('should render token list', () => {
      const tokenList = component.find('TokenList')
      expect(tokenList.prop('tokens')).toBe(tokens)
      expect(tokenList.prop('goToTokenPage')).toBe(goToTokenPage)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Loading', () => {
    beforeAll(async () => {
      component = shallow(<TokensPage tokens={tokens} goToTokenPage={goToTokenPage} loading />)
    })

    it('should render token list', () => expect(component.find('TokenList').prop('loading')).toBeTruthy())
  })
})
