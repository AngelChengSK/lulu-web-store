import { createContext, useState } from 'react'

export const CheckoutContext = createContext()

export default function CheckoutContextProvider(props) {
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingFee, setShippingFee] = useState('')

  function handleStoreShippingCounty(country) {
    setShippingCountry(country)
  }

  function handleStoreShippingFee(fee) {
    setShippingFee(fee)
  }

  const dataToShare = {
    shippingCountry: shippingCountry,
    shippingFee: shippingFee,
    storeShippingFee: handleStoreShippingFee,
    storeShippingCounty: handleStoreShippingCounty
  }

  return (
    <CheckoutContext.Provider value={dataToShare}>
      {props.children}
    </CheckoutContext.Provider>
  )
}
