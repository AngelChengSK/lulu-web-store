import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const provider = new GoogleAuthProvider()

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

  function handleSignInWithLuluAccount(e) {
    e.preventDefault()

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // const user = userCredential.user
        navigate('/profile')
      })
      .catch((error) => {
        setError(
          error.message.substring(
            error.message.indexOf(':') + 2,
            error.message.length - 1
          )
        )
      })
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
          Login
        </Typography>
        <form
          onSubmit={handleSignInWithLuluAccount}
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
            sx={{
              fontSize: '12px',
              alignSelf: 'end',
              width: 'fit-content',
              mt: '-20px'
            }}
          >
            forgot password?
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Login
          </Button>
        </form>

        {error && <Typography color="error">{error}</Typography>}

        <Divider>OR</Divider>
        <Box>
          <IconButton
            aria-label="login with Google"
            size="small"
            color="inherit"
            onClick={() => signInWithRedirect(auth, provider)}
          >
            <GoogleIcon />
          </IconButton>
        </Box>
        <Typography>
          Need an account?
          <Button component={Link} to="/signup">
            Sign up
          </Button>
        </Typography>
      </Card>
    </Container>
  )
}
