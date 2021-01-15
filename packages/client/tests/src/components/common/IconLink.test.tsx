import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import IconLink from 'components/common/IconLink'

describe('<IconLink />', () => {
  let component: ReactWrapper

  beforeAll(() => {
    component = mount(
      <IconLink url="https://url.com" title="Title" className="app-class">
        Content
      </IconLink>
    )
  })

  it('should render', () => {
    const button = component.find('Button')
    expect(button.prop('href')).toBe('https://url.com')
    expect(button.prop('title')).toBe('Title')
    expect(button.hasClass('app-class')).toBeTruthy()
    expect(button.prop('children')).toEqual('Content')
  })

  it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
})
