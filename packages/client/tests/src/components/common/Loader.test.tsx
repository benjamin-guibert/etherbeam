import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Loader from 'components/common/Loader'

describe('<Loader />', () => {
  let component: ReactWrapper

  beforeAll(() => {
    component = mount(<Loader size="sm" className="ae-class" />)
  })

  it('should render', () => {
    expect(component.find('div').first().hasClass('ae-class')).toBeTruthy()
    expect(component.find('Spinner').prop('size')).toBe('sm')
  })

  it('should match snapshot', () => expect(component.render()).toMatchSnapshot())
})
