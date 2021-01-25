import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { createTokenAction } from '../../../tests/fixtures/ethereum'
import { TransactionActionDirection, TransactionActionType } from 'libraries/ethereum/types'
import TransactionActionItem from './TransactionActionItem'

describe('<TransactionActionRow />', () => {
  let component: ShallowWrapper

  describe('Default', () => {
    const action = createTokenAction(TransactionActionType.Unknown)

    beforeAll(() => {
      component = shallow(<TransactionActionItem action={action} />)
    })

    it('should render row', () =>
      expect(component.find('tr').hasClass('my-transactionactionitem-unknown')).toBeTruthy())

    it('should render time', () => expect(component.find('Time').prop('dateTime')).toBe(action.transaction.dateTime))
    it('should render address', () => expect(component.find('Address').prop('address')).toBe(action.holder))
    it('should render Etherscan link', () =>
      expect(component.find('EtherscanLink').prop('url')).toBe(action.transaction.address.url))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Approval', () => {
    const action = createTokenAction(TransactionActionType.Approval)

    beforeAll(() => {
      component = shallow(<TransactionActionItem action={action} />)
    })

    it('should render row', () =>
      expect(component.find('tr').hasClass('my-transactionactionitem-approval')).toBeTruthy())

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Transfer', () => {
    const action = createTokenAction(TransactionActionType.Transfer)

    beforeAll(() => {
      component = shallow(<TransactionActionItem action={action} />)
    })

    it('should render row', () =>
      expect(component.find('tr').hasClass('my-transactionactionitem-transfer')).toBeTruthy())

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Buy', () => {
    const action = createTokenAction(TransactionActionType.Swap, TransactionActionDirection.Buy)

    beforeAll(() => {
      component = shallow(<TransactionActionItem action={action} />)
    })

    it('should render row', () => expect(component.find('tr').hasClass('my-transactionactionitem-buy')).toBeTruthy())

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Sell', () => {
    const action = createTokenAction(TransactionActionType.Swap, TransactionActionDirection.Sell)

    beforeAll(() => {
      component = shallow(<TransactionActionItem action={action} />)
    })

    it('should render row', () => expect(component.find('tr').hasClass('my-transactionactionitem-sell')).toBeTruthy())

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })
})
