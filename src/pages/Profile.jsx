import { useState, useContext, useEffect } from 'react'
import { Card, Container } from '@mui/material'
import { AuthContext } from '../store/auth-context'
import { FirestoreContext } from '../store/firestore-context'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [currentUserData, setCurrentUserData] = useState([])
  const [values, setValues] = useState([])
  const { user, handleDeleteAuth } = useContext(AuthContext)
  const { getSingleUserData, handleSetDoc } = useContext(FirestoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) getCurrentUserData()
  }, [user])

  useEffect(() => {
    if (currentUserData) setValues(currentUserData)
  }, [currentUserData])

  async function getCurrentUserData() {
    const targetRecord = getSingleUserData(user.uid)

    // // create record in db for google user who log in for the first time
    // if (!targetRecord) {
    //   await setDoc(doc(db, 'users', user.uid), {
    //     displayName: user.displayName,
    //     email: user.email,
    //     favourites: [],
    //     cart: []
    //   })
    //   // refresh the page to load the db again
    //   window.location.reload(false)
    // }

    setCurrentUserData(targetRecord)
  }

  async function handleDeleteAccount() {
    await deleteDoc(doc(db, 'users', user.uid))
    setCurrentUserData([])
    handleDeleteAuth()
    navigate('/login')
  }

  function handleUpdateProfile() {
    handleSetDoc(user.uid, values)
  }

  function handleInput(e) {
    const id = e.target.id
    const value = e.target.value
    setValues((prevValues) => ({ ...prevValues, [id]: value }))
  }

  if (currentUserData.length === 0 || values.length === 0) return

  return (
    <Container maxWidth="xs" sx={{ margin: '100px auto' }}>
      <Card
        sx={{
          textAlign: 'center',
          padding: '40px 50px',
          display: 'flex',
          flexDirection: 'Column',
          gap: '20px'
        }}
      >
        <div>{`hello, ${user.email}`}</div>

        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            type="text"
            value={values.firstname || ''}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            type="text"
            value={values.lastname || ''}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={values.email || ''} disabled />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            value={values.phone || ''}
            onChange={handleInput}
          />
        </div>
        <button onClick={handleUpdateProfile}>update profile</button>
        <button onClick={handleDeleteAccount}>delete account</button>
      </Card>
    </Container>
  )
}
