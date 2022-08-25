import { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from '../store/auth-context'
import { FirestoreContext } from '../store/firestore-context'

export const FavouriteContext = createContext()
const LOCAL_STORAGE_KEY = 'lulu_favouriteList'

export default function FavouriteContextProvider(props) {
  const [favouriteList, setFavouriteList] = useState([])
  const { user } = useContext(AuthContext)
  const { handleSetDoc, getSingleUserData } = useContext(FirestoreContext)

  useEffect(() => {
    let retrievedList = []
    if (user) {
      retrievedList = getSingleUserData(user.uid).favourites
    } else {
      retrievedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    }

    if (retrievedList) {
      setFavouriteList(retrievedList)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      const singleUserRecord = getSingleUserData(user.uid)
      const newRecordObject = { ...singleUserRecord, favourites: favouriteList }

      handleSetDoc(user.uid, newRecordObject)
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favouriteList))
    }
  }, [user, favouriteList])

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
