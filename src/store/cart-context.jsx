import { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from '../store/auth-context'
import { FirestoreContext } from '../store/firestore-context'
import commerce from '../lib/commerce'

export const CartContext = createContext()
const LOCAL_STORAGE_KEY = 'lulu_cart_id'

export default function ProductsContextProvider(props) {
  const [cart, setCart] = useState([])
  const [newCartId, setNewCartId] = useState('')
  const { user } = useContext(AuthContext)
  const { handleSetDoc, getSingleUserData } = useContext(FirestoreContext)

  // console.log(cart)
  // useEffect(() => {
  //   fetchCart()
  // }, [])

  useEffect(() => {
    let retrievedCartId = null
    console.log(user)
    if (user) {
      retrievedCartId = getSingleUserData(user.uid).cart_id
      console.log(retrievedCartId)
    } else {
      retrievedCartId = JSON.parse(localStorage.getItem('lulu_cartId'))
    }

    if (retrievedCartId) fetchCart(retrievedCartId)
    else fetchNewCart()
  }, [user])

  useEffect(() => {
    if (cart.id) {
      if (user) {
        const singleUserRecord = getSingleUserData(user.uid)
        const newRecordObject = { ...singleUserRecord, cart_id: cart.id }

        handleSetDoc(user.uid, newRecordObject)
      } else {
        localStorage.setItem('lulu_cartId', JSON.stringify(cart.id))
      }
    }
  }, [cart.id, user])

  async function fetchCart(cart_id) {
    setCart(await commerce.cart.retrieve(cart_id))
  }

  async function fetchNewCart() {
    console.log('hi')
    setCart(await commerce.cart.refresh())
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
