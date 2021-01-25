import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Loader from './Loader'

describe('<Loader />', () => {
  let component: ShallowWrapper

  describe('Spinner', () => {
    beforeAll(() => {
      component = shallow(<Loader type="spinner" />)
    })

    it('should render', () => {
      expect(component.find('div').at(0).hasClass('my-loader')).toBeTruthy()
      expect(component.find('div').at(0).children().find('div').at(0).hasClass('my-loader-spinner')).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Dots', () => {
    beforeAll(() => {
      component = shallow(<Loader type="dots" />)
    })

    it('should render', () => {
      expect(component.find('div').at(0).hasClass('my-loader')).toBeTruthy()
      expect(component.find('div').at(0).children().find('div').at(0).hasClass('my-loader-dots')).toBeTruthy()
    })
  })
})
