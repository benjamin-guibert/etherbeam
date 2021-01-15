import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import TransactionActionsList from 'components/modules/blockchain/TransactionActionsList'

describe('<TransactionActionsList />', () => {
  let component: ReactWrapper

  beforeAll(() => {
    component = mount(<TransactionActionsList actions={[]} />)
  })

  it('should render', () => expect(component.find('TransactionActionRow')).toHaveLength(0))

  it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
})
