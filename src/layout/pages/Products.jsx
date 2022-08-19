import { Grid } from '@mui/material'
import Product from '../../components/Product'

export default function ProductsPage({ products, onAddToCart }) {
  return (
    <section>
      <Grid container justify="center" spacing={4} sx={{ padding: '0 30px 0' }}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </section>
  )
}
