import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia
} from '@mui/material'

export default function CartItem({ item, onUpdateCartQty, onRemoveFromCart }) {
  return (
    <Card >
      <CardMedia
        image={item.image.url}
        alt={item.name}
        sx={{ height: 0, paddingTop: '56.25%' }}
        // need to specify the height in order to display
      />
      <CardContent >
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions >
        <div>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => onRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  )
}
