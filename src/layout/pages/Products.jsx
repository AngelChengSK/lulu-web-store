import { Grid } from '@mui/material'
import Product from '../../components/Product'

import classes from './Products.module.css'

export default function ProductsPage({products, onAddToCart}) {
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}
