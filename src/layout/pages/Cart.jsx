import { Link } from 'react-router-dom'
import { Container, Typography, Button, Grid } from '@mui/material'
import classes from './Cart.module.css'
import Product from '../../components/Product'

export default function CartPage({ cart }) {
  function renderEmptyCart() {
    return (
      <>
        <Typography variant="subtitle1">
          You have no items in your shopping cart
        </Typography>
        <Typography>
          <Link to="/">
            start adding some
          </Link>
        </Typography>
      </>
    )
  }

  function renderCart() {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((lineItem) => (
            <Grid item xs={12} sm={4} key={lineItem.id}>
              <Product product={lineItem} />
            </Grid>
          ))}
        </Grid>
        <div>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              size="large"
              type="button"
              variant="contained"
              color="secondary"
            >
              Empty cart
            </Button>
            <Button
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
      </>
    )
  }

  return (
    <Container className={classes.temp}>
      <Typography variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {cart.total_items === 0 ? renderEmptyCart() : renderCart()}
    </Container>
  )
}