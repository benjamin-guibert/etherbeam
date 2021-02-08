import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Table from './Table'

describe('<Table />', () => {
  const content = 'Content'

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Table>{content}</Table>)
    })

    it('should render', () => {
      const table = component.find('table')
      expect(table.prop('children')).toBe(content)
      expect(table.hasClass('my-table')).toBeTruthy()
      expect(table.hasClass('my-dark-bg')).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Color', () => {
    beforeAll(() => {
      component = shallow(<Table color="primary">{content}</Table>)
    })

    it('should render', () => expect(component.find('table').hasClass('my-primary-bg')).toBeTruthy())
  })
})
