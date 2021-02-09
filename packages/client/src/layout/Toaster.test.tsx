import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { ToastType } from './toaster-helper'
import Toaster from './Toaster'

describe('<Toaster />', () => {
  let component: ShallowWrapper

  describe('Default', () => {
    const toasts: ToastType[] = [
      { id: 0, type: 'info', content: 'Toast' },
      { id: 1, type: 'info', content: 'Toast' },
    ]
    beforeAll(() => {
      component = shallow(<Toaster toasts={toasts} />)
    })

    it('should render toasts', () => {
      const items = component.find('ListItem')
      expect(items.length).toBe(2)
      expect(items.at(0).find('Toast').prop('type')).toBe(toasts[0].type)
      expect(items.at(0).find('Toast').prop('children')).toBe(toasts[0].content)
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Empty', () => {
    const toasts: ToastType[] = []
    beforeAll(() => {
      component = shallow(<Toaster toasts={toasts} />)
    })

    it('should not render toasts', () => expect(component.find('ListItem').length).toBe(0))
  })
})
