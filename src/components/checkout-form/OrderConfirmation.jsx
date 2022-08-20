import { Typography, Divider, Button, Container } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
  return (
    <Container sx={{ textAlign: 'center', padding: '20px 0' }}>
      <ReceiptIcon sx={{ fontSize: '80px', margin: '30px 0' }} />
      <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
        Your order is complete!
      </Typography>
      <Divider sx={{ margin: '20px 0' }} />
      <Typography variant="subtitle2" sx={{ fontWeight: 'light', margin: '' }}>
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
