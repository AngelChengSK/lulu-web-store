import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import CartContextProvider from './store/cart-context'
import CheckoutContextProvider from './store/checkout-context'
import FavouriteContextProvider from './store/favourites-context'
import SearchContextProvider from './store/search-context'
import AuthContextProvider from './store/auth-context'
import FirestoreContextProvider from './store/firestore-context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <FirestoreContextProvider>
      <AuthContextProvider>
        <SearchContextProvider>
          <FavouriteContextProvider>
            <CheckoutContextProvider>
              <CartContextProvider>
                <App />
              </CartContextProvider>
            </CheckoutContextProvider>
          </FavouriteContextProvider>
        </SearchContextProvider>
      </AuthContextProvider>
    </FirestoreContextProvider>
  </BrowserRouter>
)
