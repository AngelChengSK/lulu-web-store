import { useContext } from 'react'
import { Card, Container, Button } from '@mui/material'
import { AuthContext } from '../store/auth-context'
import Login from './Login'

export default function Profile() {
  const { user, handleLogout } = useContext(AuthContext)

  return (
    <>
      {user ? (
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Card>
        </Container>
      ) : (
        <Login />
      )}
    </>
  )
}
