import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Page from 'components/common/Page'

describe('<Page />', () => {
  let component: ReactWrapper

  beforeAll(() => {
    component = mount(<Page title="Title">Content</Page>)
  })

  it('should render', () => {
    const header = component.find('h1')
    expect(header.prop('children')).toEqual('Title')
  })

  it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
})
