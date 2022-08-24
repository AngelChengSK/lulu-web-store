import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container
} from '@mui/material'

import { useState, useEffect } from 'react'
import { ShippingForm, PaymentForm, OrderConfirmation } from '../components'
import commerce from '../lib/commerce'

const steps = ['Shipping details', 'Payment details']

export default function Checkout({ cart, onEmptyCart }) {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)

  function backStep() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  function nextStep() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  useEffect(() => {
    if (cart.line_items.length) {
      commerce.checkout
        .generateToken(cart.id, { type: 'cart' })
        .then((token) => {
          setCheckoutToken(token)
        })
        .catch((error) => {
          console.log('There was an error in generating a token', error)
        })
    }
  }, [cart])

  function Form() {
    return activeStep === 0 ? (
      <ShippingForm checkoutToken={checkoutToken} onNext={nextStep} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        onNext={nextStep}
        onBack={backStep}
        onEmptyCart={onEmptyCart}
      />
    )
  }

  if (!checkoutToken) return

  return (
    <Container maxWidth="sm" sx={{ margin: '30px auto' }}>
      <Paper sx={{ padding: '25px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? <OrderConfirmation /> : <Form />}
      </Paper>
    </Container>
  )
}
