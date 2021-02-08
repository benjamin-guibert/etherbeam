import React from 'react'
import { render } from 'enzyme'
import Title from './Title'

describe('<Title />', () => {
  let component: cheerio.Cheerio

  describe('Default', () => {
    beforeAll(() => {
      component = render(<Title />)
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })
})
