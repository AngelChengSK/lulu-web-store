import { createContext, useState, useEffect } from 'react'
import commerce from '../lib/commerce'

export const CartContext = createContext()

export default function ProductsContextProvider(props) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetchCart()
  }, [])

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

  function handleCheckInCart(productId) {
    return cart.line_items.some((item) => item.product_id === productId)
  }

  function handleCheckInCartQty(productId) {
    const target = cart.line_items.find((item) => item.product_id === productId)
    return target.quantity
  }

  const dataToShare = {
    cart: cart,
    onAddToCart: handleAddToCart,
    onUpdateCartQty: handleUpdateCartQty,
    onRemoveFromCart: handleRemoveFromCart,
    onEmptyCart: handleEmptyCart,
    onCheckInCart: handleCheckInCart,
    onCheckInCartQty: handleCheckInCartQty
  }

  return (
    <CartContext.Provider value={dataToShare}>
      {props.children}
    </CartContext.Provider>
  )
}
