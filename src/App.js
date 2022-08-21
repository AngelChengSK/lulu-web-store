import { useState, useEffect, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import commerce from './lib/commerce'

import ProductsPage from './layout/pages/Products'
import SearchPage from './layout/pages/Search'
import FavouritePage from './layout/pages/Favourite'
import CartPage from './layout/pages/Cart'

import Layout from './layout/Layout'
import Checkout from './layout/pages/Checkout'

import { CartContext } from './store/cart-context'

function App() {
  const [products, setProducts] = useState([])
  const { cart, onEmptyCart } = useContext(CartContext)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  if (cart.length === 0 || products.length === 0) return

  return (
    <Layout totalItems={cart.total_items}>
      <Routes>
        <Route path="/" element={<ProductsPage products={products} />}></Route>
        <Route
          path="/search"
          element={<SearchPage products={products} />}
        ></Route>
        <Route path="/favourite" element={<FavouritePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route
          path="/checkout"
          element={<Checkout cart={cart} onEmptyCart={onEmptyCart} />}
        ></Route>
      </Routes>
    </Layout>
  )
}

export default App
