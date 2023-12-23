// ** React Imports
import { Fragment, forwardRef, useEffect, useState } from 'react'

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
import Fade from '@mui/material/Fade'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomCheckboxBasic from 'src/@core/components/custom-checkbox/basic'

import { icons, icons2, icons3, icons4, icons5, icons6, icons7 } from '../../views/pages/weeklyduch/weeklyduchData'
import { useSelector } from 'react-redux'
import { Dialog } from '@mui/material'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

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
  // Reload prevention
  window.addEventListener('beforeunload', event => {
    // Cancel the event as stated by the standard.
    event.preventDefault()
    // Chrome requires returnValue to be set.
    event.returnValue = ''
  })

  const sectionAndOptionsData = useSelector(state => state.weeklyduchs.sectionAndOptions)

  // console.log(" sectionAndOptionsData ==> ", sectionAndOptionsData)

  const data = sectionAndOptionsData[0][0].SectionOptionList
  // const data = sec1.map(obj => ({ ...obj, title: obj.Name, value: obj.Id }))

  const data2 = sectionAndOptionsData[0][1].SectionOptionList
  // const data2 = sec2.map(obj => ({ ...obj, title: obj.Name, value: obj.Id }))

  const data3 = sectionAndOptionsData[0][2].SectionOptionList
  // const data3 = sec3.map(obj => ({ ...obj, title: obj.Name, value: obj.Id }))

  const data4 = sectionAndOptionsData[0][3].SectionOptionList
  // const data4 = sec4.map(obj => ({ ...obj, title: obj.Name, value: obj.Id }))

  const data5 = sectionAndOptionsData[0][4].SectionOptionList
  // const data5 = sec5.map(obj => ({ ...obj, title: obj.Name, value: obj.Id }))

  const data6 = sectionAndOptionsData[0][5].SectionOptionList
  // const data6 = sec6.map(obj => ({ ...obj, title: obj.Name, value: obj.Id }))

  const data7 = sectionAndOptionsData[0][6].SectionOptionList
  // const data7 = sec7.map(obj => ({ ...obj, title: obj.Name, value: obj.Id }))

  // console.log( " OPtions => ", sectionAndOptionsData[0][0].SectionOptionList)

  const initialSelected = data.filter(item => item.isSelected).map(item => item.value)
  const initialSelected2 = data2.filter(item => item.isSelected).map(item => item.value)
  const initialSelected3 = data3.filter(item => item.isSelected).map(item => item.value)
  const initialSelected4 = data4.filter(item => item.isSelected).map(item => item.value)
  const initialSelected5 = data5.filter(item => item.isSelected).map(item => item.value)
  const initialSelected6 = data6.filter(item => item.isSelected).map(item => item.value)
  const initialSelected7 = data7.filter(item => item.isSelected).map(item => item.value)

  // ** State
  const [selected, setSelected] = useState(initialSelected)
  const [selectedAns, setSelectedAns] = useState(initialSelected)
  const [selected2, setSelected2] = useState(initialSelected2)
  const [selected2Ans, setSelected2Ans] = useState(initialSelected2)
  const [selected3, setSelected3] = useState(initialSelected3)
  const [selected3Ans, setSelected3Ans] = useState(initialSelected3)
  const [selected4, setSelected4] = useState(initialSelected4)
  const [selected4Ans, setSelected4Ans] = useState(initialSelected4)
  const [selected5, setSelected5] = useState(initialSelected5)
  const [selected5Ans, setSelected5Ans] = useState(initialSelected5)
  const [selected6, setSelected6] = useState(initialSelected6)
  const [selected6Ans, setSelected6Ans] = useState(initialSelected6)
  const [selected7, setSelected7] = useState(initialSelected7)
  const [selected7Ans, setSelected7Ans] = useState(initialSelected7)
  const [hachlata, setHachlata] = useState('')

  const handleChange = value => {
    // console.log("Handle Change Value => ", value)
    console.log('BOOM -------> ', data)
    if (selected.includes(value)) {
      const updatedArr = selected.filter(item => item !== value)
      const updatedAns = selectedAns.filter(item => item.Id !== value)
      setSelected(updatedArr)
      setSelectedAns(updatedAns)
    } else {
      const foundObject = data.find(item => item.Id === value)

      const newObject = {
        // ...foundObject, // Copy properties from foundObject
        SectionOption: foundObject.SectionOption,
        Point: foundObject.Point,
        EntryBy: foundObject.EntryBy,
        Result: 'Yes' // Add the "Result: Yes" property
      }

      setSelected([...selected, value])
      setSelectedAns([...selectedAns, newObject])
    }
  }

  const handleChange2 = value => {
    if (selected2.includes(value)) {
      const updatedArr2 = selected2.filter(item => item !== value)
      const updatedArr2Ans = selected2Ans.filter(item => item !== value)
      setSelected2(updatedArr2)
      setSelected2Ans(updatedArr2Ans)
    } else {
      const foundObject = data2.find(item => item.Id === value)

      const newObject = {
        // ...foundObject, // Copy properties from foundObject
        SectionOption: foundObject.SectionOption,
        Point: foundObject.Point,
        EntryBy: foundObject.EntryBy,
        Result: 'Yes' // Add the "Result: Yes" property
      }

      setSelected2([...selected2, value])
      setSelected2Ans([...selected2Ans, newObject])
    }
  }

  const handleChange3 = value => {
    if (selected3.includes(value)) {
      const updatedArr3 = selected3.filter(item => item !== value)
      const updatedArr3Ans = selected3Ans.filter(item => item !== value)
      setSelected3(updatedArr3)
      setSelected3Ans(updatedArr3Ans)
    } else {
      const foundObject = data3.find(item => item.Id === value)

      const newObject = {
        // ...foundObject, // Copy properties from foundObject
        SectionOption: foundObject.SectionOption,
        Point: foundObject.Point,
        EntryBy: foundObject.EntryBy,
        Result: 'Yes' // Add the "Result: Yes" property
      }

      setSelected3([...selected3, value])
      setSelected3Ans([...selected3Ans, newObject])
    }
  }

  const handleChange4 = value => {
    if (selected4.includes(value)) {
      const updatedArr4 = selected4.filter(item => item !== value)
      const updatedArr4Ans = selected4Ans.filter(item => item !== value)
      setSelected4(updatedArr4)
      setSelected4Ans(updatedArr4Ans)
    } else {
      const foundObject = data4.find(item => item.Id === value)

      const newObject = {
        // ...foundObject, // Copy properties from foundObject
        SectionOption: foundObject.SectionOption,
        Point: foundObject.Point,
        EntryBy: foundObject.EntryBy,
        Result: 'Yes' // Add the "Result: Yes" property
      }

      setSelected4([...selected4, value])
      setSelected4Ans([...selected4Ans, newObject])
    }
  }

  const handleChange5 = value => {
    if (selected5.includes(value)) {
      const updatedArr5 = selected5.filter(item => item !== value)
      const updatedArr5Ans = selected5Ans.filter(item => item !== value)
      setSelected5(updatedArr5)
      setSelected5Ans(updatedArr5Ans)
    } else {
      const foundObject = data5.find(item => item.Id === value)

      const newObject = {
        // ...foundObject, // Copy properties from foundObject
        SectionOption: foundObject.SectionOption,
        Point: foundObject.Point,
        EntryBy: foundObject.EntryBy,
        Result: 'Yes' // Add the "Result: Yes" property
      }

      setSelected5([...selected5, value])
      setSelected5Ans([...selected5Ans, newObject])
    }
  }

  const handleChange6 = value => {
    // console.log(" CHECK 6 => ", sec6, data6)

    if (selected6.includes(value)) {
      const updatedArr6 = selected6.filter(item => item !== value)
      const updatedArr6Ans = selected6Ans.filter(item => item !== value)
      setSelected6(updatedArr6)
      setSelected6Ans(updatedArr6Ans)
    } else {
      const foundObject = data6.find(item => item.Id === value)

      const newObject = {
        // ...foundObject, // Copy properties from foundObject
        SectionOption: foundObject.SectionOption,
        Point: foundObject.Point,
        EntryBy: foundObject.EntryBy,
        Result: 'Yes' // Add the "Result: Yes" property
      }

      setSelected6([...selected6, value])
      setSelected6Ans([...selected6Ans, newObject])
    }
  }

  const handleChange7 = value => {
    // console.log(" CHECK 7 => ", sec7, data7, value)
    if (selected7.includes(value)) {
      const updatedArr7 = selected7.filter(item => item !== value)
      const updatedArr7Ans = selected7Ans.filter(item => item !== value)
      setSelected7(updatedArr7)
      setSelected7Ans(updatedArr7Ans)
    } else {
      const foundObject = data7.find(item => item.Id === value)

      const newObject = {
        // ...foundObject, // Copy properties from foundObject
        SectionOption: foundObject.SectionOption,
        Point: foundObject.Point,
        EntryBy: foundObject.EntryBy,
        Result: 'Yes' // Add the "Result: Yes" property
      }

      setSelected7([...selected7, value])
      setSelected7Ans([...selected7Ans, newObject])
    }
  }

  const [AnswerdData, setAnswerdData] = useState([])

  useEffect(() => {
    console.log(
      [
        { ...sectionAndOptionsData[0][0], SectionOptionList: selectedAns },
        { ...sectionAndOptionsData[0][1], SectionOptionList: selected2Ans },
        { ...sectionAndOptionsData[0][2], SectionOptionList: selected3Ans },
        { ...sectionAndOptionsData[0][3], SectionOptionList: selected4Ans },
        { ...sectionAndOptionsData[0][4], SectionOptionList: selected5Ans },
        { ...sectionAndOptionsData[0][5], SectionOptionList: selected6Ans },
        { ...sectionAndOptionsData[0][6], SectionOptionList: selected7Ans }
      ],
      hachlata
    )
  }, [selectedAns, selected2Ans, selected3Ans, selected4Ans, selected5Ans, selected6Ans, selected7Ans, hachlata])

  const proceedHandler = () => {
    setAnswerdData([
      { ...sectionAndOptionsData[0][0], SectionOptionList: selectedAns },
      { ...sectionAndOptionsData[0][1], SectionOptionList: selected2Ans },
      { ...sectionAndOptionsData[0][2], SectionOptionList: selected3Ans },
      { ...sectionAndOptionsData[0][3], SectionOptionList: selected4Ans },
      { ...sectionAndOptionsData[0][4], SectionOptionList: selected5Ans },
      { ...sectionAndOptionsData[0][5], SectionOptionList: selected6Ans },
      { ...sectionAndOptionsData[0][6], SectionOptionList: selected7Ans }
    ])
  }

  useEffect(() => {
    console.log(AnswerdData)
  }, [AnswerdData])

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

  const [resetModal, setResetModal] = useState(false)
  const [submitModal, setSubmitModal] = useState(false)

  const handleReset = () => {
    setResetModal(true)
  }
  
  const handleSubmit = () => {
    setSubmitModal(true)
  }

  const ResetHandler = () => {
    setActiveStep(0)
    setResetModal(false)
    setSelected([])
    setSelectedAns([])
    setSelected2([])
    setSelected2Ans([])
    setSelected3([])
    setSelected3Ans([])
    setSelected4([])
    setSelected4Ans([])
    setSelected5([])
    setSelected5Ans([])
    setSelected6([])
    setSelected6Ans([])
    setSelected7([])
    setSelected7Ans([])
  }

  const onSubmit = () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Draft Saved')
    }
  }

  const submitWeeklyDuch = async () => {
    console.log(' Submited Weekly Duch -> ', AnswerdData)
    const my_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/SectionMapUserlist` //////

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(AnswerdData),
      redirect: 'follow'
    }

    // console.log(requestOptions)

    const res = await fetch(my_url, requestOptions)
    const data = await res.json()
    if (res.ok) {
      alert('Successfully Submitted')
      // handleReset()
      setSubmitModal(false)
      ResetHandler()
      localStorage.setItem('wdsubmit', true)

      return { ok: true, data }
    } else {
      console.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
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
                <label>{sectionAndOptionsData[0][0].SectionTitle}</label>
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
                <label>{sectionAndOptionsData[0][1].SectionTitle}</label>
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
                <label>{sectionAndOptionsData[0][2].SectionTitle}</label>
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
                <label>{sectionAndOptionsData[0][3].SectionTitle}</label>
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
                  <CardHeader title={sectionAndOptionsData[0][4].SectionTitle} />
                  <CardContent>
                    <TextField
                      fullWidth
                      rows={4}
                      multiline
                      variant='filled'
                      label='My Hachlata'
                      id='textarea-filled-static'
                      sx={{ marginBottom: 5 }}
                      onChange={x => setHachlata(x.target.value)}
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
                  <CardHeader title={sectionAndOptionsData[0][5].SectionTitle} />
                  <CardContent>
                    {/* <Grid container spacing={5}>
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
                    </Grid> */}

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
                <label>{sectionAndOptionsData[0][6].SectionTitle}</label>
              </Grid>

              {data7.map((item7, index7) => (
                <CustomCheckboxBasic
                  key={index7}
                  data={data7[index7]}
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
                <Button type='submit' variant='contained' onClick={proceedHandler}>
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

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {AnswerdData?.map((x, index) => (
                <Card key={index} sx={{ mt: 3 }}>
                  <CardHeader title={index + 1 + ' - ' + x?.SectionTitle} />
                  <CardContent>
                    {index + 1 === 5 && (
                      <>
                        {' '}
                        <b>Hachlata : </b> {hachlata}{' '}
                      </>
                    )}
                    <br />
                    <b>Selected Options:</b>
                    <ul>
                      {x?.SectionOptionList?.map((option, idx) => (
                        <>
                          <li key={idx}>{option?.SectionOption}</li>
                        </>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' onClick={handleBack} sx={{ marginRight: '10px' }} color='warning'>
                Edit
              </Button>
              <Button variant='contained' onClick={() => handleSubmit()} color='success'>
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

  console.log('Submitted? ', localStorage.getItem('wdsubmit'))

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
      {localStorage.getItem('wdsubmit') ? <CardContent>Sorry, Weekly Duch already submitted</CardContent> : <CardContent>{renderContent()}</CardContent>}

      <Dialog
        fullWidth
        open={resetModal}
        maxWidth='md'
        scroll='body'
        onClose={() => setResetModal(false)}
        TransitionComponent={Transition}
        // onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <Card sx={{ m: '4' }}>
          <CardContent>
            <b>Are you sure you want to reset?</b> <br /> <br />
            If you reset, all the checkbox you checked will be uncheck. You have to do everything once again.
          </CardContent>
          <Button onClick={() => ResetHandler()}>Continue</Button>
          <Button onClick={() => setResetModal(false)}>Cancel</Button>
          <br />
        </Card>
      </Dialog>

      <Dialog
        fullWidth
        open={submitModal}
        maxWidth='md'
        scroll='body'
        onClose={() => setSubmitModal(false)}
        TransitionComponent={Transition}
        // onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <Card sx={{ mb: '4' }}>
          <CardContent>
            <b>Are you sure you want to Submit?</b> <br /> <br />
            If you Submit, you will not be able to edit or resubmit it again.
          </CardContent>
          <Button onClick={() => submitWeeklyDuch()}>Continue</Button>
          <Button onClick={() => setSubmitModal(false)}>Cancel</Button>
          <br />
        </Card>
      </Dialog>
    </Card>
  )
}

StepperLinearWithValidation.acl = {
  action: 'read',
  subject: 'weekly-duch'
}

export default StepperLinearWithValidation
