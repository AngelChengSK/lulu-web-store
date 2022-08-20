import { Link } from 'react-router-dom'
import { Container, Typography, Button, Grid, Stack } from '@mui/material'
import CartItem from '../../components/CartItem'

export default function CartPage({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onEmptyCart
}) {
  function renderEmptyCart() {
    return (
      <>
        <Typography variant="subtitle1">
          You have no items in your shopping cart
        </Typography>
        <Typography>
          <Link to="/">start adding some</Link>
        </Typography>
      </>
    )
  }

  function renderCart() {
    return (
      <section>
        <Stack spacing={3}>
          {cart.line_items.map((lineItem) => (
            <Grid item xs={12} sm={4} key={lineItem.id}>
              <CartItem
                item={lineItem}
                onUpdateCartQty={onUpdateCartQty}
                onRemoveFromCart={onRemoveFromCart}
              />
            </Grid>
          ))}
        </Stack>
        <div
          style={{
            height: '1px',
            backgroundColor: 'lightgrey',
            margin: '30px 0'
          }}
        />
        <div style={{ marginTop: '20px' }}>
          <Typography variant="subtitle1" gutterBottom>
            Subtotal:
            <span style={{ float: 'right', fontWeight: 'bold' }}>
              {cart.subtotal.formatted_with_symbol}
            </span>
          </Typography>
          <Typography variant="subtitle1">
            Shipping fee:
            <span style={{ float: 'right', fontWeight: '300' }}>
              To be determined
            </span>
          </Typography>
          <div
            style={{
              height: '1px',
              backgroundColor: 'lightgrey',
              margin: '30px 0'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="large"
              type="button"
              variant="outlined"
              color="secondary"
              onClick={onEmptyCart}
            >
              Empty cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mb: '30px' }}>
        Your Shopping Cart
      </Typography>
      {cart.total_items === 0 ? renderEmptyCart() : renderCart()}
    </Container>
  )
}
