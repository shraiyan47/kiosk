// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
  {
  },
  {
  },
  {
  },
  {
  },
  {
  },
  {
  },
  {
  }
]

const defaultAccountValues = {
  // email: '',
}

const defaultPersonalValues = {

}

const defaultSocialValues = {

}

const accountSchema = yup.object().shape({
  // username: yup.string().required(),
})

const personalSchema = yup.object().shape({
  // country: yup.string().required(),
})

const socialSchema = yup.object().shape({
  // google: yup.string().required(),
})

const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)

  const [state, setState] = useState({
    // password: '',
    // password2: '',
    // showPassword: false,
    // showPassword2: false
  })

  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    // socialReset({ google: '', twitter: '', facebook: '', linkedIn: '' })
  }

  const onSubmit = () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  // Handle Password
  const handleClickShowPassword = () => {
    // setState({ ...state, showPassword: !state.showPassword })
  }

  // Handle Confirm Password
  const handleClickShowConfirmPassword = () => {
    // setState({ ...state, showPassword2: !state.showPassword2 })
  }

  const getStepContent = step => {
    // const [state, setState] = useState({
    //   step1: true,
    //   step2: false,
    //   step3: false,
    //   step4: false,
    //   step5: false,
    //   step6: false,
    //   step7: false
    // })
    
    // ** Vars
    const { option1, option2, option3, option4 } = state
    const error = [option1, option2, option3, option4].filter(v => v).length !== 2
    
    const handleChange = event => {
      setState({ ...state, [event.target.name]: event.target.checked })
    }
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
              <Card>
                <CardHeader title='Back to Basics' />
                <CardContent>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='Card Actions'>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I covered my elbows completely at all times.'
                            control={<Checkbox checked={option1} onChange={handleChange} name='option1' />}
                          />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I covered my collarbone completely at all times.'
                            control={<Checkbox checked={option2} onChange={handleChange} name='option2' />}
                          />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I covered my knees completely at all times'
                            control={<Checkbox checked={option3} onChange={handleChange} name='option3' />}
                          />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='My skirt was 4 inches below my knees all week. (+3)'
                            control={<Checkbox checked={option4} onChange={handleChange} name='option4' />}
                          />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step1' color='secondary' disabled>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
              <Card>
                <CardHeader title='Daughters of Digninty' />
                <CardContent>
                  <CustomTextField fullWidth label='My Chavrusa' id='outlined-full-width' sx={{ mb: 4 }} />
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='Card Actions'>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I learned the Daughters of Dignity booklet this week with my Chavrusa. (4)'
                            control={<Checkbox checked={option1} onChange={handleChange} name='option1' />}
                          />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I learned in 770 (+1)'
                            control={<Checkbox checked={option2} onChange={handleChange} name='option2' />}
                          />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step2' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
              <Card>
                <CardHeader title='Maagalim' />
                <CardContent>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='Card Actions'>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I attended maagalim this week'
                            control={<Checkbox checked={option1} onChange={handleChange} name='option1' />}
                          />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step3' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 3:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
              <Card>
                <CardHeader title='Tech Check' />
                <CardContent>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='Card Actions'>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I did not using any social media or watch any content on an unfiltered media platform. (1)'
                            control={<Checkbox checked={option1} onChange={handleChange} name='option1' />}
                          />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I did not use any unfiltered device. (+2)'
                            control={<Checkbox checked={option1} onChange={handleChange} name='option2' />}
                          />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step4' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 4:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
              <Card>
                <CardHeader title='My Hachlata' />
                <CardContent>
                  <TextField
                    fullWidth
                    rows={4}
                    multiline
                    variant='filled'
                    label='My Hachlata'
                    id='textarea-filled-static'
                  />
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='Card Actions'>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I kept to my Hachlata for the whole week.'
                            control={<Checkbox checked={option1} onChange={handleChange} name='option1' />}
                          />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step5' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 5:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
              <Card>
                <CardHeader title='' />
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={4}>
                      <CustomTextField fullWidth label='Name' id='outlined-full-width' sx={{ mb: 4}} />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField fullWidth label='Class' id='outlined-full-width' sx={{ mb: 4}} />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>Membership Goal</Typography>
                      <RadioGroup row aria-label='uncontrolled' name='uncontrolled' defaultValue='value1'>
                        <FormControlLabel value='value1' control={<Radio />} label='Bronze' />
                        <FormControlLabel value='value2' control={<Radio />} label='Silver' />
                        <FormControlLabel value='value3' control={<Radio />} label='Gold' />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='Card Actions'>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I affirm that everything on this card is 100% honest and I am proud to share it with the Rebbe.'
                            control={<Checkbox checked={option1} onChange={handleChange} name='option1' />}
                          />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step6' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 6:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
              <Card>
                <CardHeader title='Geder Moments' />
                <CardContent>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='Card Actions'>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                          <FormControlLabel
                            label='I attended maagalim this week'
                            control={<Checkbox checked={option1} onChange={handleChange} name='option1' />}
                          />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step7' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {}
              if (index === activeStep) {
                // labelProps.error = false
                // if (
                //   (accountErrors.email ||
                //     accountErrors.username ||
                //     accountErrors.password ||
                //     accountErrors['confirm-password']) &&
                //   activeStep === 0
                // ) {
                //   labelProps.error = true
                // } else if (
                //   (personalErrors.country ||
                //     personalErrors.language ||
                //     personalErrors['last-name'] ||
                //     personalErrors['first-name']) &&
                //   activeStep === 1
                // ) {
                //   labelProps.error = true
                // } else if (
                //   (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                //   activeStep === 2
                // ) {
                //   labelProps.error = true
                // } else {
                //   labelProps.error = false
                // }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperLinearWithValidation
