import { Paper, Stepper, Step, StepLabel, Typography } from '@mui/material'

import { useState, useEffect } from 'react'
import classes from './Checkout.module.css'
import { AddressForm, PaymentForm, OrderConfirmation } from '../../components'
import commerce from '../../lib/commerce'

const steps = ['Shipping address', 'Payment details']

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
      <AddressForm checkoutToken={checkoutToken} onNext={nextStep} />
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
    <>
      <main className={classes.temp}>
        <Paper>
          <Typography variant="h4" align="center">
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
          {/* instead of <Form/>, can use showForm() as well */}
        </Paper>
      </main>
    </>
  )
}
