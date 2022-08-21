import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Paper
} from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { CartContext } from '../store/cart-context'
import { useContext } from 'react'

export default function CartItem({ item }) {
  const { onUpdateCartQty, onRemoveFromCart } = useContext(CartContext)

  return (
    <>
      <Card
        sx={{
          height: '150px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <CardMedia
          image={item.image.url}
          alt={item.name}
          sx={{ width: '40%', flexShrink: 0 }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <CardContent
            sx={{
              pb: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography sx={{ fontSize: '18px' }}>{item.name}</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              {item.line_total.formatted_with_symbol}
            </Typography>
          </CardContent>
          <CardActions
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Button
                type="button"
                size="small"
                onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
                sx={{ fontSize: '18px', padding: 0 }}
                disabled={item.quantity === 1}
              >
                -
              </Button>
              <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
              <Button
                type="button"
                size="small"
                onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
                sx={{ fontSize: '18px', padding: 0 }}
              >
                +
              </Button>
            </div>

            <IconButton onClick={() => onRemoveFromCart(item.id)}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </CardActions>
        </div>
      </Card>

      <Paper></Paper>
    </>
  )
}
