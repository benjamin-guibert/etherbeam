import React, { ReactElement } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import TokensPage from 'layout/blockchain/TokensPage'
import TokenPage from 'layout/blockchain/TokenPage'
import './App.scss'

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <div className="my-app">
        <Header />
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/tokens" exact>
            <TokensPage />
          </Route>
          <Route path="/tokens/:address" exact>
            <TokenPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default hot(module)(App)
