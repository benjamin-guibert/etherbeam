import React from 'react'
import { act } from 'react-dom/test-utils'
import { shallow, ShallowWrapper } from 'enzyme'
import { clearMocks } from '../../tests/helpers'
import Toast from './Toast'

describe('<Toast />', () => {
  const content = 'Toast.'
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Toast>{content}</Toast>)
    })

    it('should render toast', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('my-dark-bg')).toBeTruthy()
      expect(div.hasClass('my-toast-hidden')).toBeFalsy()
    })

    it('should render content', () =>
      expect(component.find('div').at(0).find('div').at(0).prop('children')).toBeTruthy())

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Type', () => {
    describe('Info', () => {
      beforeAll(() => {
        component = shallow(<Toast type="info">{content}</Toast>)
      })

      it('should render', () => expect(component.find('div').at(0).hasClass('my-dark-bg')).toBeTruthy())
    })

    describe('Success', () => {
      beforeAll(() => {
        component = shallow(<Toast type="success">{content}</Toast>)
      })

      it('should render', () => expect(component.find('div').at(0).hasClass('my-positive-bg')).toBeTruthy())
    })

    describe('Error', () => {
      beforeAll(() => {
        component = shallow(<Toast type="error">{content}</Toast>)
      })

      it('should render', () => expect(component.find('div').at(0).hasClass('my-negative-bg')).toBeTruthy())
    })
  })

  describe('Auto hide', () => {
    beforeAll(async () => {
      clearMocks()

      component = shallow(<Toast>{content}</Toast>)

      act(async () => {
        component.find('PaginationItem').at(8).find('Button').simulate('click')

        jest.runTimersToTime(5000)
        await new Promise(setImmediate)
        component.update()
      })

      it('should hide', () => expect(component.find('div').at(0).hasClass('my-toast-hidden')).toBeTruthy())
    })
  })
})
