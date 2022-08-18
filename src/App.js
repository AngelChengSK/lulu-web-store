import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { commerce } from './lib/commerce'
import ProductsPage from './layout/pages/Products'
import CartPage from './layout/pages/Cart'
import Layout from './layout/Layout'

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
        <Route path="/cart" element={<CartPage cart={cart} />}></Route>
      </Routes>
    </Layout>
  )
}

export default App
