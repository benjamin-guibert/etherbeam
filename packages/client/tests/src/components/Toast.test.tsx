import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Toast from 'components/Toast'

describe('<Toast />', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  let component: ReactWrapper

  describe('Error', () => {
    beforeAll(() => {
      component = mount(
        <Toast type="error" className="app-class">
          Message.
        </Toast>
      )
    })

    it('should render', () => {
      const toast = component.children().first()
      expect(toast.prop('show')).toBeTruthy()
      expect(toast.hasClass('bg-danger')).toBeTruthy()
      expect(toast.hasClass('app-class')).toBeTruthy()
      expect(toast.find('ToastHeader').contains('Error'))
      expect(toast.find('ToastBody').contains('Message.'))
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Auto-hide', () => {
    beforeAll(async () => {
      await act(async () => {
        component = mount(<Toast type="error">Message.</Toast>)

        await new Promise(setImmediate)
        jest.runTimersToTime(10 * 1000)
        await new Promise(setImmediate)
        component.update()
      })
    })

    it('should hide', () => {
      const toast = component.children().first()
      expect(toast.prop('show')).toBeFalsy()
    })
  })
})
