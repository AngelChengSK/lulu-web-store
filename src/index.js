import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import CheckoutContextProvider from './store/checkout-context'
import FavouriteContextProvider from './store/favourites-context'
import SearchContextProvider from './store/search-context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <SearchContextProvider>
      <FavouriteContextProvider>
        <CheckoutContextProvider>
          <App />
        </CheckoutContextProvider>
      </FavouriteContextProvider>
    </SearchContextProvider>
  </BrowserRouter>
)
