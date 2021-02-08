import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { clearMocks } from '../../../tests/helpers'
import { createToken } from '../../../tests/fixtures/ethereum'
import Table from '../Table'
import TokenRow from './TokenRow'

describe('<TokenRow />', () => {
  const token = createToken('0x0000000000000000000000000000000000000111')
  const goToTokenPage = jest.fn()

  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = mount(
        <Table>
          <tbody>
            <TokenRow token={token} goToTokenPage={goToTokenPage} />
          </tbody>
        </Table>
      )
    })

    it('should render amount', () => expect(component.find('TokenAmount').prop('amount')).toBe(token.price))

    it('should render price history', () =>
      expect(component.find('TokenPriceHistory').prop('priceHistory')).toBe(token.priceHistory))

    it('should render address item', () => expect(component.find('AddressItem').prop('address')).toBe(token))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('On click', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Table>
          <tbody>
            <TokenRow token={token} goToTokenPage={goToTokenPage} />
          </tbody>
        </Table>
      )

      act(() => {
        component.find('TableRow').simulate('click')
        component.update()
      })
    })

    it('should call action', () => {
      expect(goToTokenPage).toBeCalledTimes(1)
      expect(goToTokenPage.mock.calls[0][0]).toBe(token.hash)
    })
  })
})
