import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { clearMocks } from '../../tests/helpers'
import Table from './Table'
import TableRow from './TableRow'

describe('<TableRow />', () => {
  const action = jest.fn()
  const content = <td></td>
  const className = 'my-class'

  let component: ReactWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = mount(
        <Table>
          <tbody>
            <TableRow>{content}</TableRow>
          </tbody>
        </Table>
      )
    })

    it('should render', () => {
      const tr = component.find('tr')
      expect(tr.prop('tabIndex')).toBeUndefined()
      expect(tr.prop('children')).toBe(content)
      expect(tr.hasClass('my-dark-bg')).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Color', () => {
    beforeAll(() => {
      component = mount(
        <Table>
          <tbody>
            <TableRow color="primary">{content}</TableRow>
          </tbody>
        </Table>
      )
    })

    it('should render', () => expect(component.find('tr').hasClass('my-primary-bg')).toBeTruthy())
  })

  describe('Clickable', () => {
    beforeAll(() => {
      component = mount(
        <Table>
          <tbody>
            <TableRow clickable action={action}>
              {content}
            </TableRow>
          </tbody>
        </Table>
      )
    })

    it('should render', () => {
      const tr = component.find('tr')
      expect(tr.prop('tabIndex')).toBe(0)
      expect(tr.hasClass('my-clickable')).toBeTruthy()
    })
  })

  describe('Active', () => {
    beforeAll(() => {
      component = mount(
        <Table>
          <tbody>
            <TableRow active>{content}</TableRow>
          </tbody>
        </Table>
      )
    })

    it('should render', () => expect(component.find('tr').hasClass('my-active')).toBeTruthy())
  })

  describe('Disabled', () => {
    beforeAll(() => {
      component = mount(
        <Table>
          <tbody>
            <TableRow clickable action={action} disabled>
              {content}
            </TableRow>
          </tbody>
        </Table>
      )
    })

    it('should render', () => {
      const tr = component.find('tr')
      expect(tr.prop('tabIndex')).toBeUndefined()
      expect(tr.hasClass('my-disabled-fg')).toBeTruthy()
    })
  })

  describe('Class', () => {
    beforeAll(() => {
      component = mount(
        <Table>
          <tbody>
            <TableRow className={className}>{content}</TableRow>
          </tbody>
        </Table>
      )
    })

    it('should render', () => expect(component.find('tr').hasClass('my-class')).toBeTruthy())
  })

  describe('On click', () => {
    beforeAll(() => {
      clearMocks()

      component = mount(
        <Table>
          <tbody>
            <TableRow clickable action={action}>
              {content}
            </TableRow>
          </tbody>
        </Table>
      )

      act(() => {
        component.find('tr').simulate('click')
        component.update()
      })
    })

    it('should call action', () => expect(action).toBeCalledTimes(1))
  })

  describe('On key up (enter)', () => {
    beforeAll(() => {
      clearMocks()
      component = mount(
        <Table>
          <tbody>
            <TableRow clickable action={action}>
              {content}
            </TableRow>
          </tbody>
        </Table>
      )

      act(() => {
        component.find('tr').simulate('keyUp', { key: 'Enter' })
        component.update()
      })
    })

    it('should call action', () => expect(action).toBeCalledTimes(1))
  })

  describe('On key up (other)', () => {
    beforeAll(() => {
      clearMocks()
      component = mount(
        <Table>
          <tbody>
            <TableRow clickable action={action}>
              {content}
            </TableRow>
          </tbody>
        </Table>
      )

      act(() => {
        component.find('tr').simulate('keyUp', { key: 'a' })
        component.update()
      })
    })

    it('should not call action', () => expect(action).toBeCalledTimes(0))
  })
})
