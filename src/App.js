import { useState, useEffect, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import commerce from './lib/commerce'
import {
  ProductsPage,
  SearchPage,
  FavouritePage,
  CartPage,
  CheckoutPage
} from './layout/pages'
import Layout from './layout/Layout'
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
        <Route
          path="/favourite"
          element={<FavouritePage products={products} />}
        ></Route>
        <Route path="/cart" element={<CartPage products={products} />}></Route>
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} onEmptyCart={onEmptyCart} />}
        ></Route>
      </Routes>
    </Layout>
  )
}

export default App
