import * as React from 'react'
import { render } from 'enzyme'
import TransactionActionList from './TransactionActionList'
import { createTokenAction } from '../../../tests/fixtures/ethereum'
import { TransactionActionType } from 'libraries/ethereum/types'

describe('<TransactionActionList />', () => {
  let component: unknown

  describe('Default', () => {
    const actions = [
      createTokenAction(TransactionActionType.Transfer),
      createTokenAction(TransactionActionType.Transfer),
      createTokenAction(TransactionActionType.Transfer),
    ]

    beforeAll(() => {
      component = render(<TransactionActionList actions={actions} />)
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })

  describe('Empty', () => {
    const actions = []

    beforeAll(() => {
      component = render(<TransactionActionList actions={actions} />)
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })
})
