import { useNavigate } from 'react-router-dom'
import { createContext, useState } from 'react'

export const SearchContext = createContext()

export default function SearchContextProvider(props) {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  function handleClearSearch() {
    setSearchInput('')
    navigate('/')
  }

  const dataToShare = {
    searchInput: searchInput,
    setSearchInput: setSearchInput,
    handleClearSearch: handleClearSearch
  }

  return (
    <SearchContext.Provider value={dataToShare}>
      {props.children}
    </SearchContext.Provider>
  )
}
