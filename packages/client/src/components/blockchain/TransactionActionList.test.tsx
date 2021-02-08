import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { TransactionActionType } from 'libraries/ethereum/types'
import { createTokenAction } from '../../../tests/fixtures/ethereum'
import TransactionActionList from './TransactionActionList'

describe('<TransactionActionList />', () => {
  let component: ShallowWrapper

  describe('Default', () => {
    const actions = [
      createTokenAction(TransactionActionType.Transfer),
      createTokenAction(TransactionActionType.Transfer),
    ]

    beforeAll(() => {
      component = shallow(<TransactionActionList actions={actions} />)
    })

    it('should render rows', () => {
      const rows = component.find('TransactionActionRow')
      expect(rows.length).toBe(2)
      expect(rows.at(0).prop('action')).toBe(actions[0])
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Empty', () => {
    const actions = []

    beforeAll(() => {
      component = shallow(<TransactionActionList actions={actions} />)
    })

    it('should not render rows', () => expect(component.find('TransactionActionRow').length).toBe(0))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })
})
