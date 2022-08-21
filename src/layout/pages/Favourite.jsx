import { useContext } from 'react'
import { Grid, Container, Typography } from '@mui/material'
import Product from '../../components/Product'

import { FavouriteContext } from '../../store/favourites-context'

export default function Favourite({
  cart,
  products,
  onAddToCart,
  onCheckInCart,
  onCheckInCartQty,
  onRemoveFromCart
}) {
  const favouriteCtx = useContext(FavouriteContext)

  return (
    <Container sx={{ margin: '100px auto', width: '100%' }}>
      <Typography variant="h5" sx={{ mb: '30px' }}>
        Your Favourite(s)
      </Typography>
      <Grid container justify="center" spacing={4}>
        {favouriteCtx.favouriteList.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Product
              cart={cart}
              product={product}
              onAddToCart={onAddToCart}
              onCheckInCart={onCheckInCart}
              onCheckInCartQty={onCheckInCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
