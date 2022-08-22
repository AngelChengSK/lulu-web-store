import { useContext } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  CssBaseline,
  Typography,
  // Slide,
  // useScrollTrigger,
  InputBase,
  Box
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { alpha } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import logo from '../../images/word-logo.jpg'
import { FavouriteContext } from '../../store/favourites-context'
import { SearchContext } from '../../store/search-context'

export default function Navbar({ totalItems }) {
  const location = useLocation()
  const navigate = useNavigate()

  const { favouriteItemsNumber } = useContext(FavouriteContext)
  const { searchInput, setSearchInput, handleClearSearch } =
    useContext(SearchContext)

  function handleSearch(e) {
    e.preventDefault()
    setSearchInput(e.target.value)
    e.target.value === '' ? navigate('/') : navigate('/search')
  }

  // function HideOnScroll({ children }) {
  //   const trigger = useScrollTrigger()

  //   return (
  //     <Slide appear={false} direction="down" in={!trigger}>
  //       {children}
  //     </Slide>
  //   )
  // }

  return (
    <>
      <CssBaseline />
      {/* <HideOnScroll> */}
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ boxShadow: '0 0 5px 1px lightgrey' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            height: '30px'
          }}
        >
          <Typography
            component={Link}
            to="/"
            sx={{
              height: '55%',
              '&:hover': {
                opacity: '0.7'
              }
            }}
            onClick={handleClearSearch}
          >
            <img src={logo} alt="logo" height="100%" />
          </Typography>

          <Box
            sx={{
              position: 'relative',
              borderRadius: '50px',
              backgroundColor: alpha(grey[400], 0.15),
              '&:hover': {
                backgroundColor: alpha(grey[400], 0.2)
              },
              marginLeft: 'auto',
              marginRight: '10px'
            }}
          >
            <Box
              sx={(theme) => ({
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              })}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchInput}
              onChange={handleSearch}
              sx={(theme) => ({
                color: 'inherit',
                '& .MuiInputBase-input': {
                  padding: theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create('width'),
                  width: '100%',
                  [theme.breakpoints.up('sm')]: {
                    width: '20ch',
                    '&:focus': {
                      width: '30ch'
                    }
                  }
                }
              })}
            ></InputBase>
            {searchInput !== '' && (
              <IconButton
                aria-label="clear"
                size="small"
                sx={{ mr: '10px' }}
                onClick={handleClearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {location.pathname !== '/favourite' && (
            <IconButton
              component={Link}
              to="/favourite"
              aria-label="Show favourite items"
              color="inherit"
              onClick={handleClearSearch}
            >
              {favouriteItemsNumber > 0 ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
          )}
          {location.pathname !== '/cart' && (
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
              onClick={handleClearSearch}
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {/* </HideOnScroll> */}
    </>
  )
}
