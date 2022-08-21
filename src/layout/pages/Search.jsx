import { useContext } from 'react'
import { Grid, Container, Typography, Box } from '@mui/material'
import Product from '../../components/Product'

import { SearchContext } from '../../store/search-context'

export default function Search({
  cart,
  products,
  onAddToCart,
  onCheckInCart,
  onCheckInCartQty,
  onRemoveFromCart
}) {
  const { searchInput } = useContext(SearchContext)

  const searchResult = products.filter(
    (item) =>
      item.description.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  function renderEmptyResult() {
    return <Box>No results found.</Box>
  }

  function renderResult() {
    return (
      <Grid container justify="center" spacing={4}>
        {searchResult.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product
              key={product.id}
              cart={cart}
              product={product}
              onAddToCart={onAddToCart}
              onCheckInCart={onCheckInCart}
              onCheckInCartQty={onCheckInCartQty}
              onRemoveFromCart={onRemoveFromCart}
            ></Product>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Container sx={{ margin: '100px auto', width: '100%' }}>
      <Typography variant="h5" sx={{ mb: '30px' }}>
        Search result(s) for "
        <span style={{ fontWeight: 'bold' }}>{searchInput}</span>"
      </Typography>
      {searchResult.length > 0 ? renderResult() : renderEmptyResult()}
    </Container>
  )
}
