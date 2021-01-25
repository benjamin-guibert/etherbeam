import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Page from './Page'

describe('<Page />', () => {
  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<Page title="Title" />)
    })

    it('should render main', () => {
      const main = component.find('main')
      expect(main.hasClass('my-page')).toBeTruthy()
      expect(main.hasClass('my-mw-s')).toBeTruthy()
    })

    it('should render title', () => {
      const h1 = component.find('h1')
      expect(h1.hasClass('my-page-header')).toBeTruthy()
      expect(h1.find('div').exists()).toBeFalsy()
      expect(h1.prop('children')).toBe('Title')
      expect(h1.find('Loader').exists()).toBeFalsy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Title loading', () => {
    beforeAll(() => {
      component = shallow(<Page title="Title" titleLoading />)
    })

    it('should render title', () => {
      const h1 = component.find('h1')
      expect(h1.hasClass('my-page-header')).toBeTruthy()
      const div = h1.find('div').at(0)
      expect(div.hasClass('my-page-titleloader'))
      expect(div.find('Loader').exists()).toBeTruthy()
    })
  })
})
