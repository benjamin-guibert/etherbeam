import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import NavigationBar from 'components/NavigationBar'

describe('<NavigationBar />', () => {
  let component: ReactWrapper

  beforeAll(() => {
    component = mount(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    )
  })

  it('should have links', () => {
    expect(component.find('NavbarBrand').prop('href')).toBe('/')
    const links = component.find('NavLink')
    expect(links).toHaveLength(1)
    expect(links.at(0).prop('href')).toBe('/tokens')
  })

  it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
})
