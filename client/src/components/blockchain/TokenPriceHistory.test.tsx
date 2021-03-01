import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { BigNumber } from 'ethers'
import TokenPriceHistory from './TokenPriceHistory'
import { HistoryTime } from 'libraries/types'

describe('<TokenPriceHistory />', () => {
  const priceHistory = [
    {
      time: HistoryTime.Hour,
      price: BigNumber.from('1000'),
      ratio: 1,
    },
    {
      time: HistoryTime.Day,
      price: BigNumber.from('2000'),
      ratio: 1.5,
    },
    {
      time: HistoryTime.Week,
      price: BigNumber.from('500'),
      ratio: 0.5,
    },
  ]

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<TokenPriceHistory priceHistory={priceHistory} />)
    })

    it('should render items', () => {
      const items = component.find('Difference')
      expect(items).toHaveLength(3)
      expect(items.at(0).prop('time')).toBe(priceHistory[0].time)
      expect(items.at(0).prop('ratio')).toBe(priceHistory[0].ratio)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Class', () => {
    beforeAll(() => {
      component = shallow(<TokenPriceHistory priceHistory={priceHistory} className="my-class" />)
    })

    it('should render list', () => expect(component.find('List').hasClass('my-class')).toBeTruthy())
  })
})
