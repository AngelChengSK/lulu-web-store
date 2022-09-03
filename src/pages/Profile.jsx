import { useState, useContext, useEffect } from 'react'
import { Card, Container, TextField, Button, Typography } from '@mui/material'
import { AuthContext } from '../store/auth-context'
import { FirestoreContext } from '../store/firestore-context'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Backdrop from '../components/Backdrop'
import Modal from '../components/Modal'

export default function Profile() {
  const [currentUserData, setCurrentUserData] = useState(null)
  const [enableEdit, setEnableEdit] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const [values, setValues] = useState(null)
  const { user, handleDeleteAuth } = useContext(AuthContext)
  const { getSingleUserData, handleSetDoc } = useContext(FirestoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) getCurrentUserData()
  }, [user])

  useEffect(() => {
    if (currentUserData) {
      setValues(currentUserData)
    }
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

  function handleDeleteBtn() {
    setShowPopUp(true)
  }

  function closePopUp() {
    setShowPopUp(false)
  }

  async function handleDeleteAccount() {
    await deleteDoc(doc(db, 'users', user.uid))
    setCurrentUserData([])
    handleDeleteAuth()
    navigate('/login')
  }

  function handleUpdateProfile() {
    handleSetDoc(user.uid, values)

    setEnableEdit(false)
  }

  function handleCancelEdit() {
    getCurrentUserData()
    setValues(currentUserData)
    setEnableEdit(false)
  }

  function handleInput(e) {
    const id = e.target.id
    const value = e.target.value
    setValues((prevValues) => ({ ...prevValues, [id]: value }))
  }

  if (!currentUserData || !values) return

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
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Your Profile
        </Typography>

        <TextField
          disabled={!enableEdit}
          variant="standard"
          id="firstname"
          label="First Name"
          InputLabelProps={{
            shrink: true
          }}
          value={values.firstname || ''}
          onChange={handleInput}
        />
        <TextField
          disabled={!enableEdit}
          variant="standard"
          id="lastname"
          label="Last Name"
          InputLabelProps={{
            shrink: true
          }}
          value={values.lastname || ''}
          onChange={handleInput}
        />
        <TextField
          disabled
          variant="standard"
          id="email"
          label="Email"
          InputLabelProps={{
            shrink: true
          }}
          value={values.email || ''}
        />
        <TextField
          disabled={!enableEdit}
          variant="standard"
          id="phone"
          label="Phone"
          InputLabelProps={{
            shrink: true
          }}
          value={values.phone || ''}
          onChange={handleInput}
        />

        {enableEdit ? (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={handleUpdateProfile}
            >
              save
            </Button>
            <Button variant="outlined" color="error" onClick={handleCancelEdit}>
              cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => setEnableEdit(true)}>
            edit profile
          </Button>
        )}
        {!enableEdit && (
          <Button variant="outlined" color="error" onClick={handleDeleteBtn}>
            delete account
          </Button>
        )}
        {showPopUp && <Backdrop onClick={closePopUp} />}
        {showPopUp && (
          <Modal onCancel={closePopUp} onConfirm={handleDeleteAccount} />
        )}
      </Card>
    </Container>
  )
}
