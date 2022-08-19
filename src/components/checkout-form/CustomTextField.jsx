import { useFormContext, Controller } from 'react-hook-form'
import { TextField, Grid } from '@mui/material'

export default function CustomTextField({ name, label }) {
  const { control } = useFormContext()

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        defaultValue={''}
        name={name}
        control={control}
        render={({ field }) => (
          <TextField {...field} name={name} label={label} fullWidth />
        )}
      />
    </Grid>
  )
}
