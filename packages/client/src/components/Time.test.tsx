import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Time from './Time'

describe('<Time />', () => {
  const dateTime = new Date(2020, 4, 5, 11, 22, 33)
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Time dateTime={dateTime} />)
    })

    it('should render', () => {
      const span = component.find('span').at(0)
      expect(span.hasClass('my-time')).toBeTruthy()
      expect(span.prop('children')).toBe('11:22')
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })
})
