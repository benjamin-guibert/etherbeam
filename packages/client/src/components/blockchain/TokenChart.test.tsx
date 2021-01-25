import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

jest.mock('react-tradingview-widget', () => {
  return {
    __esModule: true,
    default: () => {
      return <article></article>
    },
    Themes: {
      DARK: 'DARK',
    },
  }
})

import TokenChart from './TokenChart'

describe('<TokenChart />', () => {
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<TokenChart symbol="UNI" />)
    })

    it('should render div', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('w-100')).toBeTruthy()
      expect(div.hasClass('h-100')).toBeTruthy()
    })

    it('should render widget', () => {
      const widget = component.find('div').at(0).children().at(0)
      expect(widget.prop('symbol')).toBe('UNISWAP:UNIWETH')
      expect(widget.prop('interval')).toBe(60)
      expect(widget.prop('timezone')).toBe('Europe/Paris')
      expect(widget.prop('allow_symbol_change')).toBeFalsy()
      expect(widget.prop('show_popup_button')).toBeTruthy()
      expect(widget.prop('withdateranges')).toBeTruthy()
      expect(widget.prop('autosize')).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('With width', () => {
    beforeAll(() => {
      component = shallow(<TokenChart symbol="UNI" width={200} />)
    })

    it('should render div', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('w-100')).toBeFalsy()
      expect(div.hasClass('h-100')).toBeTruthy()
    })
  })

  describe('With height', () => {
    beforeAll(() => {
      component = shallow(<TokenChart symbol="UNI" height={200} />)
    })

    it('should render div', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('w-100')).toBeTruthy()
      expect(div.hasClass('h-100')).toBeFalsy()
    })
  })

  describe('With width', () => {
    beforeAll(() => {
      component = shallow(<TokenChart symbol="UNI" width={200} height={200} />)
    })

    it('should render div', () => {
      const div = component.find('div').at(0)
      expect(div.hasClass('w-100')).toBeFalsy()
      expect(div.hasClass('h-100')).toBeFalsy()
    })
  })
})
