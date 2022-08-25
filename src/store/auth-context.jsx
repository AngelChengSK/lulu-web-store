import { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signOut, deleteUser } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export default function AuthContextProvider(props) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      navigate('/profile')
    })
  }, [])

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setUser(null)
        navigate('/')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  function handleDelete() {
    const user = auth.currentUser

    deleteUser(user)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const dataToShare = {
    user: user,
    setUser: setUser,
    handleLogout: handleLogout,
    handleDeleteAuth: handleDelete
  }

  return (
    <AuthContext.Provider value={dataToShare}>
      {props.children}
    </AuthContext.Provider>
  )
}
