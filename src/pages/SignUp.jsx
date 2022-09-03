import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  Typography,
  Button,
  Card,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export default function SignUp() {
  const [error, setError] = useState(null)
  // const navigate = useNavigate()

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  })

  const handleChange = (prop) => (event) => {
    setValues((prevValues) => ({ ...prevValues, [prop]: event.target.value }))
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  async function handleSignUp(e) {
    e.preventDefault()

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      await setDoc(doc(db, 'users', res.user.uid), {
        email: values.email,
        favourites: [],
        cart: []
      })
    } catch (error) {
      setError(
        error.message.substring(
          error.message.indexOf(':') + 2,
          error.message.length - 1
        )
      )
    }
  }

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
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
          Create account
        </Typography>
        <form
          onSubmit={handleSignUp}
          style={{
            display: 'flex',
            flexDirection: 'Column',
            gap: '20px'
          }}
        >
          <TextField
            name="email"
            label="Email"
            required
            value={values.email}
            variant="outlined"
            fullWidth
            onChange={handleChange('email')}
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password"
              label="Password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Sign up
          </Button>
        </form>

        {error && <Typography color="error">{error}</Typography>}

        <Typography>
          Already a user?
          <Button component={Link} to="/login">
            Login
          </Button>
        </Typography>
      </Card>
    </Container>
  )
}
