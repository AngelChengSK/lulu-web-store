import { useContext } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material'
import Divider from '@mui/material/Divider'
import { CheckoutContext } from '../../store/checkout-context'

export default function OrderSummary({ checkoutToken }) {
  const CheckoutCtx = useContext(CheckoutContext)

  return (
    <>
      <Typography variant="h6" sx={{ mt: '40px', fontWeight: 'bold' }}>
        Order summary
      </Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) => (
          <ListItem style={{ padding: '10px 0' }} key={product.name}>
            <ListItemAvatar>
              <Avatar alt={product.name} src={product.image.url} />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <Divider sx={{ margin: '10px 0 20px' }} />
        <ListItem sx={{ padding: 0, fontWeight: 'light' }}>
          <ListItemText secondary="Subtotal" />
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {checkoutToken.total.formatted_with_symbol}
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: 0, fontWeight: 'light' }}>
          <ListItemText
            secondary={`Shipping fee - ${CheckoutCtx.shippingCountry}`}
          />
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {CheckoutCtx.shippingFee.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: '20px 0', fontWeight: 'light' }}>
          <ListItemText primary="Total" />
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            {(checkoutToken.total.raw + CheckoutCtx.shippingFee).toLocaleString(
              'en-US',
              {
                style: 'currency',
                currency: 'USD'
              }
            )}
          </Typography>
        </ListItem>
      </List>
    </>
  )
}
