import { Typography, Divider, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
  return (
    <>
      <div>
        <Typography variant="h5">Your order is complete!</Typography>
        <Divider />
        <Typography variant="subtitle1">
          Thank you for your purchase.
        </Typography>
        <Typography variant="subtitle1">
          You will be receiving a confirmation email with order details.
        </Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Continue shopping
      </Button>
    </>
  )
}
