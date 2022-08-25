import { useContext } from 'react'
import { Card, Container } from '@mui/material'
import { AuthContext } from '../store/auth-context'

export default function Profile() {
  const { user } = useContext(AuthContext)

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
      </Card>
    </Container>
  )
}
