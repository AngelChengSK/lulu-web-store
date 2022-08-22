import { Box, Typography } from '@mui/material'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import Product from '../components/Product'

export default function Suggestion({ products, listToExculde }) {
  const productIdToExclude = listToExculde.map((item) => item.id)
  const suggestionList = products.filter(
    (item) => !productIdToExclude.includes(item.id)
  )

  return (
    <Box sx={{ margin: '100px auto' }}>
      <Typography variant="h5" sx={{ mb: '30px' }}>
        {listToExculde.length > 0 ? 'You May Also Like' : 'Popular Items'}
      </Typography>
      <Splide
        aria-label="recommondation"
        options={{
          fixedWidth: '230px',
          gap: '20px',
          arrows: false,
          pagination: false,
          pauseOnHover: true,
          rewind: true
        }}
      >
        {suggestionList.map((product) => (
          <SplideSlide key={product.id}>
            <Product product={product} />
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  )
}
