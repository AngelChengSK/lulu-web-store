import { Grid, Container, Card, CardMedia } from '@mui/material'
import Product from '../../components/Product'

import photo1 from '../../images/gallery_1.jpg'

export default function ProductsPage({
  cart,
  products,
  onAddToCart,
  onCheckInCart,
  onCheckInCartQty,
  onRemoveFromCart
}) {
  return (
    <Container sx={{ margin: '120px auto' }}>
      <Card sx={{ mb: '70px' }}>
        <CardMedia
          component="img"
          height="500"
          image={photo1}
          alt="beach party series"
        />
      </Card>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
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
