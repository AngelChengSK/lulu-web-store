import { Card, Container, Button, Typography, Box } from '@mui/material'

export default function Modal({ onConfirm, onCancel }) {
  return (
    <Container
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content',
        zIndex: '2',
        padding: 0
      }}
    >
      <Card
        sx={{
          textAlign: 'center',
          padding: '20px',
          display: 'flex',
          flexDirection: 'Column',
          gap: '15px'
        }}
      >
        <Typography>Are you sure?</Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button color="primary" size="small" fullWidth onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            onClick={onConfirm}
          >
            Delete
          </Button>
        </Box>
      </Card>
    </Container>
  )
}
