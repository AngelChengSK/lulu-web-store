import {
  Grid,
  Container,
  Card,
  CardMedia
  // Box,
  // Typography
} from '@mui/material'
import Product from '../../components/Product'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

// import logo from '../../images/logo.jpg'
import photo1 from '../../images/gallery_1.jpg'
import photo2 from '../../images/gallery_2.jpg'

export default function ProductsPage({ products }) {
  return (
    <Container sx={{ margin: '120px auto' }}>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            height: '120px',
            filter: 'opacity(0.6) drop-shadow(0 0 0 blue)'
          }}
        />
        <Typography variant="h2" gutterBottom>Lulu The Piggy</Typography>
      </Box> */}
      <Splide
        aria-label="popular series"
        options={{
          pagination: false,
          autoplay: true,
          interval: 5000,
          pauseOnHover: true
        }}
      >
        <SplideSlide>
          <Card
            sx={{ width: '85%', margin: '0 auto 70px', borderRadius: '15px' }}
          >
            <CardMedia
              component="img"
              height="500"
              image={photo1}
              alt="original series 2"
              sx={{ borderRadius: '15px' }}
            />
          </Card>
        </SplideSlide>
        <SplideSlide>
          <Card
            sx={{ width: '80%', margin: '0 auto 70px', borderRadius: '15px' }}
          >
            <CardMedia
              component="img"
              height="500"
              image={photo2}
              alt="journey to the west series"
              sx={{ borderRadius: '15px' }}
            />
          </Card>
        </SplideSlide>
      </Splide>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
