import { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export default function AuthContextProvider(props) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)

      // if (user) {
      //   navigate('/')
      // }
    })
  }, [navigate, user])

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const dataToShare = {
    user: user,
    setUser: setUser,
    handleLogout: handleLogout
  }

  return (
    <AuthContext.Provider value={dataToShare}>
      {props.children}
    </AuthContext.Provider>
  )
}
