import * as React from 'react'
import { render } from 'enzyme'
import { createTokenAction } from '../../../../fixtures/ethereum'
import TransactionActionRow from 'components/modules/blockchain/TransactionActionRow'
import { TransactionActionDirection, TransactionActionType } from 'libraries/ethereum/types'

describe('<TransactionActionRow />', () => {
  let component: unknown

  beforeAll(() => {
    const action = createTokenAction(TransactionActionType.Swap, TransactionActionDirection.Buy)

    component = render(<TransactionActionRow action={action} />)
  })

  it('should match snapshot', () => expect(component).toMatchSnapshot())
})
