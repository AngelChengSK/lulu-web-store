import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import CheckoutContextProvider from './store/checkout-context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CheckoutContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CheckoutContextProvider>
)
