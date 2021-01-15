import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Toaster from 'components/Toaster'
import { act } from 'react-dom/test-utils'

describe('<Toaster />', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  let component: ReactWrapper

  describe('With toasts', () => {
    beforeAll(() => {
      component = mount(
        <Toaster
          toasts={[
            { message: 'Message 1', type: 'error' },
            { message: 'Message 2', type: 'error' },
          ]}
        />
      )
    })

    it('should have toasts', () => {
      const toasts = component.find('Toast')
      expect(toasts).toHaveLength(4)
      expect(toasts.at(0).prop('type')).toBe('error')
      expect(toasts.at(0).prop('children')).toBe('Message 1')
      expect(toasts.at(2).prop('type')).toBe('error')
      expect(toasts.at(2).prop('children')).toBe('Message 2')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Without toasts', () => {
    beforeAll(() => {
      component = mount(<Toaster toasts={[]} />)
    })

    it('should not have toasts', () => expect(component.find('Toast')).toHaveLength(0))

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('New toast', () => {
    beforeAll(async () => {
      await act(async () => {
        const toasts = []
        component = mount(<Toaster toasts={toasts} />)
        toasts.push({ message: 'Message', type: 'error' })
        component.setProps({ toasts })
      })
    })

    it('should have toast', () => {
      const toasts = component.find('Toast')
      expect(toasts).toHaveLength(2)
      expect(toasts.at(0).prop('type')).toBe('error')
      expect(toasts.at(0).prop('children')).toBe('Message')
    })
  })
})
