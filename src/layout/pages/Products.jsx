import { Grid, Container } from '@mui/material'
import Product from '../../components/Product'

export default function ProductsPage({ products, onAddToCart }) {
  return (
    <Container sx={{ margin: '100px auto' }}>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
