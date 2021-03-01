import React from 'react'
import { render } from 'enzyme'
import { createServerData, createUser } from '../../tests/fixtures/server'
import { User } from 'libraries/types'
import { SessionContext, SessionContextData } from './SessionContext'

const createContextData = (currentUser: User | null | undefined): SessionContextData => {
  return {
    serverData: createServerData(),
    currentUser,
    initialize: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  }
}

describe('<HeaderSession />', () => {
  let component: cheerio.Cheerio

  describe('Authentified', () => {
    const user = createUser()
    const contextData = createContextData(user)

    beforeAll(() => {
      component = render(<SessionContext.Provider value={contextData}></SessionContext.Provider>)
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })
  describe('Unauthentified', () => {
    const contextData = createContextData(null)

    beforeAll(() => {
      component = render(<SessionContext.Provider value={contextData}></SessionContext.Provider>)
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })

  describe('Uninitialized', () => {
    const contextData = createContextData(undefined)

    beforeAll(() => {
      component = render(<SessionContext.Provider value={contextData}></SessionContext.Provider>)
    })

    it('should match snapshot', () => expect(component).toMatchSnapshot())
  })
})
