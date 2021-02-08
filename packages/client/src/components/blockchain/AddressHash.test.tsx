import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import AddressHash from './AddressHash'

describe('<AddressHash />', () => {
  const hash = '0x0000000000000000000000000000000000000111'

  let component: ShallowWrapper

  describe('Default', () => {
    beforeAll(() => {
      component = shallow(<AddressHash hash={hash} />)
    })

    it('should render', () => {
      const span = component.find('span')
      expect(span.prop('children')).toBe(hash)
      expect(span.hasClass('my-addresshash')).toBeTruthy()
    })

    it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
  })

  describe('Short', () => {
    beforeAll(() => {
      component = shallow(<AddressHash hash={hash} short />)
    })

    it('should render', () => expect(component.find('span').prop('children')).toBe('0x0000...0111'))
  })
})
