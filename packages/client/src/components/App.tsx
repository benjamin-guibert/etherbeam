import React, { ReactElement, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Toaster, { ToastContent } from './Toaster'
import NavigationBar from './NavigationBar'
import TokensPage from './modules/blockchain/TokensPage'
import TokenPage from './modules/blockchain/TokenPage'

const App = (): ReactElement => {
  const [toasts, setToasts] = useState<ToastContent[]>([])

  const addToast = (toast: ToastContent) => {
    setToasts((oldToasts) => [toast, ...oldToasts].slice(0, 5))
  }

  return (
    <BrowserRouter>
      <div>
        <header>
          <NavigationBar />
        </header>
        <Container>
          <Switch>
            <Route path="/" exact></Route>
            <Route path="/tokens" exact>
              <TokensPage addToast={addToast} />
            </Route>
            <Route path="/tokens/:address" exact>
              <TokenPage addToast={addToast} />
            </Route>
          </Switch>
        </Container>
        <Toaster toasts={toasts} />
      </div>
    </BrowserRouter>
  )
}

export default hot(module)(App)
