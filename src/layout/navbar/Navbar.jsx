import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  CssBaseline,
  Typography,
  Slide,
  useScrollTrigger,
  InputBase
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../images/word-logo.jpg'
// import classes from './Navbar.module.css'

export default function Navbar({ totalItems }) {
  const location = useLocation()

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: alpha(grey[400], 0.15),
    '&:hover': {
      backgroundColor: alpha(grey[400], 0.2)
    },
    marginLeft: 'auto',
    marginRight: '20px',
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '15ch',
        '&:focus': {
          width: '30ch'
        }
      }
    }
  }))

  function HideOnScroll({ children }) {
    const trigger = useScrollTrigger()

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    )
  }

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <AppBar position="fixed" color="inherit">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px', height:"30px", boxShadow: "red"}}>
            <Typography component={Link} to="/" sx={{height:"55%"}}>
              <img src={logo} alt="logo" height="100%" />
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <div>
              <IconButton
                component={Link}
                to="/favourite"
                aria-label="Show favourite items"
                color="inherit"
              >
                  <FavoriteIcon />
              </IconButton>
            </div>

            {location.pathname === '/' && (
              <div>
                <IconButton
                  component={Link}
                  to="/cart"
                  aria-label="Show cart items"
                  color="inherit"
                >
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </div>
            )}

          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  )
}
