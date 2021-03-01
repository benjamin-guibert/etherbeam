import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Title from './Title'

describe('<Title />', () => {
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Title />)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Label breakpoint', () => {
    beforeAll(() => {
      component = shallow(<Title labelBreakpoint="m" />)
    })

    it('should render', () => expect(component.find('span').at(0).children().at(1).hasClass('my-d-min-m')).toBeTruthy())
  })
})
