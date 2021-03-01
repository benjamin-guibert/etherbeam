import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Header from './Header'

describe('<Header />', () => {
  let component: ShallowWrapper

  beforeAll(() => {
    component = shallow(<Header />)
  })

  it('should render header', () => expect(component.find('header').hasClass('my-header')).toBeTruthy())

  it('should render title', () => expect(component.find('Title').exists()).toBeTruthy())

  it('should render links', () => {
    const links = component.find('Link')
    expect(links).toHaveLength(2)
    expect(links.at(0).prop('href')).toBe('/')
    expect(links.at(1).prop('href')).toBe('/tokens')
    expect(links.at(1).prop('description')).toBe('Tokens')
  })

  it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
})
