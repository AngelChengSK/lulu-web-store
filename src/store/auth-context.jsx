import { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signOut, deleteUser } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export default function AuthContextProvider(props) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user_) => {
      setUser(user_)
      setLoading(false)
      if (user) navigate('/profile')
    })
  }, [user])

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setUser(null)
        setLoading(false)
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
        setLoading(false)
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

  if (loading) return

  return (
    <AuthContext.Provider value={dataToShare}>
      {props.children}
    </AuthContext.Provider>
  )
}
