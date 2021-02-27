import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import App from './App'

describe('<App />', () => {
  let component: ShallowWrapper

  beforeAll(() => {
    component = shallow(<App />)
  })

  it('should render header', () => expect(component.find('Header').exists()).toBeTruthy())

  it('should render routes', () => {
    const routes = component.find('Route')
    expect(routes).toHaveLength(3)
    expect(routes.at(0).prop('path')).toBe('/')
    expect(routes.at(0).prop('exact')).toBeTruthy()
    expect(routes.at(1).prop('path')).toBe('/tokens')
    expect(routes.at(1).prop('exact')).toBeTruthy()
    expect(routes.at(2).prop('path')).toBe('/tokens/:address')
    expect(routes.at(2).prop('exact')).toBeTruthy()
  })

  it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
})
