import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  // MenuItem,
  // Menu,
  Typography
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'

// import logo from ''
// import classes from './Navbar.module.css'

export default function Navbar({ totalItems }) {
  const location = useLocation()

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component={Link} to="/" variant="h6" color="inherit">
            {/* <img
              src="#"
              alt="logo"
              height="25px"
              className={classes.image}
            />{' '} */}
            Lulu eShop
          </Typography>
          {location.pathname === '/' && (
            <div>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}
