import { createContext, useState, useEffect } from 'react'

export const FavouriteContext = createContext()
const LOCAL_STORAGE_KEY = 'lulu_favouriteList'

export default function FavouriteContextProvider(props) {
  const [favouriteList, setFavouriteList] = useState([])

  useEffect(() => {
    const retrievedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (retrievedList) {
      setFavouriteList(retrievedList)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favouriteList))
  }, [favouriteList])

  function handleAddFavourite(product) {
    setFavouriteList((prevState) => {
      return prevState.concat(product)
    })
  }

  function handleRemoveFavourite(productId) {
    setFavouriteList((prevState) => {
      return prevState.filter((item) => item.id !== productId)
    })
  }

  function handleEmptyFavourites() {
    setFavouriteList([])
  }

  function handleCheckFavourite(productId) {
    // console.log(favouriteList)
    if (favouriteList.length === 0) return false
    return favouriteList.some((item) => item.id === productId)
  }

  const dataToShare = {
    favouriteList: favouriteList,
    favouriteItemsNumber: favouriteList.length,
    addFavourite: handleAddFavourite,
    removeFavourite: handleRemoveFavourite,
    checkIsFavourite: handleCheckFavourite,
    emptyFavourites: handleEmptyFavourites
  }

  return (
    <FavouriteContext.Provider value={dataToShare}>
      {props.children}
    </FavouriteContext.Provider>
  )
}
