import React, { FC } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import TokensPageWrapper from './blockchain/TokensPageWrapper'
import TokenPageWrapper from './blockchain/TokenPageWrapper'
import './App.scss'

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="my-app">
        <Header />
        <main className="my-app-main">
          <Switch>
            <Route path="/" exact></Route>
            <Route path="/tokens" exact>
              <TokensPageWrapper />
            </Route>
            <Route path="/tokens/:address" exact>
              <TokenPageWrapper />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default hot(module)(App)
