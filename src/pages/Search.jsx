import { useContext } from 'react'
import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  IconButton
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { SearchContext } from '../store/search-context'
import Product from '../components/Product'
import Suggestion from '../components/Suggestion'

export default function Search({ products }) {
  const { searchInput, setSearchInput, handleClearSearch } =
    useContext(SearchContext)

  const searchResult = products.filter((item) =>
    // item.description.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  function handleSearch(e) {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  function renderEmptyResult() {
    return <Box>No results found.</Box>
  }

  function renderResult() {
    return (
      <Grid container justify="center" spacing={4}>
        {searchResult.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product key={product.id} product={product}></Product>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Container sx={{ margin: '100px auto', width: '100%' }}>
      <TextField
        fullWidth
        hiddenLabel
        variant="filled"
        size="small"
        placeholder="Search"
        value={searchInput}
        sx={(theme) => ({
          m: '-20px 0 30px',
          [theme.breakpoints.up('sm')]: {
            display: 'none'
          }
        })}
        onChange={handleSearch}
      />

      <Typography variant="h5" sx={{ mb: '30px' }}>
        Search result(s) for "
        <span style={{ fontWeight: 'bold' }}>{searchInput}</span>"
      </Typography>
      {searchResult.length > 0 ? renderResult() : renderEmptyResult()}
      <Suggestion products={products} listToExculde={searchResult} />
    </Container>
  )
}
