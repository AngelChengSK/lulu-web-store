import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField, Grid } from '@mui/material'

export default function CustomTextField({
  name,
  label,
  required,
  nextClicked
}) {
  const { control } = useFormContext()
  const [input, setInput] = useState('')

  function checkError() {
    if (!nextClicked || !required) return false
    return input ? false : true
  }

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        defaultValue={''}
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            name={name}
            label={label}
            required={required}
            error={checkError()}
            value={input}
            variant="standard"
            size="small"
            fullWidth
            onChange={(e) => setInput(e.target.value)}
          />
        )}
      />
    </Grid>
  )
}
