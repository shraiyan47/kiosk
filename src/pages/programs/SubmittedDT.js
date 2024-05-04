/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, CardContent, CardHeader, Dialog, Divider, Grid, Select, Typography } from '@mui/material'
import React, { Fragment, forwardRef, useEffect, useRef, useState } from 'react'
// import TableHeader from '../masterdata/TableHeader'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import CustomTextField from 'src/@core/components/mui/text-field'
import EcommerceStatistics from './old_program'
import {
  WeeklyPointsList,
  clearWeeklyPointsList,
  cleargedermomentsList,
  clearhachlatasList,
  gedermomentsList,
  hachlatasList
} from 'src/redux/weeklyduch/submissionSlice'

// Required For Dialoge
import Fade from '@mui/material/Fade'
import { clearWdSubOptionsReport, wdSubOptionsReport } from 'src/redux/weeklyduch/wdSubReportSlice'
import StepperLinearWithValidation from '../weekly-duch'
import { clearWeeklyduchlist, weeklyduchsList } from 'src/redux/weeklyduch/weeklyduchSlice'
import { useAuth } from 'src/hooks/useAuth'
import Print from 'react-to-print'
import * as ReactDOMServer from 'react-dom/server'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

function SubmittedDT() {
  const [allUsers, setAllUsers] = useState([])
  const [ReportLoading, setReportLoading] = useState(false)
  const [ReportData, setReportData] = useState([])
  const [SelectedWeekData, setSelectedWeekData] = useState([])

  const [LOADING, setLOADING] = useState(false)
  const [viewReport, setViewReport] = useState(false)
  const [filter, setFilter] = useState('')
  const [filterSubmitted, setfilterSubmitted] = useState('Submitted')
  const [WDDataWithOptions, setWDDataWithOptions] = useState([])
  const [allUsers2, setAllUsers2] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const CurrentWeekData = useSelector(state => state.weeklyduchs.currentWeek)
  
  const allWeekOfProgram = useSelector(state => state.submissions.allWeekOfProgram)
  const [wdSubForm, setWdSubForm] = useState(false)
  const [wdSubConfirm, setWdSubConfirm] = useState(false)
  const [wdSubData, setWdSubData] = useState([])
  const [allProgramList, setAllProgramList] = useState([])
  const [selectedProgram, setSelectedProgram] = useState()
  const [selectedProgramName, setSelectedProgramName] = useState()

  const [allWeekList, setAllWeekList] = useState([])
  const [selectedWeek, setSelectedWeek] = useState(CurrentWeekData[0]?.WeekId)
  const [selectedWeekName, setSelectedWeekName] = useState(CurrentWeekData[0]?.WeekName)
  // console.log('allWeekOfProgram -> ', allWeekOfProgram[0])
  const printRef = useRef()

  const dispatch = useDispatch()
  const auth = useAuth()
  useEffect(() => {
    const x = { target: { value: filterSubmitted } }
    filterSubmissionHandler(x)
    console.log('allUsers ->', allUsers, selectedWeekName)
    allprogramListFromAPI()
  }, [selectedWeek, wdSubConfirm])

  function filterSubmissionHandler(x) {
    console.log('filter data')
    const filter = x.target.value
    console.log('filter', filter)
    console.log('CurrentWeekData', CurrentWeekData)
    console.log('setSelectedWeek', selectedWeek)
    console.log('setSelectedSession', selectedProgram)
    setfilterSubmitted(filter)
    // alert(filter)
    if (filter === 'Submitted') {
      setLOADING(true)
      weeklyUserData(CurrentWeekData)
    } else if (filter === 'Not Submitted') {
      setLOADING(true)
      weeklyNotSubmittedUserData(CurrentWeekData)
    }
  }

  async function weeklyUserData(params) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/GetWeekWiseUserDetails?SessionId=${selectedProgram}&WeekId=${selectedWeek}` // Active students membership
      )

      if (res.status === 200) {
        const WeekWiseUser = res.data

        const updatedData = WeekWiseUser.map(item => {
          return {
            ...item,
            id: item.userId
          }
        })

        setAllUsers(updatedData)
        setAllUsers2(updatedData)
        console.log(' Get Week Wise User Details COUNT -> :', updatedData) //
        setLOADING(false)
      } else {
        setLOADING(false)
        throw new Error(`API request failed with status ${response.status}`)
      }
    } catch (err) {
      console.error('Error fetching ALL WEEK OF PROGRAM data:', err)
      setLOADING(false)

      return { ok: false, err: err }
    }
  }

  async function weeklyNotSubmittedUserData(params) {
    try {
      setLOADING(true)

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/GetWeekWiseMisssUser?SessionId=${selectedProgram}&WeekId=${selectedWeek}` // Active students membership
      )

      if (res.status === 200) {
        const WeekWiseUser = res.data

        const updatedData = WeekWiseUser.map(item => {
          return {
            ...item,
            id: item.userId
          }
        })

        setAllUsers(updatedData)
        setAllUsers2(updatedData)
        console.log(' Get Week Wise User Details COUNT -> :', updatedData) //
        setLOADING(false)
      } else {
        setLOADING(false)
        throw new Error(`API request failed with status ${response.status}`)
      }
    } catch (err) {
      console.error('Error fetching ALL WEEK OF PROGRAM data:', err)
      setLOADING(false)

      return { ok: false, err: err }
    }
  }

  function handleFilter(para) {
    console.log('Param ->', para)
    setFilter(para)
    const searchQuery = para

    // Filter the `allUser` array based on the search query
    const filteredUsers = allUsers2.filter(user => {
      if (!user) return false

      const { userId = '', fullname = '' } = user

      const lowercaseQuery = searchQuery ? searchQuery.toLowerCase() : ''

      return (
        (fullname && fullname.toLowerCase().includes(lowercaseQuery)) ||
        (userId && userId.toLowerCase().includes(lowercaseQuery))
      )
    })

    setAllUsers(filteredUsers)
  }

  const renderUserRoleOptions = () => {
    // return allWeekOfProgram[0]?.map(item => (
    //   <option key={item.WeekId} value={item.WeekId}>
    //     {item.WeekName}
    //   </option>
    // ))

    return allWeekList.map(item => (
      <option key={item.WeekId} value={item.WeekId}>
        {item.WeekName}
      </option>
    ))
  }

  async function allprogramListFromAPI() {   
    
    //// POINT SUMMERY OF PROGRAM
    try {
      const resWeekPoints = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/Session`
      )

      if (resWeekPoints.status === 200) {
        console.log("Program List", resWeekPoints.data)
         setAllProgramList(resWeekPoints.data)    
         setSelectedProgram(resWeekPoints.data[0].Id)
         setSelectedProgramName(resWeekPoints.data[0].sessionname)     
         allWeekListFromAPI(resWeekPoints.data[0].Id)
         
      } else {
        throw new Error(`API request failed with status ${response.status}`)
      }
    } catch (err) {
      console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

      return { ok: false, err: err }
    }
  }

  async function allWeekListFromAPI(SessionId) {   
    
    //// POINT SUMMERY OF PROGRAM
    try {
      const resWeekPoints = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/Week?SessionId=${SessionId}`
      )

      if (resWeekPoints.status === 200) {
        console.log("Week List", resWeekPoints.data)
        setAllWeekList(resWeekPoints.data)    
        // setSelectedProgram(resWeekPoints.data[0].Id)
        // setSelectedProgramName(resWeekPoints.data[0].sessionname)     
         
      } else {
        throw new Error(`API request failed with status ${response.status}`)
      }
    } catch (err) {
      console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

      return { ok: false, err: err }
    }
  }

  const renderAllProgramOptions = () => {
    console.log("allprogram", allProgramList.length)
    console.log("Program Name", selectedProgram, selectedProgramName)
    // Check if allProgramList is an array and not null or undefined
  if (Array.isArray(allProgramList) && allProgramList.length > 0) {
    // Assuming allProgramList[0] is an array of objects
    return allProgramList.map(item => (
      <option key={item.Id} value={item.Id}>
        {item.sessionname}
      </option>
    ));
  } else {
    // Handle the case where allProgramList is not valid
    return null; // Or return some default options or an error message
  }
  }

  function handleFullReport(params) {
    let x = params.split(',')
    // alert(x)
    setReportData(x)
    if (x[x.length - 1] === 'summary') {
      dispatchReportData(x)
    } else if (x[x.length - 1] === 'details') {
      handleWDOptions(x)
    }

    async function dispatchReportData(xaram) {
      setReportLoading(true)
      
      //// POINT SUMMERY OF PROGRAM
      try {
        const resWeekPoints = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/GetPointSummaryByWeekList?UserAccountId=${xaram[0]}&WeekId=${xaram[1]}`
        )

        if (resWeekPoints.status === 200) {
          const data = resWeekPoints.data

          const allWeekPoints = {
            weekPoints: data
          }

          dispatch(clearWeeklyPointsList())

          dispatch(WeeklyPointsList(allWeekPoints))
          // alert("LOL")
          console.log('SUBMITTED WEEK POINT DETAILS :', allWeekPoints) // Use a logger for informative messages

          setReportLoading(false)
          setViewReport(true)
        } else {
          throw new Error(`API request failed with status ${response.status}`)
        }
      } catch (err) {
        console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

        return { ok: false, err: err }
      }
    }

    async function handleWDOptions(xaram) {
      //// POINT SUMMERY OF PROGRAM
      try {
        const resWeekPoints = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/SectionMapUserDetails?UserAccountId=${xaram[0]}&WeekId=${xaram[1]}`
        )

        if (resWeekPoints.status === 200) {
          const data = resWeekPoints.data

          const allWeekPoints = {
            wdSubOptReport: data
          }

          dispatch(clearWdSubOptionsReport())

          dispatch(wdSubOptionsReport(allWeekPoints))

          setWDDataWithOptions(data)

          // alert("LOL")
          console.log('SUBMITTED WEEK DETAILS WITH OPTIONS --> ', data) // Use a logger for informative messages

          setReportLoading(false)
          setViewReport(true)
        } else {
          throw new Error(`API request failed with status ${response.status}`)
        }
      } catch (err) {
        console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

        return { ok: false, err: err }
      }
    }

  }

  function handleWeeklyDuchSubmission(params) {
    let data = params.split(',')
    console.log(' XXXXXXXXXX +> ', params)
    console.log(' XXXXXXXXXX +> ', allWeekOfProgram[0])

    // setSelectedWeekData(allWeekOfProgram[0].find(x => x.WeekId == data[1]))
    setSelectedWeekData(allWeekList.find(x => x.WeekId == data[1]))
    setWdSubForm(true)
    setWdSubData(data)
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 240,
      field: 'id',
      headerName: 'ID',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row.userId}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 240,
      field: 'fullname',
      headerName: 'Full Name',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row.fullname}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'Point',
      minWidth: 100,
      headerName: 'Point',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.Point}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.5,
      field: 'Action',
      minWidth: 80,
      headerName: 'Action',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {filterSubmitted === 'Not Submitted' && (
              <Button
                onClick={x => handleWeeklyDuchSubmission(x.target.value)}
                value={[row.UserAccountId, selectedWeek, selectedProgram, row.fullname, selectedWeekName]}
                variant='contained'
                sx={{ mx: 2 }}
                color='success'
              >
                Submit WD
              </Button>
            )}
            {filterSubmitted === 'Submitted' && (
              <>
                <Button
                  onClick={x => handleFullReport(x.target.value)}
                  value={[row.UserAccountId, selectedWeek, selectedProgram, row.fullname, 'summary']}
                  variant='contained'
                  sx={{ mx: 2 }}
                >
                  Summary
                </Button>

                <Button
                  onClick={x => handleFullReport(x.target.value)}
                  value={[row.UserAccountId, selectedWeek, selectedProgram, row.fullname, 'details']}
                  variant='contained'
                >
                  Full Report
                </Button>
              </>
            )}
          </Box>
        )
      }
    }
  ]

  useEffect(() => {
    // setLOADING(true)
    // // // MasterSection // // //
    async function FetchWDSectionOptions(params) {
      try {
        const response4 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSection?Stauts=all`)
        const aaZara = response4.data

        console.log("Master Section ====> ",aaZara)

        const secData = aaZara.map(item => ({
          // ...item,
          SectionTitle: item.Name,
          SessionId: selectedProgram,
          UserAccountId: auth?.user?.Id,
          WeekId: CurrentWeekData[0]?.WeekId,
          Point: item.Point,
          EntryBy: auth?.user?.userId,
          IsActive: item.IsActive
        }))

        console.log('aaZara ==> ', secData)

        const requests = aaZara.map(x =>
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSectionDetailsBySectionId?SectionId=${x.Id}`)
        )

        const response4Data = await Promise.all(requests)

        const combinedData = response4Data.map((res, index) => {
          const obj = {
            ...secData[index],
            SectionOptionList: [] // Initialize empty array
          }

          res.data.forEach(data => {
            obj.SectionOptionList.push({
              SectionOption: data.Name,
              Point: data.Point,
              EntryBy: auth?.user?.userId,
              Id: data.Id,
              IsActive: data.IsActive
            })
          })

          return obj
        })

        const weeklyduchDispatch = {
          sectionAndOptions: combinedData
        }

        dispatch(clearWeeklyduchlist())

        dispatch(weeklyduchsList(weeklyduchDispatch))

        console.log('Combined Data: ', weeklyduchDispatch)

        return combinedData
      } catch (error) {
        console.error('Error fetching data: ', error)
        // throw error
      }
    }

    async function fetchHachlataGedderMomentData() {
      try {
        const resHachlata = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterChild/GetAllByAccesskey?Accesskey=HA`
        )

        const resGedder = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterChild/GetAllByAccesskey?Accesskey=GM`
        )

        if (resHachlata.status === 200) {
          const data = resHachlata.data

          const HachlataDispatch = {
            hachlata: data
          }

          dispatch(clearhachlatasList())

          dispatch(hachlatasList(HachlataDispatch))
          console.log('Fetched Hachlata data:', data) // Use a logger for informative messages
        } else {
          throw new Error(`API request failed with status ${response.status}`)
        }

        if (resGedder.status === 200) {
          const data = resGedder.data

          const GedderDispatch = {
            gedermoment: data
          }

          dispatch(cleargedermomentsList())

          dispatch(gedermomentsList(GedderDispatch))

          console.log('Fetched Gedder Moment data:', data) // Use a logger for informative messages
        } else {
          throw new Error(`API request failed with status ${response.status}`)
        }
        // setLOADING(false)
      } catch (err) {
        console.error('Error fetching active program data:', err)
        // setLOADING(false)

        return { ok: false, err: err }
      }
    }
    if (filterSubmitted === 'Not Submitted') {
      FetchWDSectionOptions()
      fetchHachlataGedderMomentData()
    }
  }, [filterSubmitted])

  async function printAllWDHandler(params) {
    alert('UNDER DEVELOPMENT')
    console.log('Print All WD May Take Time')
    //// POINT SUMMERY OF PROGRAM
    try {
      const resWeekPoints = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/SectionMapUserDetailsAll?WeekId=${xaram[1]}`
      )

      if (resWeekPoints.status === 200) {
        const data = resWeekPoints.data
      } else {
        throw new Error(`API request failed with status ${response.status}`)
      }
    } catch (err) {
      console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

      return { ok: false, err: err }
    }
  }

  function wdSubmissionHandler(params) {
    // alert(params)
    setWdSubConfirm(params)
    if (params == true) {
      setWdSubForm(false)
    }
  }

  const handlePrint = () => {
    const report = (
      <>
        {' '}
        <Typography variant={'h1'} align={'center'} sx={{ p: 4 }}>
          {' '}
          {ReportData[3]}{' '}
        </Typography>
        <Typography variant={'h6'} align={'center'} sx={{ p: 4 }}>
          {' '}
          {'PROGRAM NAME :' + CurrentWeekData[0]?.sessionname + ' || WEEK : ' + selectedWeekName}{' '}
        </Typography>
        <Fragment>
          {' '}
          <Grid container spacing={3} sx={{ p: 5 }}>
            {' '}
            <Grid item xs={12}>
              {' '}
              <div id='report-content'>
                {WDDataWithOptions?.map((x, index) => (
                  <Card key={index} sx={{ mt: 3 }}>
                    {' '}
                    <CardHeader title={`${index + 1}  - ${x?.SectionTitle}`} />{' '}
                    <CardContent>
                      {' '}
                      <b>Selected Options:</b>{' '}
                      <ul>
                        {' '}
                        {x?.SectionOptionList?.map((option, idx) => (
                          <>
                            {' '}
                            <li key={idx}>
                              {' '}
                              {option?.SectionOption} - &nbsp;{' '}
                              {option?.SectionOption == 'I covered my elbows completely at all times.' ||
                              option?.SectionOption == 'I covered my collarbone completely at all times.' ||
                              option?.SectionOption == 'I covered my knees completely at all times'
                                ? `Special Points: ${option?.SpecialPoint}`
                                : `Points: ${option?.Point}`}{' '}
                            </li>{' '}
                            {(option?.SectionOption == 'My Chavrusa' ||
                              option?.SectionOption == 'Hachlata' ||
                              option?.SectionOption == 'Remarks' ||
                              option?.SectionOption == 'Geder Moment1' ||
                              option?.SectionOption == 'Geder Moment2' ||
                              option?.SectionOption == 'Geder Moment3') && (
                              <ul>
                                {' '}
                                <li key={idx}>{option?.Result}</li>{' '}
                                {(option?.SectionOption == 'Geder Moment1' ||
                                  option?.SectionOption == 'Geder Moment2' ||
                                  option?.SectionOption == 'Geder Moment3') && (
                                  <li key={idx}>Day of week : {option?.Remarks}</li>
                                )}{' '}
                              </ul>
                            )}{' '}
                          </>
                        ))}{' '}
                      </ul>{' '}
                    </CardContent>{' '}
                  </Card>
                ))}{' '}
              </div>{' '}
            </Grid>{' '}
          </Grid>
        </Fragment>
      </>
    )

    const renderedHtml = ReactDOMServer.renderToString(report)
    const printWindow = window.open('', '_blank')
    printWindow.document.open()
    printWindow.document.write(
      '<div  id="report-content" width="1000" style="padding:30px">' +
        renderedHtml +
        '</div> <script> function printReport() {   const printContent = document.getElementById("report-content");   if (printContent) { window.print();  window.close();   } }window.onload = printReport; </script>'
    )
    printWindow.document.close()
  }

  const handleProgramChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const selectedProgramId = selectedOption.value;
    const selectedProgramName = selectedOption.text;
    console.log("selected Program", selectedProgram)
    setSelectedProgram(selectedProgramId);
    setSelectedProgramName(selectedProgramName);
    allWeekListFromAPI(selectedOption.value)
  };

  return (
    <>
      <Grid container spacing={6.5}>
      <Grid item xs={2}>
          <CustomTextField
            select
            value={selectedProgram}
            onChange={handleProgramChange}

            // onChange={x => {
            //   setSelectedProgram(x.target.value)
            //   setSelectedProgramName(x.target.selectedOptions[0].text)
            // }}
            fullWidth
            id='program-select'
            label='Program List'
            sx={{ mb: 4 }}
            SelectProps={{
              native: true // For Material-UI native Select
            }}
          >
            <option>Select Program</option>
            {renderAllProgramOptions()}
          </CustomTextField>
        </Grid>
        <Grid item xs={2}>
          <CustomTextField
            select
            value={selectedWeek}
            onChange={x => {
              setSelectedWeek(x.target.value)
              setSelectedWeekName(x.target.selectedOptions[0].text)
            }}
            fullWidth
            id='userrole-select'
            label='Week List'
            sx={{ mb: 4 }}
            SelectProps={{
              native: true // For Material-UI native Select
            }}
          >
            <option>Select Week</option>
            {renderUserRoleOptions()}
          </CustomTextField>
        </Grid>
        <Grid item xs={4}>
          <CustomTextField
            value={filter}
            fullWidth
            sx={{ mr: 4 }}
            placeholder='Search User ID'
            onChange={e => handleFilter(e.target.value)}
            label='Search by User Id'
          />
        </Grid>
        <Grid item xs={2}>
          <CustomTextField
            select
            value={filterSubmitted}
            onChange={x => filterSubmissionHandler(x)}
            fullWidth
            label='Filter'
            sx={{ mb: 4 }}
            SelectProps={{
              native: true // For Material-UI native Select
            }}
          >
            <option value='Submitted' selected>
              Submitted
            </option>
            <option value='Not Submitted'>Not Submitted</option>
          </CustomTextField>
        </Grid>
        <Grid item xs={2}>
          <Button variant='outlined' sx={{ mt: 5 }} size='small' onClick={() => printAllWDHandler()}>
            Print All WD
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Divider sx={{ m: '0 !important' }} />
          {/* <TableHeader masterid={masterid} value={value} handleaddmasterdatastatus={masterdatastatusOnChange} handleFilter={handleFilter} ProgramType={userListHandler} /> */}
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={allUsers}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[2, 3, 4, 10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            loading={LOADING}
          />
        </Grid>
      </Grid>
      {viewReport && ReportLoading ? (
        'LOADING'
      ) : (
        <>
          <Dialog
            fullWidth
            open={viewReport}
            maxWidth='md'
            scroll='body'
            onClose={() => setViewReport(false)}
            TransitionComponent={Transition}
            // onBackdropClick={() => setShow(false)}
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
          >
            <Typography variant={'h1'} align={'center'} sx={{ p: 4 }}>
              {ReportData[3]}
              <Button
                variant='contained'
                onClick={handlePrint}
                style={{ float: 'right', marginRight: '0px', marginTop: '10px' }}
              >
                PRINT
              </Button>
            </Typography>
            {ReportData[ReportData.length - 1] == 'summary' ? (
              <EcommerceStatistics />
            ) : (
              ReportData[ReportData.length - 1] == 'details' && (
                <>
                  <Fragment>
                    <Grid container spacing={3} sx={{ p: 5 }}>
                      <Grid item xs={12}>
                        {
                          // JSON.stringify(WDDataWithOptions)
                        }
                        {WDDataWithOptions?.map((x, index) => (
                          <Card key={index} sx={{ mt: 3 }}>
                            {/* <CardHeader
                            title={`${index + 1}  - ${x?.SectionTitle} - Total Points: 
                            ${totalPoints[index]?.TotalPoint}
                            `}
                          /> */}
                            <CardHeader title={`${index + 1}  - ${x?.SectionTitle}`} />
                            <CardContent>
                              <b>Selected Options:</b>
                              <ul>
                                {x?.SectionOptionList?.map((option, idx) => (
                                  <>
                                    <li key={idx}>
                                      {option?.SectionOption} - &nbsp;
                                      {option?.SectionOption == 'I covered my elbows completely at all times.' ||
                                      option?.SectionOption == 'I covered my collarbone completely at all times.' ||
                                      option?.SectionOption == 'I covered my knees completely at all times'
                                        ? `Special Points: ${option?.SpecialPoint}`
                                        : `Points: ${option?.Point}`}
                                    </li>

                                    {(option?.SectionOption == 'My Chavrusa' ||
                                      option?.SectionOption == 'Hachlata' ||
                                      option?.SectionOption == 'Remarks' ||
                                      option?.SectionOption == 'Geder Moment1' ||
                                      option?.SectionOption == 'Geder Moment2' ||
                                      option?.SectionOption == 'Geder Moment3') && (
                                      <ul>
                                        <li key={idx}>{option?.Result}</li>
                                        {(option?.SectionOption == 'Geder Moment1' ||
                                          option?.SectionOption == 'Geder Moment2' ||
                                          option?.SectionOption == 'Geder Moment3') && (
                                          <li key={idx}>Day of week : {option?.Remarks}</li>
                                        )}
                                      </ul>
                                    )}
                                  </>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </Grid>
                    </Grid>
                  </Fragment>
                </>
              )
            )}
          </Dialog>

          <Dialog
            fullWidth
            open={wdSubForm}
            maxWidth='xl'
            scroll='body'
            onClose={() => setWdSubForm(false)}
            TransitionComponent={Transition}
            // onBackdropClick={() => setShow(false)}
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
          >
            <StepperLinearWithValidation from={'admin'} userData={wdSubData} wdSubmission={wdSubmissionHandler} weekData={SelectedWeekData} />
          </Dialog>
        </>
      )}
    </>
  )
}

export default SubmittedDT