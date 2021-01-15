import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Difference from 'components/common/Difference'
import { HistoryTime } from 'libraries/ethereum/types'

describe('<Difference />', () => {
  let component: ReactWrapper

  describe('Hour', () => {
    beforeAll(() => {
      component = mount(<Difference time={HistoryTime.Hour} ratio={1} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('variant')).toEqual('secondary')
      expect(badge.find('span').at(1).prop('children')).toEqual('1H')
      expect(badge.prop('children')[1]).toEqual('+0 %')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Day', () => {
    beforeAll(() => {
      component = mount(<Difference time={HistoryTime.Day} ratio={1} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('variant')).toEqual('secondary')
      expect(badge.find('span').at(1).prop('children')).toEqual('1D')
      expect(badge.prop('children')[1]).toEqual('+0 %')
    })
  })

  describe('Week', () => {
    beforeAll(() => {
      component = mount(<Difference time={HistoryTime.Week} ratio={1} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('variant')).toEqual('secondary')
      expect(badge.find('span').at(1).prop('children')).toEqual('1W')
      expect(badge.prop('children')[1]).toEqual('+0 %')
    })
  })

  describe('Month', () => {
    beforeAll(() => {
      component = mount(<Difference time={HistoryTime.Month} ratio={1} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('variant')).toEqual('secondary')
      expect(badge.find('span').at(1).prop('children')).toEqual('1M')
      expect(badge.prop('children')[1]).toEqual('+0 %')
    })
  })

  describe('Year', () => {
    beforeAll(() => {
      component = mount(<Difference time={HistoryTime.Year} ratio={1} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('variant')).toEqual('secondary')
      expect(badge.find('span').at(1).prop('children')).toEqual('1Y')
      expect(badge.prop('children')[1]).toEqual('+0 %')
    })
  })

  describe('Positive', () => {
    beforeAll(() => {
      component = mount(<Difference ratio={1.3} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('variant')).toEqual('success')
      expect(badge.prop('children')[1]).toEqual('+30 %')
    })
  })

  describe('Negative', () => {
    beforeAll(() => {
      component = mount(<Difference ratio={0.7} />)
    })

    it('should render', () => {
      const badge = component.find('Badge')
      expect(badge.prop('variant')).toEqual('danger')
      expect(badge.prop('children')[1]).toEqual('-30 %')
    })
  })
})
