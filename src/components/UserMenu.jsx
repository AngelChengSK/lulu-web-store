import { Card, Container, Button, Typography } from '@mui/material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../store/auth-context'

export default function UserMenu({ onClick }) {
  const { user, handleLogout } = useContext(AuthContext)

  return (
    <Container
      sx={{
        position: 'fixed',
        top: '80px',
        right: 0,
        width: 'fit-content',
        zIndex: '2'
      }}
    >
      <Card
        sx={{
          textAlign: 'center',
          padding: '20px',
          display: 'flex',
          flexDirection: 'Column',
          gap: '10px'
        }}
      >
        <Typography>Welcome, {user.email.split('@')[0]}</Typography>
        <Button
          component={Link}
          to="/profile"
          color="primary"
          size="small"
          fullWidth
          onClick={onClick}
        >
          Profile
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Card>
    </Container>
  )
}
