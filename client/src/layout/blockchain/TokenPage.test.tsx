import * as React from 'react'
import { render } from 'enzyme'
import { createToken } from '../../../tests/fixtures/ethereum'

jest.mock('components/blockchain/TokenChart')

import TokenPage from './TokenPage'

describe('<TokenPage />', () => {
  const token = createToken('0x0000000000000000000000000000000000000111')

  let component: unknown

  describe('Default', () => {
    beforeAll(async () => {
      component = render(<TokenPage token={token} />)
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })

  describe('Loading', () => {
    beforeAll(async () => {
      component = render(<TokenPage token={null} loading />)
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })
})
