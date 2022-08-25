import { collection, getDocs } from 'firebase/firestore'
import { createContext, useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

export const FirestoreContext = createContext()

export default function FirestoreContextProvider(props) {
  const [userMasterList, setUserMasterList] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    let userList = []

    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        userList.push({ id: doc.id, ...doc.data() })
      })

      setUserMasterList(userList)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSetDoc(userId, newDataObject) {
    await setDoc(doc(db, 'users', userId), {
      ...newDataObject
    })
    fetchData()
  }

  const dataToShare = {
    userMasterList: userMasterList,
    handleSetDoc: handleSetDoc
  }

  if (!userMasterList) return

  return (
    <FirestoreContext.Provider value={dataToShare}>
      {props.children}
    </FirestoreContext.Provider>
  )
}
