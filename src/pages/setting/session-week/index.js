// eslint-disable-next-line react-hooks/exhaustive-deps
/* eslint-disable react/jsx-key */
/* eslint-disable newline-before-return */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback, forwardRef } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import axios, { Axios } from 'axios'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { styled, IconButton, CardContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Fade from '@mui/material/Fade'
import { Alert, AlertTitle } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CircularProgress from '@mui/material/CircularProgress'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// ** Custom Component Import

// ** Third Party Imports
import DatePicker from 'react-datepicker'

import CustomAvatar from 'src/@core/components/mui/avatar'
import { maxWidth } from '@mui/system'

const index = () => {
  const [openAlert, setOpenAlert] = useState(true)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [AllWeek, setAllWeek] = useState([])
  const [AllWeek1, setAllWeek1] = useState([])
  const [AllSection, setAllSection] = useState([])
  const [Sessionid, setSessionid] = useState(1)
  const [value, setValue] = useState([])
  const [adddialogopen, setadddialogopen] = useState(false)
  const [SessionDialogOpen, setSessionDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [WeekId, setWeekId] = useState(0)
  const [ProgramDate, setProgramDate] = useState(new Date())
  const [ProgramName, setProgramName] = useState('')
  const [WeekData, setWeekData] = useState()
  const [NumberOfWeek, setNumberOfWeek] = useState(0)
  const [WeekName, setWeekName] = useState('')

  // some reference add
  const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
  })

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} sx={{ width: { sm: '250px', xs: '170px' } }} {...props} />
  })

  const CustomCloseButton = styled(IconButton)(({ theme }) => ({
    top: 0,
    right: 0,
    color: 'grey.500',
    position: 'absolute',
    boxShadow: theme.shadows[2],
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.background.paper} !important`,
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
      transform: 'translate(7px, -5px)'
    }
  }))

  // default program load
  useEffect(() => {
    function fetchsessionweekdata() {
      activeProgramData().then(resdata => {
        console.log('data', resdata)
        if(!!resdata.data.SessionId){
          fetchWeekData(resdata.data.SessionId)
        }
      })
      loadsessiondata()
    }
    fetchsessionweekdata()
  }, [])

  const loadsessiondata = () => {
    fetchSessionData().then(resdata => {
      console.log('data', AllSection)
      const foundobj = resdata.data.find(obj => obj.IsActive === true)
      // console.log('foundobj', foundobj, foundobj.Id, foundobj.sessionname)

      // Use the functional form to update the state
      // setSessionid(prevSessionId => {
      //   // Use a default value if foundobj is undefined
      //   return foundobj ? foundobj.Id : prevSessionId;
      // });

      // setProgramName(foundobj.sessionname);
      // setSessionid(foundobj.Id)

      // setName1('test1');

      // console.log("setName1", name1);
      console.log('sessionId', Sessionid)
      console.log('ProgramName', ProgramName)
      // alert(ProgramName)
      // alert(Sessionid)
    })
  }

  const resetdata = () => {
    setName('')
    setInputFields([])
  }

  // Program add event fire
  const handleClickOpen = () => {
    setName('')
    if (!SessionDialogOpen) {
      setSessionDialogOpen(true)
    }
  }

  // Grid search event fire
  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  // condition base Grid search event fire
  useEffect(() => {
    const searchQuery = value

    const filteredUsers = AllWeek1.filter(user => {
      console.log('WTF --> ', user)

      return user.name.toLowerCase().includes(searchQuery.toLowerCase())
    })
    setAllWeek(filteredUsers)
  }, [value])

  // Master program edit event fire
  const handleSessionEdit = () => {
    // console.log("Session Row", Sessionid);
    // console.log("All session", AllSection)
    const result = AllSection.find(item => item.id === Sessionid)
    // console.log("Session", result)
    setName(result.sessionname)
    alert(ProgramName)
    // console.log("Name1",name1)
    // setName1("final")
    // console.log("Name1",name1)
    // console.log("program",ProgramName)
    // setProgramName('final program')
    // console.log("program1",ProgramName)
    // alert(name1)
    // if(!SessionDialogOpen)
    // {
    //   setSessionDialogOpen(true);
    // }
    if (!adddialogopen) {
      setadddialogopen(true)
    }
  }

  // dropdown event fire
  const handleSessionList = value => {
    // Only call the setShow() function if the state needs to be changed
    //console.log("value", value.Id)
    //setSessionid(...Sessionid,value.Id);
    //console.log(Sessionid)
    // setSessionid(value.Id);
    console.log('select Session Id ', value)
    if(!!value.Id){
      fetchWeekData(value.Id)
    }
  }

  // export Grid columns  list
  const columns = [
    {
      flex: 0.25,
      minWidth: 100,
      field: 'id',
      headerName: 'id',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row?.id}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 240,
      field: 'WeekName',
      headerName: 'WeekName',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row?.WeekName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      type: 'date',
      minWidth: 120,
      headerName: 'Date',
      field: 'start_date',
      // valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params?.row?.StartDt}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'EndDt',
      headerName: 'EndDt',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row?.EndDt}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'IsActive',
      headerName: 'Active',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row?.IsActive}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleClickEdit(row)}>
            <Icon icon='tabler:edit' />
          </IconButton>
        </Box>
      )
    }
  ]

  // API Section
  async function fetchWeekData(sessionid) {
    const my_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/Week?SessionId=${sessionid && sessionid}`
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    // const params = {
    //   SessionId: Sessionid
    // }
    // const requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow',
    //   body: JSON.stringify(params)
    // }
    console.log('fetch Week session Id', typeof sessionid)
    // const params = new URLSearchParams([['SessionId', sessionid]]);
    //alert(params)
    const res = await axios.get(my_url)
    const data = await res.data
    console.log('session-week', data)
    if (res.status == 200) {
      setAllWeek(
        Object.values(data).map((row, index) => ({
          ...row,
          id: row.WeekId // You can use a different logic for generating unique IDs if needed
          //StartDt: row.StartDt.toLocaleDateString("en-US"),
          //StartDt1: new Date(row.StartDt).toLocaleDateString()
        }))
      )
      setAllWeek1(
        Object.values(data).map((row, index) => ({
          id: row?.WeekId, // You can use a different logic for generating unique IDs if needed
          ...row
        }))
      )
      console.log('All Week ------------------ > ', AllWeek)
      return { ok: true, data }
    } else {
      return { ok: false, err: res, data }
    }
  }
  async function fetchSessionData() {
    const API_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/Session`
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    const params = {
      Stauts: 'all',
      MasterId: Sessionid
    }

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      // body: JSON.stringify(params)
    }

    const res = await axios.get(API_url)
    const data = await res.data
    console.log('res', res)
    if (res.status == 200) {
      setAllSection(
        Object.values(data).map((row, index) => ({
          id: row.Id, // You can use a different logic for generating unique IDs if needed
          ...row
        }))
      )

      return { ok: true, data }
    } else {
      return { ok: false, err: res, data }
    }
  }

  async function activeProgramData() {
    // console.log("AllSection", AllSection)
    // const foundobj = AllSection.find(obj => {
    //   return obj.IsActive === true;
    // });
    // console.log("data", foundobj)
    const API_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/GetCurrentWeek`
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const res = await axios.get(API_url)
    const data = await res.data

    if (res.status == 200) {
      console.log('current data', data)
      // setWeekData(Object.values(data).map((row, index) => ({
      //   id: row.Id, // You can use a different logic for generating unique IDs if needed
      //   ...row
      // }))
      //)
      setProgramName(data.sessionname)
      setWeekName(data.WeekName)
      setSessionid(data.SessionId)
      console.log('active session Id', Sessionid, data.SessionId)
      return { ok: true, data }
    } else {
      return { ok: false, err: res, data }
    }
  }

  const postWeekData = async param => {
    console.log('param1', param)
    const my_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/Week`
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    let res = {}
    if (param.Id == 0) {
      res = await axios.post(my_url, param)
    } else {
      res = await axios.put(my_url, param)
    }
    console.log(res)
    //const data = await res.json()
    if (res.status == 200) {
      // dispatch(usersList(userDispatch))
      //setShow(false)
      alert('Successfully save your data')
      if(!!Sessionid){
        fetchWeekData(Sessionid)
      }
      setadddialogopen(false)
      return { ok: true }
    } else {
      // console.log('ERROR => ', data.error)
      alert('System Error')
      return { ok: false }
    }
  }

  const postSessionData = async param => {
    console.log('param1', param)
    const my_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/Session`
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    let res = {}
    res = await axios.post(my_url, param)
    // if(param.Id == 0)
    // {
    //    res = await axios.post(my_url, param)
    // }
    // else {
    //   res = await axios.put(my_url, param)
    // }
    console.log(res)
    //const data = await res.json()
    if (res.status == 200) {
      // dispatch(usersList(userDispatch))
      //setShow(false)
      alert('Successfully save your data')
      //fetchData(Sessionid);
      setSessionDialogOpen(false)
      // fetchSessionData();
      // fetchsessionweekdata();
      activeProgramData().then(resdata => {
        console.log('data', resdata)
        if(!!resdata.data.SessionId){
          fetchWeekData(resdata.data.SessionId)
        }
        loadsessiondata()
        resetdata()
      })

      return { ok: true }
    } else {
      // console.log('ERROR => ', data.error)
      alert('System Error')
      return { ok: false }
    }
  }

  // END API Section

  // SessionDialogOpen as Entry dialog open
  const handleSessionDialogClose = () => {
    setSessionDialogOpen(false)
  }
  const [loaderVisible, setLoaderVisible] = useState(false)

  const handleSessionSubmit = e => {
    setLoaderVisible(true)
    e.preventDefault()
    var ProgramStartDt = ProgramDate.toLocaleDateString('en-US')
    const list = [...inputFields]

    const newlist = list.map(element => ({
      name: element.fullName
    }))

    let data = {}
    data.sessionname = name
    data.ProgramDt = ProgramDate.toDateString('en-US')
    data.NumberofWeek = NumberOfWeek
    //data.Id = Sessionid;
    data.EntryBy = 'sysadmin'
    //data.WeekList = newlist;
    if (data.sessionname != '' && data.ProgramDt != '' && data.NumberofWeek != 0) {
      //console.log(data)
      setLoaderVisible(false)
      postSessionData(data)
    } else {
      setLoaderVisible(false)
      alert('Program Name , Program Start Dt and Week List Empty not allow')
    }
  }

  // start dynamic textbox addd arrary

  const [inputFields, setInputFields] = useState([
    {
      fullName: ''
    }
  ])

  const addInputField = e => {
    e.preventDefault()
    setInputFields([
      ...inputFields,
      {
        fullName: ''
      }
    ])
    console.log('add input section')
  }

  const removeInputFields = index => {
    const rows = [...inputFields]
    rows.splice(index, 1)
    setInputFields(rows)
  }

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target
    const list = [...inputFields]
    list[index][name] = value
    setInputFields(list)
    console.log('dynamic value', [...inputFields])
  }

  // End SessionDialogOpen as Entry dialog open
  // start 2nd dialog option Edit master and Week
  const handleadddialogClose = () => {
    setadddialogopen(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('row', WeekData)
    let data = {}
    data.name = name
    data.sessionid = Sessionid
    // data.StartDt = WeekData.StartDt;
    // data.EndDt = WeekData.EndDt;

    if (WeekId != 0) {
      data.Id = WeekId
      data.UpdateBy = 'sysadmin'
    } else {
      data.EntryBy = 'sysadmin'
    }
    //alert("sucessfully add.");
    //setOpenAlert(true);
    //postWeekData(data);
    //alert(JSON.stringify(data))
    postWeekData(data)
    //fetchWeekData();
  }

  // End 2nd dialog option Edit master and Week
  const handleClickEdit = row => {
    console.log('row', row)
    setWeekData(row)
    setName(row.WeekName)
    setWeekId(row.Id)
    if (!adddialogopen) {
      setadddialogopen(true)
    }
  }

  // close new dialog option
  // alert open and close after 3 second
  // const handleAlertClose = () => {
  //   setOpenAlert(false);
  // };

  //  setTimeout(handleAlertClose, 10000);
  return (
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
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            {/* {{value}} */}
            {/* <CardHeader title='Section List' /> */}
            <Divider sx={{ m: '0 !important' }} />
            <Box
              sx={{
                p: 5,
                pb: 3,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'inline-block' }}>
                <Autocomplete
                  // value={value}
                  // onChange={(event, newValue) => {
                  //   setValue(newValue);
                  // }}
                  onChange={(event, value) => handleSessionList(value)} // prints the selected value
                  size='small'
                  disablePortal
                  id='combo-box-demo'
                  options={AllSection}
                  //value={AllSection[2]}
                  //defaultValue={AllSection[0]}
                  defaultValue={{ sessionname: ProgramName }}
                  //defaultValue = {option => {option.sessionname, option.Id}}
                  //value={(option) => option.sessionname}
                  getOptionLabel={option => option.sessionname}
                  sx={{ width: 300, display: 'inline-block' }}
                  renderInput={params => (
                    <TextField {...params} variant='standard' label='Session List' placeholder='Favorites' />
                  )}
                />
                {/* <Box sx={{ display: 'inline-block', alignItems: 'center' }}>
                  <IconButton onClick={() => handleSessionEdit()}>
                    <Icon icon='tabler:edit' />
                  </IconButton>
                </Box> */}
              </Box>

              <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <CustomTextField
                  sx={{ mr: 4 }}
                  placeholder='Search User'
                  onChange={e => handleFilter(e.target.value)}
                />
                <Button onClick={handleClickOpen} variant='contained' sx={{ '& svg': { mr: 2 } }}>
                  <Icon fontSize='1.125rem' icon='tabler:plus' />
                  Add Program
                </Button>
              </Box>
            </Box>
            {Sessionid ? (
              <DataGrid
                autoHeight
                rowHeight={62}
                rows={AllWeek}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[2, 3, 4, 10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            ) : (
              <>
                <b>No Program Found </b>
              </>
            )}
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={adddialogopen}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleadddialogClose()
          }
        }}
        fullWidth
        disableEscapeKeyDown
      >
        <form onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <TextField
              autoFocus
              value={name}
              margin='dense'
              id='name'
              label='Name'
              type='text'
              fullWidth
              variant='standard'
              onChange={e => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleadddialogClose}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={SessionDialogOpen}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleSessionDialogClose()
          }
        }}
        fullWidth
        disableEscapeKeyDown
      >
        <form>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Grid container spacing={6.5}>
              <Grid item md={12}>
                {loaderVisible && (
                  <img
                    src='../../images/loader.gif'
                    style={{ maxWidth: '100px', position: 'absolute', top: '40%', left: 'calc( 50% - 50px)' }}
                  />
                )}

                <Box sx={{ mb: 4, textAlign: 'center' }} style={{ marginBottom: '0' }}>
                  <Typography variant='h3' sx={{ mb: 3 }}>
                    <Icon icon='tabler:plus' style={{ color: '#e7988f', fontSize: '2rem', paddingTop: '12px' }} /> Add
                    Program
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x' style={{ paddingTop: '0' }}>
                  <TextField
                    autoFocus
                    value={name}
                    id='name'
                    label='Name'
                    type='text'
                    fullWidth
                    variant='standard'
                    onChange={e => setName(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item md={6} style={{ paddingTop: '10px' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                  <div>
                    <DatePicker
                      id='issue-date'
                      selected={ProgramDate}
                      customInput={<CustomInput label='Start Date' />}
                      onChange={date => setProgramDate(date)}
                      className='custom-datepicker'
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item md={6} style={{ paddingTop: '10px' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                  <div>
                    <CustomTextField
                      type='number'
                      label='Number Of Week'
                      id='name'
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      onChange={e => setNumberOfWeek(e.target.value)}
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              {/* <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Date Issued:</Typography> */}
            </Box>
            <Box>
              {/* <button onClick={addInput}>+</button>
                {arr.map((item, i) => {
                  return (
                    <input
                      onChange={handleChange}
                      value={item.value}
                      id={i}
                      type={item.type}
                      size="40"
                    />
                  );
                })} */}

              {/*<div className="container">
                <div className="row">
                  <div className="col-sm-8">
                    {
                      inputFields.map((data, index) => {
                        const { fullName, emailAddress, salary } = data;
                        return (
                          <div className="row my-3" key={index}>
                            <div className="col">
                              <div className="form-group">
                                <input type="text" onChange={(evnt) => handleChange(index, evnt)} value={fullName} name="fullName" className="form-control" placeholder="Full Name" />
                              </div>
                            </div>

                            <div className="col">


                              {(inputFields.length !== 1) ? <button className="btn btn-outline-danger" onClick={removeInputFields}>x</button> : ''}


                            </div>
                          </div>
                        )
                      })
                    }

                    <div className="row">
                      <div className="col-sm-12">
                        <button className="btn btn-outline-success " onClick={addInputField}>Add New Week</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                </div>
              </div>*/}
            </Box>
            {/* onSubmit={handleSessionSubmit} */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSessionDialogClose}>Cancel</Button>
            <Button type='submit' onClick={handleSessionSubmit}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* <Box sx={{ position: 'relative' }}>
    
      <CircularProgress color='secondary' />
      </Box> */}
    </>
  )
}

export default index
