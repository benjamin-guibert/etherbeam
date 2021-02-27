import React, { FC, useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import { User } from '../libraries/types'
import { SessionContext, useSessionContextValue } from './SessionContext'
import { ToastType, useToaster } from './toaster-helper'
import Header from './Header'
import Toaster from './Toaster'
import TokensPageWrapper from './blockchain/TokensPageWrapper'
import TokenPageWrapper from './blockchain/TokenPageWrapper'
import './App.scss'
import { initializeServerData } from 'libraries/server'

const serverData = initializeServerData()

const App: FC = () => {
  const [toasts, setToast] = useState<ToastType[]>([])
  const { addToast } = useToaster(toasts, setToast)
  const sessionContextValue = useSessionContextValue(serverData)
  const { initialize } = sessionContextValue

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <SessionContext.Provider value={sessionContextValue}>
      <BrowserRouter>
        <div className="my-app">
          <Header />
          <main className="my-app-main">
            <Switch>
              <Route path="/" exact></Route>
              <Route path="/tokens" exact>
                <TokensPageWrapper serverData={serverData} addToast={addToast} />
              </Route>
              <Route path="/tokens/:address" exact>
                <TokenPageWrapper serverData={serverData} addToast={addToast} />
              </Route>
            </Switch>
          </main>
          <Toaster toasts={toasts} />
        </div>
      </BrowserRouter>
    </SessionContext.Provider>
  )
}

export default hot(module)(App)
