import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { HistoryTime } from 'libraries/ethereum/types'
import Difference from './Difference'

describe('<Difference />', () => {
  let component: ShallowWrapper

  describe('Neutral', () => {
    beforeAll(() => {
      component = shallow(<Difference time={HistoryTime.Hour} ratio={1} />)
    })

    it('should render badge', () => expect(component.find('Badge').prop('color')).toBe('light'))

    it('should render prefix', () => {
      const span = component.find('Badge').find('span').at(0)
      expect(span.hasClass('my-difference-prefix')).toBeTruthy()
      expect(span.prop('children')).toBe('H')
    })

    it('should render amount', () => {
      const span = component.find('Badge').find('span').at(1)
      expect(span.hasClass('my-difference-amount')).toBeTruthy()
      expect(span.prop('children')).toBe('+0%')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Positive', () => {
    beforeAll(() => {
      component = shallow(<Difference time={HistoryTime.Hour} ratio={1.75} />)
    })

    it('should render badge', () => expect(component.find('Badge').prop('color')).toBe('positive'))

    it('should render amount', () => expect(component.find('Badge').find('span').at(1).prop('children')).toBe('+75%'))
  })

  describe('Negative', () => {
    beforeAll(() => {
      component = shallow(<Difference time={HistoryTime.Hour} ratio={0.75} />)
    })

    it('should render badge', () => expect(component.find('Badge').prop('color')).toBe('negative'))

    it('should render amount', () => expect(component.find('Badge').find('span').at(1).prop('children')).toBe('-25%'))
  })

  describe('Time', () => {
    describe('Day', () => {
      beforeAll(() => {
        component = shallow(<Difference time={HistoryTime.Day} ratio={1} />)
      })

      it('should render prefix', () => expect(component.find('Badge').find('span').at(0).prop('children')).toBe('D'))
    })

    describe('Week', () => {
      beforeAll(() => {
        component = shallow(<Difference time={HistoryTime.Week} ratio={1} />)
      })

      it('should render prefix', () => expect(component.find('Badge').find('span').at(0).prop('children')).toBe('W'))
    })

    describe('Month', () => {
      beforeAll(() => {
        component = shallow(<Difference time={HistoryTime.Month} ratio={1} />)
      })

      it('should render prefix', () => expect(component.find('Badge').find('span').at(0).prop('children')).toBe('M'))
    })

    describe('Year', () => {
      beforeAll(() => {
        component = shallow(<Difference time={HistoryTime.Year} ratio={1} />)
      })

      it('should render prefix', () => expect(component.find('Badge').find('span').at(0).prop('children')).toBe('Y'))
    })
  })
})
