import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { ScaleLoader } from 'react-spinners/'
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  Divider
} from '@mui/material'
import FormInput from './CustomTextField'
import commerce from '../../lib/commerce'
import { CheckoutContext } from '../../store/checkout-context'

export default function AddressForm({ checkoutToken, onNext }) {
  const [nextClicked, setNextClicked] = useState(false)
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOption, setShippingOption] = useState('')
  const [loading, setLoading] = useState(true)

  const methods = useForm()
  const CheckoutCtx = useContext(CheckoutContext)

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    )

    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    )

    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    )

    setShippingOption(options[0])
    setLoading(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    setTimeout(() => {
      onNext()
      CheckoutCtx.storeShippingCounty(shippingOption.description)
      CheckoutCtx.storeShippingFee(shippingOption.price.raw)
    }, 1500)
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [checkoutToken.id])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      )
  }, [checkoutToken.id, shippingCountry, shippingSubdivision])

  return (
    <div>
      {loading && (
        <Box sx={{ textAlign: 'center', margin: '100px 0' }}>
          <ScaleLoader color="silver" height="25px" />
        </Box>
      )}
      {shippingOption && (
        <>
          <Typography
            sx={{ fontSize: '18px', margin: '40px 0 20px', fontWeight: 'bold' }}
          >
            Shipping Information
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <FormInput
                  name="firstName"
                  label="First name"
                  required
                  nextClicked={nextClicked}
                />
                <FormInput
                  name="lastName"
                  label="Last name"
                  nextClicked={nextClicked}
                />
                <FormInput
                  name="address1"
                  label="Address line 1"
                  nextClicked={nextClicked}
                />
                <FormInput
                  name="email"
                  label="Email"
                  nextClicked={nextClicked}
                />
                <FormInput name="city" label="City" nextClicked={nextClicked} />
                <FormInput
                  name="zip"
                  label="Zip / Postal code"
                  nextClicked={nextClicked}
                />

                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Country</InputLabel>
                  <Select
                    value={shippingCountry}
                    fullWidth
                    onChange={(e) => setShippingCountry(e.target.value)}
                  >
                    {Object.keys(shippingCountries).map((countryInitial) => (
                      <MenuItem key={countryInitial} value={countryInitial}>
                        {shippingCountries[countryInitial]}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Subdividion</InputLabel>
                  <Select
                    value={shippingSubdivision}
                    fullWidth
                    onChange={(e) => setShippingSubdivision(e.target.value)}
                  >
                    {Object.keys(shippingSubdivisions).map((initial) => (
                      <MenuItem key={initial} value={initial}>
                        {shippingSubdivisions[initial]}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ mb: '20px' }} />
                  <Typography sx={{ mb: '40px' }}>
                    {`Shipping Fee (${shippingOption.description})`}
                    <span style={{ float: 'right', fontWeight: 'bold' }}>
                      {shippingOption.price.formatted_with_symbol}
                    </span>
                  </Typography>
                </Grid>
              </Grid>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button component={Link} variant="outlined" to="/cart">
                  Back to Cart
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => setNextClicked(true)}
                >
                  Next
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  )
}
