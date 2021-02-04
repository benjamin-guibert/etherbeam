import React, { FC } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import TokensPageWrapper from './blockchain/TokensPageWrapper'
import './App.scss'

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="my-app">
        <Header />
        <main className="my-page-main my-mw-s"></main>
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/tokens" exact>
            <TokensPageWrapper />
          </Route>
          {/* <Route path="/tokens/:address" exact>
            <TokenPage />
          </Route> */}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default hot(module)(App)
