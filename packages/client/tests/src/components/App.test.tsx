import * as React from 'react'
import { render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import App from 'components/App'

describe('<App />', () => {
  let component: unknown

  describe('Home page', () => {
    beforeAll(() => {
      component = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      )
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })

  describe('Invalid path', () => {
    beforeAll(() => {
      component = render(
        <MemoryRouter initialEntries={['/invalid-path']}>
          <App />
        </MemoryRouter>
      )
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })

  describe('Tokens', () => {
    beforeAll(() => {
      component = render(
        <MemoryRouter initialEntries={['/tokens']}>
          <App />
        </MemoryRouter>
      )
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })

  describe('Token', () => {
    beforeAll(() => {
      component = render(
        <MemoryRouter initialEntries={['/tokens/0x0000000000000000000000000000000000000111']}>
          <App />
        </MemoryRouter>
      )
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })
})
