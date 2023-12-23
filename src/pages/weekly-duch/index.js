// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomCheckboxBasic from 'src/@core/components/custom-checkbox/basic'

import {icons,icons2,icons3,icons4,icons5,icons6,icons7} from './weeklyduchData'
import { useSelector } from 'react-redux'

const steps = [{}, {}, {}, {}, {}, {}, {}]

const defaultAccountValues = {
  // email: '',
}

const defaultPersonalValues = {}

const defaultSocialValues = {}

const accountSchema = yup.object().shape({
  // username: yup.string().required(),
})

const personalSchema = yup.object().shape({
  // country: yup.string().required(),
})

const aAZz = yup.object().shape({
  // google: yup.string().required(),
})

const StepperLinearWithValidation = () => {

  const sectionAndOptionsData = useSelector(state => state.weeklyduchs.sectionAndOptions)

  console.log(" sectionAndOptionsData ==> ", sectionAndOptionsData)

  const sec1 = sectionAndOptionsData[0][0].options
  const data = sec1.map(obj => ({...obj, title: obj.Name, value: obj.Id}));

  const sec2 = sectionAndOptionsData[0][1].options
  const data2 = sec2.map(obj => ({...obj, title: obj.Name, value: obj.Id}));

  const sec3 = sectionAndOptionsData[0][2].options
  const data3 = sec3.map(obj => ({...obj, title: obj.Name, value: obj.Id}));

  const sec4 = sectionAndOptionsData[0][3].options
  const data4 = sec4.map(obj => ({...obj, title: obj.Name, value: obj.Id}));

  const sec5 = sectionAndOptionsData[0][4].options
  const data5 = sec5.map(obj => ({...obj, title: obj.Name, value: obj.Id}));

  const sec6 = sectionAndOptionsData[0][5].options
  const data6 = sec6.map(obj => ({...obj, title: obj.Name, value: obj.Id}));

  const sec7 = sectionAndOptionsData[0][6].options
  const data7 = sec7.map(obj => ({...obj, title: obj.Name, value: obj.Id}));

  console.log( " OPtions => ", sectionAndOptionsData[0][0].options)

  const initialSelected = data.filter(item => item.isSelected).map(item => item.Id)
  const initialSelected2 = data2.filter(item => item.isSelected).map(item => item.value)
  const initialSelected3 = data3.filter(item => item.isSelected).map(item => item.value)
  const initialSelected4 = data4.filter(item => item.isSelected).map(item => item.value)
  const initialSelected5 = data5.filter(item => item.isSelected).map(item => item.value)
  const initialSelected6 = data6.filter(item => item.isSelected).map(item => item.value)
  const initialSelected7 = data7.filter(item => item.isSelected).map(item => item.value)

  // ** State
  const [selected, setSelected] = useState(initialSelected)
  const [selected2, setSelected2] = useState(initialSelected2)
  const [selected3, setSelected3] = useState(initialSelected3)
  const [selected4, setSelected4] = useState(initialSelected4)
  const [selected5, setSelected5] = useState(initialSelected5)
  const [selected6, setSelected6] = useState(initialSelected6)
  const [selected7, setSelected7] = useState(initialSelected7)

  const handleChange = value => {
    console.log("Handle Change Value => ", value)
    if (selected.includes(value)) {
      const updatedArr = selected.filter(item => item !== value)
      setSelected(updatedArr)
    } else {
      setSelected([...selected, value])
    }
  }

  const handleChange2 = value => {
    if (selected2.includes(value)) {
      const updatedArr2 = selected2.filter(item => item !== value)
      setSelected2(updatedArr2)
    } else {
      setSelected2([...selected2, value])
    }
  }

  const handleChange3 = value => {
    if (selected3.includes(value)) {
      const updatedArr3 = selected3.filter(item => item !== value)
      setSelected3(updatedArr3)
    } else {
      setSelected3([...selected3, value])
    }
  }

  const handleChange4 = value => {
    if (selected4.includes(value)) {
      const updatedArr4 = selected4.filter(item => item !== value)
      setSelected4(updatedArr4)
    } else {
      setSelected4([...selected4, value])
    }
  }

  const handleChange5 = value => {
    if (selected5.includes(value)) {
      const updatedArr5 = selected5.filter(item => item !== value)
      setSelected5(updatedArr5)
    } else {
      setSelected5([...selected5, value])
    }
  }

  const handleChange6 = value => {
    if (selected6.includes(value)) {
      const updatedArr6 = selected6.filter(item => item !== value)
      setSelected6(updatedArr6)
    } else {
      setSelected6([...selected6, value])
    }
  }

  const handleChange7 = value => {
    if (selected7.includes(value)) {
      const updatedArr7 = selected7.filter(item => item !== value)
      setSelected7(updatedArr7)
    } else {
      setSelected7([...selected7, value])
    }
  }

  useEffect(() => {
    console.log('Selected 1 ==> ', selected)
    console.log('Selected 2 ==> ', selected2)
    console.log('Selected 3 ==> ', selected3)
    console.log('Selected 4 ==> ', selected4)
    console.log('Selected 5 ==> ', selected5)
    console.log('Selected 6 ==> ', selected6)
    console.log('Selected 7 ==> ', selected7)

    console.log([selected, selected2, selected3, selected4, selected5, selected6, selected7])
  }, [selected, selected2, selected3, selected4, selected5, selected6, selected7])

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
    resolver: yupResolver(aAZz)
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
      toast.success('Draft Saved')
    }
  }

  const getStepContent = step => {
    // ** Vars
    const { option1, option2, option3, option4 } = state
    const error = [option1, option2, option3, option4].filter(v => v).length !== 2

    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <label>{sectionAndOptionsData[0][0].Name}</label>
              </Grid>
              {data.map((item, index) => (
                <CustomCheckboxBasic
                  key={index}
                  data={data[index]}
                  selected={selected}
                  icon={icons[index] ? icons[index].icon : ''}
                  handleChange={handleChange}
                  name='custom-checkbox-basic'
                  gridProps={{ sm: 6, xs: 12 }}
                  iconProps={icons[index] ? icons[index].iconProps : {}}
                />
              ))}
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
                <label>{sectionAndOptionsData[0][1].Name}</label>
              </Grid>
              {data2.map((item2, index2) => (
                <CustomCheckboxBasic
                  key={index2}
                  data={data2[index2]}
                  selected={selected2}
                  handleChange={handleChange2}
                  name='custom-checkbox-basic'
                  gridProps={{ sm: 6, xs: 12 }}
                  icon={icons2[index2] ? icons2[index2].icon : ''}
                  iconProps={icons2[index2] ? icons2[index2].iconProps : {}}
                />
              ))}
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
                <label>{sectionAndOptionsData[0][2].Name}</label>
              </Grid>
              {data3.map((item3, index3) => (
                <CustomCheckboxBasic
                  key={index3}
                  data={data3[index3]}
                  selected={selected3}
                  handleChange={handleChange3}
                  name='custom-checkbox-basic'
                  gridProps={{ xs: 12 }}
                  icon={icons3[index3] ? icons3[index3].icon : ''}
                  iconProps={icons3[index3] ? icons3[index3].iconProps : {}}
                />
              ))}
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
                <label>{sectionAndOptionsData[0][3].Name}</label>
              </Grid>
              {data4.map((item4, index4) => (
                <CustomCheckboxBasic
                  key={index4}
                  data={data4[index4]}
                  selected={selected4}
                  handleChange={handleChange4}
                  name='custom-checkbox-basic'
                  gridProps={{ sm: 6, xs: 12 }}
                  icon={icons4[index4] ? icons4[index4].icon : ''}
                  iconProps={icons4[index4] ? icons4[index4].iconProps : {}}
                />
              ))}
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
                  <CardHeader title={sectionAndOptionsData[0][4].Name} />
                  <CardContent>
                    <TextField
                      fullWidth
                      rows={4}
                      multiline
                      variant='filled'
                      label='My Hachlata'
                      id='textarea-filled-static'
                      sx={{ marginBottom: 5 }}
                    />

                    {data5.map((item5, index5) => (
                      <CustomCheckboxBasic
                        key={index5}
                        data={data5[index5]}
                        selected={selected5}
                        handleChange={handleChange5}
                        name='custom-checkbox-basic'
                        gridProps={{ xs: 12 }}
                        icon={icons5[index5] ? icons5[index5].icon : ''}
                        iconProps={icons5[index5] ? icons5[index5].iconProps : {}}
                      />
                    ))}
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
                  <CardHeader title={sectionAndOptionsData[0][5].Name} />
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <CustomTextField fullWidth label='Name' id='outlined-full-width' sx={{ mb: 4 }} />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField fullWidth label='Class' id='outlined-full-width' sx={{ mb: 4 }} />
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

                    {data6.map((item6, index6) => (
                      <CustomCheckboxBasic
                        key={index6}
                        data={data6[index6]}
                        selected={selected6}
                        handleChange={handleChange6}
                        name='custom-checkbox-basic'
                        gridProps={{ xs: 12 }}
                        icon={icons6[index6] ? icons6[index6].icon : ''}
                        iconProps={icons6[index6] ? icons6[index6].iconProps : {}}
                      />
                    ))}
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
                <label>{sectionAndOptionsData[0][6].Name}</label>
              </Grid>

              {data5.map((item7, index7) => (
                <CustomCheckboxBasic
                  key={index7}
                  data={data5[index7]}
                  selected={selected7}
                  handleChange={handleChange7}
                  name='custom-checkbox-basic'
                  gridProps={{ xs: 12 }}
                  icon={icons7[index7] ? icons7[index7].icon : ''}
                  iconProps={icons7[index7] ? icons7[index7].iconProps : {}}
                />
              ))}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step7' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Proceed
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
          <Typography>Summary of the Submitted Data will be visible here..</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' onClick={handleBack} sx={{ marginRight: '10px' }} color='warning'>
                Review
              </Button>
              <Button variant='contained' onClick={handleReset} color='success'>
                Submit
              </Button>
            </Box>
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
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {}
            if (index === activeStep) {
            }

            return (
              <Step key={index}>
                <StepLabel {...labelProps}>
                  {/* <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div> */}
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

StepperLinearWithValidation.acl = {
  action: 'read',
  subject: 'weekly-duch'
}

export default StepperLinearWithValidation
