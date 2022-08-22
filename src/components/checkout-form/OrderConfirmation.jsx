import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners/'
import { Typography, Divider, Button, Container, Box } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'

export default function OrderConfirmation() {
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 2000)

  function Loading() {
    return (
      <Box sx={{ textAlign: 'center', margin: '100px 0' }}>
        <ScaleLoader color="silver" height="25px" />
      </Box>
    )
  }
  function Confirmation() {
    return (
      <Container sx={{ textAlign: 'center', padding: '20px 0' }}>
        <ReceiptIcon sx={{ fontSize: '80px', margin: '30px 0' }} />
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
          Your order is complete!
        </Typography>
        <Divider sx={{ margin: '20px 0' }} />
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'light', margin: '' }}
        >
          Thank you for your purchase.
          <br />
          You will be receiving a confirmation email with order details.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          type="button"
          sx={{ mt: '30px' }}
        >
          Continue shopping
        </Button>
      </Container>
    )
  }

  return <>{loading ? <Loading /> : <Confirmation />}</>
}
