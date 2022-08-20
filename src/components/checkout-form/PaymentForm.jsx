import { useContext } from 'react'
import { Typography, Button, Divider } from '@mui/material'
import {
  Elements,
  CardElement,
  ElementsConsumer
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSummary from './OrderSummary'

import { CheckoutContext } from '../../store/checkout-context'

const stripePromise = loadStripe('/')

export default function PaymentForm({
  checkoutToken,
  onNext,
  onBack,
  onEmptyCart
}) {
  const CheckoutCtx = useContext(CheckoutContext)

  function handleSubmit() {
    onNext()
    onEmptyCart()
  }

  return (
    <>
      <OrderSummary checkoutToken={checkoutToken} />
      <Divider />
      <Typography
        variant="h6"
        gutterBottom
        style={{ margin: '30px 0 20px', fontWeight: 'bold' }}
      >
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form>
              <CardElement />
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={onBack}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                  onClick={handleSubmit}
                >
                  Pay{' '}
                  {(
                    checkoutToken.total.raw + CheckoutCtx.shippingFee
                  ).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}
