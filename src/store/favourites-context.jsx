import { createContext, useState } from 'react'

export const FavouriteContext = createContext()

export default function FavouriteContextProvider(props) {
  const [favouriteList, setFavouriteList] = useState([])

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
    checkIsFavourite: handleCheckFavourite
  }

  return (
    <FavouriteContext.Provider value={dataToShare}>
      {props.children}
    </FavouriteContext.Provider>
  )
}
