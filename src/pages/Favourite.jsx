import { useContext } from 'react'
import { Grid, Container, Typography, Button, Box } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'

import Product from '../components/Product'

import { FavouriteContext } from '../store/favourites-context'
import Suggestion from '../components/Suggestion'

export default function Favourite({ products }) {
  const { favouriteList, emptyFavourites } = useContext(FavouriteContext)

  function renderFavourite() {
    return (
      <Grid container justify="center" spacing={4}>
        {favouriteList.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    )
  }

  function renderEmptyFavourite() {
    return (
      <>
        <Typography sx={{ fontWeight: 'bold' }}>
          You have no favourite item.
        </Typography>
        <Typography sx={{ fontWeight: 'light' }}>
          Keep track of the products your're interested in by clicking the{' '}
          <FavoriteBorderOutlinedIcon sx={{ fontSize: '16px' }} /> icon.
        </Typography>
      </>
    )
  }

  return (
    <Container sx={{ margin: '100px auto', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '30px'
        }}
      >
        <Typography variant="h5">Your Favourite(s)</Typography>
        {favouriteList.length > 0 && (
          <Button
            size="small"
            type="button"
            variant="outlined"
            color="secondary"
            onClick={emptyFavourites}
          >
            Empty Favourites
          </Button>
        )}
      </Box>
      {favouriteList.length > 0 ? renderFavourite() : renderEmptyFavourite()}
      <Suggestion products={products} listToExculde={favouriteList} />
    </Container>
  )
}
