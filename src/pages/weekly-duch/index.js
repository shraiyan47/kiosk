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
import { Dialog, Icon, MenuItem } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import axios from 'axios'
import { useRouter } from 'next/router'

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

  const router = useRouter()

  const sectionAndOptionsData = useSelector(state => state.weeklyduchs.sectionAndOptions)
  const submissionData = useSelector(state => state.submissions.sub)
  const elegibleData = useSelector(state => state.submissions.eleg)
  const hachlataData = useSelector(state => state.submissions.hachlata)
  const gedermomentData = useSelector(state => state.submissions.gedermoment)

  console.log(' sectionAndOptionsData ==> ', sectionAndOptionsData.length)
  console.log(' Submission Data ==> ', submissionData)
  console.log(' Elegiblity Data ==> ', elegibleData[0])
  console.log(' hachlata Data ==> ', hachlataData)
  console.log(' geder moment Data ==> ', gedermomentData)

  useEffect(() => {
    if (elegibleData[0] != 'Active' || submissionData.length < 1 || submissionData[0] === 'ALREADY SUBMITTED') {
      alert('Weekly Duch already submitted or you are not eligible for program.')
      window.location.replace('/home')
    } else {
      console.log('Everything Looks Good!')
    }
  }, [elegibleData, submissionData])

  if (sectionAndOptionsData.length < 1) {
    window.location.replace('/home')
  }

  const data = sectionAndOptionsData[0][0].SectionOptionList
  const data2 = sectionAndOptionsData[0][1].SectionOptionList
  const data3 = sectionAndOptionsData[0][2].SectionOptionList
  const data4 = sectionAndOptionsData[0][3].SectionOptionList
  const data5 = sectionAndOptionsData[0][4].SectionOptionList
  const data6 = sectionAndOptionsData[0][5].SectionOptionList
  const data7 = sectionAndOptionsData[0][6].SectionOptionList

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
  const [chavrusaChecked, setChavrusaChecked] = useState(true)
  const [techCheck, setTechCheck] = useState(true)
  const [hachlata, setHachlata] = useState(false)

  const calculateTotalPoints = (data) => {
    const result = [];
  
    data.forEach((section) => {
      const sectionTitle = section.SectionTitle;
      const sectionOptionList = section.SectionOptionList;
      let totalPoints = 0;
  
      sectionOptionList.forEach((option) => {
        totalPoints += option.Point;
      });
  
      result.push({ SectionTitle: sectionTitle, TotalPoint: totalPoints.toString() });
    });
  
    return result;
  };
  

  const handleChange = value => {
    // console.log("Handle Change Value => ", value)
    console.log('Back to basic -------> ', data)
    if (selected.includes(value)) {
      const updatedArr = selected.filter(item => item !== value)
      const updatedAns = selectedAns.filter(item => item.SectionOption !== data.find(x => x.Id === value).SectionOption)
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
    console.log('data2 -> ', data2, value)
    // if (selected2.includes(value)) {
    if (value?.target?.name === 'chavrusa') {
      const newObject = {
        SectionOption: data2[2]?.SectionOption,
        Point: data2[2]?.Point,
        EntryBy: data2[2]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected2Ans = selected2Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected2Ans([...uniqueSelected2Ans, newObject])
    } else {
      if (selected2.includes(value)) {
        const updated2Arr = selected2.filter(item => item !== value)

        const updated2Ans = selected2Ans.filter(
          item => item.SectionOption !== data2.find(x => x.Id === value).SectionOption
        )

        setSelected2(updated2Arr)
        setSelected2Ans(updated2Ans)
        if (
          data2.find(x => x.Id === value).SectionOption ===
          'I learned the Daughters of Dignity booklet this week with my Chavrusa.'
        ) {
          setChavrusaChecked(true)

          const updated2Ans = selected2Ans.filter(
            item =>
              item.SectionOption !== 'I learned in 770' &&
              item.SectionOption !== 'My Chavrusa' &&
              item.SectionOption !== 'I learned the Daughters of Dignity booklet this week with my Chavrusa.'
          )
          setSelected2Ans(updated2Ans)
          setSelected2([])
        }
      } else {
        const foundObject = data2.find(item => item.Id === value)

        const newObject = {
          SectionOption: foundObject.SectionOption,
          Point: foundObject.Point,
          EntryBy: foundObject.EntryBy,
          Result: 'Yes'
        }

        setSelected2([...selected2, value])
        setSelected2Ans([...selected2Ans, newObject])

        if (foundObject.SectionOption === 'I learned the Daughters of Dignity booklet this week with my Chavrusa.') {
          setChavrusaChecked(false)
        }
      }
    }
  }

  const handleChange3 = value => {
    if (selected3.includes(value)) {
      const updatedArr3 = selected3.filter(item => item !== value)

      const updatedArr3Ans = selected3Ans.filter(
        item => item.SectionOption !== data3.find(x => x.Id === value).SectionOption
      )
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

      const updatedArr4Ans = selected4Ans.filter(
        item => item.SectionOption !== data4.find(x => x.Id === value).SectionOption
      )
      setSelected4(updatedArr4)
      setSelected4Ans(updatedArr4Ans)

      if (
        data4.find(x => x.Id === value).SectionOption ===
        'I did not using any social media or watch any content on an unfiltered media platform.'
      ) {
        setTechCheck(true)

        const updatedArr4Ans = selected4Ans.filter(
          item => item.SectionOption !== 'I did not use any unfiltered device.'
        )

        setSelected4([])
        setSelected4Ans(updatedArr4Ans)
      }
    } else {
      const foundObject = data4.find(item => item.Id === value)

      const newObject = {
        // ...foundObject, // Copy properties from foundObject
        SectionOption: foundObject.SectionOption,
        Point: foundObject.Point,
        EntryBy: foundObject.EntryBy,
        Result: 'Yes' // Add the "Result: Yes" property
      }

      if (
        foundObject.SectionOption ===
        'I did not using any social media or watch any content on an unfiltered media platform.'
      ) {
        setTechCheck(false)
      }

      setSelected4([...selected4, value])
      setSelected4Ans([...selected4Ans, newObject])
    }
  }

  const [otherhachlata, setOtherhachlata] = useState(false)

  const handleChange5 = value => {
    console.log('Handle 5 -> ', value)
    if (value?.target?.name === 'hachlatalist') {
      if (value?.target?.value.replace(/ /g, '') === 'Others') {
        setOtherhachlata(true)
      } else {
        setOtherhachlata(false)
      }

      const newObject = {
        SectionOption: data5[1]?.SectionOption,
        Point: data5[1]?.Point,
        EntryBy: data5[1]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected2Ans = selected5Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected5Ans([...uniqueSelected2Ans, newObject])
    } else if (value?.target?.name === 'otherhachlata') {
      const newObject = {
        SectionOption: data5[1]?.SectionOption,
        Point: data5[1]?.Point,
        EntryBy: data5[1]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected2Ans = selected5Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected5Ans([...uniqueSelected2Ans, newObject])
    } else {
      if (selected5.includes(value)) {
        const updatedArr5 = selected5.filter(item => item !== value)
        setHachlata(false)
        setOtherhachlata(false)

        const updatedArr5Ans = selected5Ans.filter(
          item => item.SectionOption !== data5.find(x => x.Id === value).SectionOption
        )
        setSelected5(updatedArr5)
        setSelected5Ans(updatedArr5Ans)
      } else {
        const foundObject = data5.find(item => item.Id === value)
        setHachlata(true)

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
  }

  const handleChange6 = value => {
    console.log(' CHECK 6 => ', data6, value)

    if (value?.target?.name === 'commentstoRebbe') {
      const newObject = {
        SectionOption: data6[1]?.SectionOption,
        Point: data6[1]?.Point,
        EntryBy: data6[1]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected6Ans = selected6Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected6Ans([...uniqueSelected6Ans, newObject])
    } else {
      if (selected6.includes(value)) {
        const updatedArr6 = selected6.filter(item => item !== value)

        const updatedArr6Ans = selected6Ans.filter(
          item => item.SectionOption !== data6.find(x => x.Id === value).SectionOption
        )
        setSelected6(updatedArr6)
        setSelected6Ans(updatedArr6Ans)
      } else {
        const foundObject = data6.find(item => item.Id === value)

        const newObject = {
          // ...foundObject, // Copy properties from foundObject
          SectionOption: foundObject?.SectionOption,
          Point: foundObject?.Point,
          EntryBy: foundObject?.EntryBy,
          Result: 'Yes' // Add the "Result: Yes" property
        }

        setSelected6([...selected6, value])
        setSelected6Ans([...selected6Ans, newObject])
      }
    }
  }

  const [otherGeder1, setOtherGeder1] = useState(false)
  const [otherGeder2, setOtherGeder2] = useState(false)
  const [otherGeder3, setOtherGeder3] = useState(false)

  const handleChange7 = value => {
    console.log(' CHECK 7 => ', data7, value, selected7Ans)

    if (value?.target?.name === data7[0]?.SectionOption ) {
      if (value?.target?.value.replace(/ /g, '') === 'Other') {
        setOtherGeder1(true)
      } else {
        setOtherGeder1(false)
      }

      const newObject = {
        SectionOption: data7[0]?.SectionOption,
        Point: data7[0]?.Point,
        EntryBy: data7[0]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected7Ans = selected7Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected7Ans([...uniqueSelected7Ans, newObject])
    } else if (value?.target?.name === 'otherGeder1') {
      const newObject = {
        SectionOption: data7[0]?.SectionOption,
        Point: data7[0]?.Point,
        EntryBy: data7[0]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected7Ans = selected7Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected7Ans([...uniqueSelected7Ans, newObject])
    } else if (value?.target?.name == 'dow1'){
      let index = selected7Ans.findIndex(obj => obj.SectionOption === data7[0]?.SectionOption);
      console.log("D O W 1",index)
      if (index !== -1) {
        const updatedObject = {
          ...selected7Ans[index],
          Remarks: value.target.value
        };
    
        const updatedSelected7Ans = [...selected7Ans];
        updatedSelected7Ans[index] = updatedObject;
    
        setSelected7Ans(updatedSelected7Ans);
      }
    }

    if (value?.target?.name === data7[1]?.SectionOption) {
      if (value?.target?.value.replace(/ /g, '') === 'Other') {
        setOtherGeder2(true)
      } else {
        setOtherGeder2(false)
      }

      const newObject = {
        SectionOption: data7[1]?.SectionOption,
        Point: data7[1]?.Point,
        EntryBy: data7[1]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected7Ans = selected7Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected7Ans([...uniqueSelected7Ans, newObject])
    } else if (value?.target?.name === 'otherGeder2') {
      const newObject = {
        SectionOption: data7[1]?.SectionOption,
        Point: data7[1]?.Point,
        EntryBy: data7[1]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected7Ans = selected7Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected7Ans([...uniqueSelected7Ans, newObject])
    }else if (value?.target?.name == 'dow2'){
      let index = selected7Ans.findIndex(obj => obj.SectionOption === data7[1]?.SectionOption);
      console.log("D O W 2",index)
      if (index !== -1) {
        const updatedObject = {
          ...selected7Ans[index],
          Remarks: value.target.value
        };
    
        const updatedSelected7Ans = [...selected7Ans];
        updatedSelected7Ans[index] = updatedObject;
    
        setSelected7Ans(updatedSelected7Ans);
      }
    }

    if (value?.target?.name === data7[2]?.SectionOption) {
      if (value?.target?.value.replace(/ /g, '') === 'Other') {
        setOtherGeder3(true)
      } else {
        setOtherGeder3(false)
      }

      const newObject = {
        SectionOption: data7[2]?.SectionOption,
        Point: data7[2]?.Point,
        EntryBy: data7[2]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected7Ans = selected7Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected7Ans([...uniqueSelected7Ans, newObject])
    } else if (value?.target?.name === 'otherGeder3') {
      const newObject = {
        SectionOption: data7[2]?.SectionOption,
        Point: data7[2]?.Point,
        EntryBy: data7[2]?.EntryBy,
        Result: value.target.value
      }
      const uniqueSelected7Ans = selected7Ans.filter(obj => obj.SectionOption !== newObject.SectionOption)
      setSelected7Ans([...uniqueSelected7Ans, newObject])
    }else if (value?.target?.name == 'dow3'){
      let index = selected7Ans.findIndex(obj => obj.SectionOption === data7[2]?.SectionOption);
      console.log("D O W 3",index)
      if (index !== -1) {
        const updatedObject = {
          ...selected7Ans[index],
          Remarks: value.target.value
        };
    
        const updatedSelected7Ans = [...selected7Ans];
        updatedSelected7Ans[index] = updatedObject;
    
        setSelected7Ans(updatedSelected7Ans);
      }
    }
  }

  const [AnswerdData, setAnswerdData] = useState([])

  // useEffect(() => {
  //   console.log([
  //     { ...sectionAndOptionsData[0][0], SectionOptionList: selectedAns },
  //     { ...sectionAndOptionsData[0][1], SectionOptionList: selected2Ans },
  //     { ...sectionAndOptionsData[0][2], SectionOptionList: selected3Ans },
  //     { ...sectionAndOptionsData[0][3], SectionOptionList: selected4Ans },
  //     { ...sectionAndOptionsData[0][4], SectionOptionList: selected5Ans },
  //     { ...sectionAndOptionsData[0][5], SectionOptionList: selected6Ans },
  //     { ...sectionAndOptionsData[0][6], SectionOptionList: selected7Ans }
  //   ])
  // }, [selectedAns, selected2Ans, selected3Ans, selected4Ans, selected5Ans, selected6Ans, selected7Ans])

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
  const [totalPoints, setTotalPoints] = useState([])
  useEffect(() => {
    console.log(AnswerdData)
    setTotalPoints(calculateTotalPoints(AnswerdData))
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

  const [ProgramName, setProgramName] = useState('')
  const [WeekName, setWeekName] = useState('')

  useEffect(() => {
    activeProgramData()
  }, [])

  async function activeProgramData() {
    const API_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/GetCurrentWeek`
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const res = await axios.get(API_url)
    const data = await res.data

    if (res.status == 200) {
      console.log('Get Current Week data', data)

      setProgramName(data.sessionname)
      setWeekName(data.WeekName)

      return { ok: true, data }
    } else {
      return { ok: false, err: res, data }
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
      // localStorage.setItem('wdsubmit', true)

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
      case 0: //// Back to basic
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
      case 1: // Daughter of Dignity
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <label>{sectionAndOptionsData[0][1].SectionTitle}</label>
              </Grid>
              {/* {data2.map((item2, index2) => */}
              <>
                <CustomCheckboxBasic
                  key={0}
                  data={data2[0]}
                  selected={selected2}
                  handleChange={handleChange2}
                  name='custom-checkbox-basic'
                  gridProps={{ xs: 12 }}
                  icon={icons2[0] ? icons2[0].icon : ''}
                  iconProps={icons2[0] ? icons2[0].iconProps : {}}
                />
              </>
              {data2[2]?.SectionOption === 'My Chavrusa' && chavrusaChecked == false && (
                <>
                  <Grid item xs={4}>
                    <CustomTextField
                      fullWidth
                      label={data2[2].SectionOption}
                      id='outlined-full-width'
                      sx={{ mb: 4 }}
                      placeholder={data2[2].SectionOption + ' Name'}
                      onBlur={handleChange2}
                      name='chavrusa'
                      disabled={chavrusaChecked}
                    />
                  </Grid>
                  <CustomCheckboxBasic
                    key={1}
                    data={data2[1]}
                    selected={selected2}
                    handleChange={handleChange2}
                    name='custom-checkbox-basic'
                    gridProps={{ xs: 12 }}
                    icon={icons2[1] ? icons2[1].icon : ''}
                    iconProps={icons2[1] ? icons2[1].iconProps : {}}
                  />
                </>
              )}

              {/* )} */}

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
      case 2: /// Maagalim
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
      case 3: //// Tech Check
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <label>{sectionAndOptionsData[0][3].SectionTitle}</label>
              </Grid>
              {/* {data4.map((item4, index4) => ( */}

              <CustomCheckboxBasic
                key={0}
                data={data4[0]}
                selected={selected4}
                handleChange={handleChange4}
                name='custom-checkbox-basic'
                gridProps={{ sm: 6, xs: 12 }}
                icon={icons4[0] ? icons4[0].icon : ''}
                iconProps={icons4[0] ? icons4[0].iconProps : {}}
              />

              {!techCheck && (
                <>
                  <CustomCheckboxBasic
                    key={1}
                    data={data4[1]}
                    selected={selected4}
                    handleChange={handleChange4}
                    name='custom-checkbox-basic'
                    gridProps={{ sm: 6, xs: 12 }}
                    icon={icons4[1] ? icons4[1].icon : ''}
                    iconProps={icons4[1] ? icons4[1].iconProps : {}}
                  />
                </>
              )}

              {/* ))} */}
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
      case 4: /// My Hachlata
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title={sectionAndOptionsData[0][4].SectionTitle} />
                  <CardContent>
                    {/* {data5.map((item5, index5) => ( */}
                    <CustomCheckboxBasic
                      key={0}
                      data={data5[0]}
                      selected={selected5}
                      handleChange={handleChange5}
                      name='custom-checkbox-basic'
                      gridProps={{ xs: 12 }}
                      label='My Hachlata'
                      icon={icons5[0] ? icons5[0].icon : ''}
                      iconProps={icons5[0] ? icons5[0].iconProps : {}}
                    />
                    <br />
                    {hachlata && (
                      <>
                        <b>Choose Your Hachlata</b> <br />
                        <CustomTextField select sx={{ mr: 4, mb: 2 }} onChange={handleChange5} name='hachlatalist'>
                          {hachlataData[0].map((data, i) => (
                            <MenuItem key={i} value={data.Name}>
                              {data.Name}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      </>
                    )}
                    <br />
                    {otherhachlata && (
                      <>
                        <TextField
                          fullWidth
                          rows={4}
                          multiline
                          variant='filled'
                          label='Write about your Hachlata'
                          id='textarea-filled-static'
                          sx={{ marginBottom: 5 }}
                          name='otherhachlata'
                          onBlur={handleChange5}
                        />
                      </>
                    )}
                    {/* ))} */}
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
      case 5: //// SECTION 6
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <Card>
                  <CardHeader title={sectionAndOptionsData[0][5].SectionTitle} />
                  <CardContent>
                    {/* {data6.map((item6, index6) => ( */}

                    <CustomCheckboxBasic
                      key={0}
                      data={data6[0]}
                      selected={selected6}
                      handleChange={handleChange6}
                      name='custom-checkbox-basic'
                      gridProps={{ xs: 12 }}
                      icon={icons6[0] ? icons6[0].icon : ''}
                      iconProps={icons6[0] ? icons6[0].iconProps : {}}
                    />
                    <br />

                    {/* ))} */}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <TextField
                      fullWidth
                      rows={8}
                      multiline
                      variant='filled'
                      label='Anything else you want to ask or share with the Rebbe?'
                      id='textarea-filled-static'
                      sx={{ marginBottom: 5, marginTop: '50px' }}
                      name='commentstoRebbe'
                      onBlur={handleChange6}
                    />
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
      case 6: /// Geder Moments
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <label>{sectionAndOptionsData[0][6].SectionTitle}</label>
              </Grid>

              {/* {data7.map((item7, index7) => ( */}
              {/* <> */}
              <Grid item xs={5}>
                <b> {data7[0].SectionOption}</b> : &nbsp;&nbsp;
                <CustomTextField select sx={{ mr: 4, mb: 2 }} onChange={handleChange7} name={data7[0].SectionOption}>
                  {gedermomentData[0].map((data, i) => (
                    <MenuItem key={i} value={data.Name}>
                      {data.Name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={5}>
                <b>Day of Week</b> : &nbsp;&nbsp;
                <CustomTextField select sx={{ mr: 4, mb: 2 }} onChange={handleChange7} name={'dow1'}>
                  <MenuItem key={1} value='Sunday'>
                    Sunday
                  </MenuItem>
                  <MenuItem key={2} value='Monday'>
                    Monday
                  </MenuItem>
                  <MenuItem key={3} value='Tuesday'>
                    Tuesday
                  </MenuItem>
                  <MenuItem key={4} value='Wednesday'>
                    Wednesday
                  </MenuItem>
                  <MenuItem key={5} value='Thursday'>
                    Thursday
                  </MenuItem>
                  <MenuItem key={6} value='Friday'>
                    Friday
                  </MenuItem>
                  <MenuItem key={7} value='Saturday'>
                    Saturday
                  </MenuItem>
                </CustomTextField>
              </Grid>
              <br />
              {otherGeder1 && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      rows={2}
                      multiline
                      variant='filled'
                      label='Write about your Geder Moment'
                      id='textarea-filled-static'
                      sx={{ marginBottom: 5 }}
                      name='otherGeder1'
                      onBlur={handleChange7}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={5}>
                <b> {data7[1].SectionOption}</b> : &nbsp;&nbsp;
                <CustomTextField select sx={{ mr: 4, mb: 2 }} onChange={handleChange7} name={data7[1].SectionOption}>
                  {gedermomentData[0].map((data, i) => (
                    <MenuItem key={i} value={data.Name}>
                      {data.Name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={5}>
                <b>Day of Week</b> : &nbsp;&nbsp;
                <CustomTextField select sx={{ mr: 4, mb: 2 }} onChange={handleChange7} name={"dow2"}>
                  <MenuItem key={1} value='Sunday'>
                    Sunday
                  </MenuItem>
                  <MenuItem key={2} value='Monday'>
                    Monday
                  </MenuItem>
                  <MenuItem key={3} value='Tuesday'>
                    Tuesday
                  </MenuItem>
                  <MenuItem key={4} value='Wednesday'>
                    Wednesday
                  </MenuItem>
                  <MenuItem key={5} value='Thursday'>
                    Thursday
                  </MenuItem>
                  <MenuItem key={6} value='Friday'>
                    Friday
                  </MenuItem>
                  <MenuItem key={7} value='Saturday'>
                    Saturday
                  </MenuItem>
                </CustomTextField>
              </Grid>
              <br />
              {otherGeder2 && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      rows={2}
                      multiline
                      variant='filled'
                      label='Write about your Geder Moment'
                      id='textarea-filled-static'
                      sx={{ marginBottom: 5 }}
                      name='otherGeder2'
                      onBlur={handleChange7}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={5}>
                <b> {data7[2].SectionOption}</b> : &nbsp;&nbsp;
                <CustomTextField select sx={{ mr: 4, mb: 2 }} onChange={handleChange7} name={data7[2].SectionOption}>
                  {gedermomentData[0].map((data, i) => (
                    <MenuItem key={i} value={data.Name}>
                      {data.Name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={5}>
                <b>Day of Week</b> : &nbsp;&nbsp;
                <CustomTextField select sx={{ mr: 4, mb: 2 }} onChange={handleChange7} name={"dow3"}>
                  <MenuItem key={1} value='Sunday'>
                    Sunday
                  </MenuItem>
                  <MenuItem key={2} value='Monday'>
                    Monday
                  </MenuItem>
                  <MenuItem key={3} value='Tuesday'>
                    Tuesday
                  </MenuItem>
                  <MenuItem key={4} value='Wednesday'>
                    Wednesday
                  </MenuItem>
                  <MenuItem key={5} value='Thursday'>
                    Thursday
                  </MenuItem>
                  <MenuItem key={6} value='Friday'>
                    Friday
                  </MenuItem>
                  <MenuItem key={7} value='Saturday'>
                    Saturday
                  </MenuItem>
                </CustomTextField>
              </Grid>
              <br />
              {otherGeder3 && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      rows={2}
                      multiline
                      variant='filled'
                      label='Write about your Geder Moment'
                      id='textarea-filled-static'
                      sx={{ marginBottom: 5 }}
                      name='otherGeder3'
                      onBlur={handleChange7}
                    />
                  </Grid>
                </>
              )}
              {/* </> */}
              {/* ))} */}
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
                  <CardHeader title={`${index+1}  - ${x?.SectionTitle} - Total Points: ${totalPoints[index]?.TotalPoint}`} />
                  <CardContent>
                    <b>Selected Options:</b>
                    <ul>
                      {x?.SectionOptionList?.map((option, idx) => (
                        <>
                          <li key={idx}>{option?.SectionOption} - &nbsp;Point:{option?.Point}</li>
                          {
                            (option?.SectionOption == "My Chavrusa" ||option?.SectionOption == "Hachlata" ||option?.SectionOption == "Remarks" ||option?.SectionOption == "Geder Moment1" ||option?.SectionOption == "Geder Moment2" ||option?.SectionOption == "Geder Moment3" )&& 
                            <ul> 
                              <li key={idx}>
                                {option?.Result}
                              </li>
                              {
                                (option?.SectionOption == "Geder Moment1" ||option?.SectionOption == "Geder Moment2" ||option?.SectionOption == "Geder Moment3") && 
                                <li key={idx}>Day of week : {option?.Remarks}</li>
                              }
                             </ul>
                            
                          }
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
      {localStorage.getItem('wdsubmit') ? (
        <CardContent>Sorry, Weekly Duch already submitted</CardContent>
      ) : (
        <>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      p: 1,
                      pb: 3,
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Grid item xs={6}>
                      <Box sx={{ mr: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                          <Icon fontSize='1.75rem' icon='tabler:checkbox' />
                        </CustomAvatar>
                        <div>
                          <Typography variant='body2'>Active Program</Typography>
                          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{ProgramName}</Typography>
                        </div>
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={{ mr: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                          <Icon fontSize='1.75rem' icon='tabler:ad-2' />
                        </CustomAvatar>
                        <div>
                          <Typography variant='body2'>Current Week</Typography>
                          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{WeekName}</Typography>
                        </div>
                      </Box>
                    </Grid>

                    {/* <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                Active Program:
                    Current Week:
                </Box> */}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <CardContent>{renderContent()}</CardContent>
        </>
      )}

      {/* Reset  */}
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

      {/* Submission  */}
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
