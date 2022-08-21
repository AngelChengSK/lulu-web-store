import {
  // Grid,
  Container,
  // Card,
  // CardMedia,
  // Box,
  Typography
} from '@mui/material'
// import Product from '../../components/Product'

export default function Suggestion(products) {
  return (
    <Container maxWidth="md" sx={{ margin: '100px auto' }}>
      <Typography variant="h5">You May Also Like</Typography>
      {products.map((item) => {
        return <div>{item.name}</div>
      })}
    </Container>
  )
}
