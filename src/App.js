import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import commerce from './lib/commerce'
import ProductsPage from './layout/pages/Products'
import CartPage from './layout/pages/Cart'
import Layout from './layout/Layout'
import Checkout from './layout/pages/Checkout'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  async function fetchProducts() {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  async function fetchCart() {
    setCart(await commerce.cart.retrieve())
  }

  async function handleAddToCart(productId, quantity) {
    const newCartList = await commerce.cart.add(productId, quantity)
    setCart(newCartList)
  }

  async function handleUpdateCartQty(productId, quantity) {
    setCart(await commerce.cart.update(productId, { quantity }))
  }

  async function handleRemoveFromCart(productId) {
    setCart(await commerce.cart.remove(productId))
  }

  async function handleEmptyCart() {
    setCart(await commerce.cart.empty())
  }

  if (cart.length === 0 || products.length === 0) return

  return (
    <Layout totalItems={cart.total_items}>
      <Routes>
        <Route
          path="/"
          element={
            <ProductsPage products={products} onAddToCart={handleAddToCart} />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          }
        ></Route>
        <Route
          path="/checkout"
          element={<Checkout cart={cart} onEmptyCart={handleEmptyCart} />}
        ></Route>
      </Routes>
    </Layout>
  )
}

export default App
