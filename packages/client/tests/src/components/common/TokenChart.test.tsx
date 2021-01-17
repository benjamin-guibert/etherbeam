import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import TokenChart from 'components/common/TokenChart'

describe('<TokenChart />', () => {
  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = mount(<TokenChart symbol="UNI" />)
    })

    it('should render div', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('w-100')).toBeTruthy()
      expect(div.hasClass('h-100')).toBeTruthy()
    })

    it('should render widget', () => {
      const widget = component.find('TradingViewWidget')
      expect(widget.prop('symbol')).toBe('UNISWAP:UNIWETH')
      expect(widget.prop('interval')).toBe(60)
      expect(widget.prop('timezone')).toBe('Europe/Paris')
      expect(widget.prop('allow_symbol_change')).toBeFalsy()
      expect(widget.prop('show_popup_button')).toBeTruthy()
      expect(widget.prop('withdateranges')).toBeTruthy()
      expect(widget.prop('autosize')).toBeTruthy()
    })
  })

  describe('With width', () => {
    beforeAll(() => {
      component = mount(<TokenChart symbol="UNI" width={200} />)
    })

    it('should render div', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('w-100')).toBeFalsy()
      expect(div.hasClass('h-100')).toBeTruthy()
    })
  })

  describe('With height', () => {
    beforeAll(() => {
      component = mount(<TokenChart symbol="UNI" height={200} />)
    })

    it('should render div', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('w-100')).toBeTruthy()
      expect(div.hasClass('h-100')).toBeFalsy()
    })
  })

  describe('With width', () => {
    beforeAll(() => {
      component = mount(<TokenChart symbol="UNI" width={200} height={200} />)
    })

    it('should render div', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('w-100')).toBeFalsy()
      expect(div.hasClass('h-100')).toBeFalsy()
    })
  })
})
