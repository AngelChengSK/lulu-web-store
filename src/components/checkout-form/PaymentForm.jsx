import { Typography, Button, Divider } from '@mui/material'
import {
  Elements,
  CardElement,
  ElementsConsumer
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSummary from './OrderSummary'

const stripePromise = loadStripe('/')

export default function PaymentForm({
  checkoutToken,
  onNext,
  onBack,
  onEmptyCart
}) {
  function handleSubmit() {
    onNext()
    onEmptyCart()
  }

  return (
    <>
      <OrderSummary checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
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
                  Pay {checkoutToken.total.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}
