import { useContext } from 'react'
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  ButtonGroup
} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { FavouriteContext } from '../store/favourites-context'
import { CartContext } from '../store/cart-context'

export default function Product({ product }) {
  const {
    cart,
    onAddToCart,
    onRemoveFromCart,
    onCheckInCart,
    onCheckInCartQty
  } = useContext(CartContext)
  const favouriteCtx = useContext(FavouriteContext)
  const isFavourite = favouriteCtx.checkIsFavourite(product.id)
  const isSoldOut = product.is.sold_out

  function toggleFavouriteBtn() {
    if (isFavourite) favouriteCtx.removeFavourite(product.id)
    else favouriteCtx.addFavourite(product)
  }

  function handleReduceQty() {
    const lineItemId = cart.line_items.find(
      (item) => item.product_id === product.id
    ).id

    if (onCheckInCartQty(product.id) === 1) onRemoveFromCart(lineItemId)
    else onAddToCart(product.id, '-1')
  }

  return (
    <Card sx={{ maxWidth: '100%', margin: '2px' }}>
      <CardMedia
        image={product.image.url}
        title={product.name}
        sx={{ pt: '56.25%' }}
      />
      <CardContent
        sx={{
          pl: '30px',
          pr: '30px',
          borderBottom: '1px solid lightgrey'
          // height: '190px'
        }}
      >
        <Box>
          <Typography
            gutterBottom
            sx={{ fontSize: '17px', fontWeight: 'bold', color: '#686868' }}
          >
            {product.name}
          </Typography>
          <Typography sx={{ fontSize: '15px', fontWeight: '300' }}>
            {product.price.formatted_with_symbol}
          </Typography>
        </Box>
        {/* <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
          sx={{ lineHeight: 1.2, margin: 0 }}
        /> */}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pl: '20px',
          pr: '20px'
        }}
      >
        <IconButton aria-label="Add to favorites" onClick={toggleFavouriteBtn}>
          {isFavourite ? (
            <FavoriteIcon color="warning" />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </IconButton>
        {isSoldOut ? (
          <Button variant="contained" disabled>
            SOLD OUT
          </Button>
        ) : onCheckInCart(product.id) ? (
          <ButtonGroup sx={{ mr: '-17px' }}>
            <Button
              variant="text"
              aria-label="reduce"
              onClick={handleReduceQty}
            >
              <ArrowLeftIcon fontSize="small" />
            </Button>
            <Button
              variant="contained"
              aria-label="reduce"
              style={{ borderRadius: '3px' }}
            >
              {onCheckInCartQty(product.id)}
            </Button>

            <Button
              variant="text"
              aria-label="increase"
              onClick={() => onAddToCart(product.id, 1)}
            >
              <ArrowRightIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant="outlined"
            startIcon={<AddShoppingCart />}
            aria-label="Add to Cart"
            onClick={() => onAddToCart(product.id, 1)}
          >
            Add
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
