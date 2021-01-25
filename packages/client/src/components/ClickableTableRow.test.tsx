import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { clearMocks } from '../../tests/helpers'
import ClickableTableRow from './ClickableTableRow'

describe('<ClickableTableRow />', () => {
  const onClick = jest.fn()

  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(() => {
      clearMocks()
      component = mount(
        <table>
          <tbody>
            <ClickableTableRow onClick={onClick}>
              <td></td>
            </ClickableTableRow>
          </tbody>
        </table>
      )
    })

    it('should render', () => {
      const tr = component.find('tr')
      expect(tr.hasClass('my-clickabletablerow')).toBeTruthy()
      expect(tr.find('td').exists()).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('On click', () => {
    beforeAll(() => {
      clearMocks()
      component = mount(
        <table>
          <tbody>
            <ClickableTableRow onClick={onClick}>
              <td></td>
            </ClickableTableRow>
          </tbody>
        </table>
      )

      act(() => {
        component.find('tr').simulate('click')
        component.update()
      })
    })

    it('should call onClick', () => expect(onClick).toBeCalledTimes(1))
  })

  describe('On key up (enter)', () => {
    beforeAll(() => {
      clearMocks()
      component = mount(
        <table>
          <tbody>
            <ClickableTableRow onClick={onClick}>
              <td></td>
            </ClickableTableRow>
          </tbody>
        </table>
      )

      act(() => {
        component.find('tr').simulate('keyUp', { key: 'Enter' })
        component.update()
      })
    })

    it('should call onClick', () => expect(onClick).toBeCalledTimes(1))
  })

  describe('On key up (other)', () => {
    beforeAll(() => {
      clearMocks()
      component = mount(
        <table>
          <tbody>
            <ClickableTableRow onClick={onClick}>
              <td></td>
            </ClickableTableRow>
          </tbody>
        </table>
      )

      act(() => {
        component.find('tr').simulate('keyUp', { key: 'a' })
        component.update()
      })
    })

    it('should not call onClick', () => expect(onClick).toBeCalledTimes(0))
  })
})
