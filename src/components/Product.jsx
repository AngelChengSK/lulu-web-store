import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share';

export default function Product({ product, onAddToCart }) {
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardMedia
        image={product.image.url}
        title={product.name}
        sx={{pt:"56.25%"}}
      />
      <CardContent sx={{pl:"30px", pr:"30px", borderBottom:'1px solid lightgrey', height: '190px'}}>
        <div >
          <Typography gutterBottom sx={{fontSize: '18px'}}>
            {product.name}
          </Typography>
          <Typography sx={{fontSize: '16px', fontWeight: 'bold', mb:4}}>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
          sx={{ lineHeight: 1.2, margin:0}}
        />
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'space-between', pl:"30px", pr:"30px" }}
      >
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" sx={{ml: 2, mr:'auto'}}>
          <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="Add to Cart"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  )
}
