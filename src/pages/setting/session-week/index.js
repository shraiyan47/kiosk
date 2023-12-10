/* eslint-disable react-hooks/rules-of-hooks */
import React,{ useState, useEffect,useCallback,forwardRef } from 'react';
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
import { styled,IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Fade from '@mui/material/Fade'
import { Alert, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const options = ['Option 1', 'Option 2'];

function index() {
  const [openAlert, setOpenAlert] = useState(true);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [AllWeek, setAllWeek] = useState([])
  const [AllWeek1, setAllWeek1] = useState([])
  const [AllSection, setAllSection] = useState([])
  const [Sessionid, setSessionid] = useState(2)
  const [value, setValue] = useState([])
  const [addDialogShow, setaddDialogShow] = useState(false)
  const [adddialogopen, setadddialogopen] = useState(false)
  const [name, setName] = useState('')
  
  

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 }
  ]
  
  const columns = [
  {
      flex: 0.25,
      minWidth: 240,
      field: 'id',
      headerName: 'id',
  
      renderCell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row.id}
              </Typography>         
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 240,
      field: 'name',
      headerName: 'name',
  
      renderCell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row.name}
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
           <IconButton>
           <Icon icon='tabler:edit' />
          </IconButton>
        </Box>
      )
    }  
  ]

  useEffect(() => {
    fetchData(Sessionid)
    fetchSessionData()
    console.log("SectionList", AllSection)
    console.log("Sessionid", Sessionid)
  }, [])
  
  async function fetchData(sessionid) {
    const my_url = "https://vehayamachanechakadosh.com:8080/api/Week";
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
    const params = new URLSearchParams([['SessionId', sessionid]]);

    const res = await axios.get(my_url,{params})    
    const data = await res.data   
    // console.log("session-week",requestOptions) 
    if (res.status == 200) {
      setAllWeek(Object.values(data).map((row, index) => ({
        id: row.Id, // You can use a different logic for generating unique IDs if needed
        ...row
      })))      
      setAllWeek1(Object.values(data).map((row, index) => ({
        id: row.Id, // You can use a different logic for generating unique IDs if needed
        ...row
      })))  
      
      return { ok: true, data }
    } else {
      return { ok: false, err: res, data }
    }
  }
  async function fetchSessionData() {
    const API_url = "https://vehayamachanechakadosh.com:8080/api/Session";
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
      redirect: 'follow',
     // body: JSON.stringify(params)  
    }

    const res = await axios.get(API_url)    
    const data = await res.data  
    console.log("res",res)      
    if (res.status == 200) {
      setAllSection(Object.values(data).map((row, index) => ({
        id: row.Id, // You can use a different logic for generating unique IDs if needed
        ...row
      })))      
      
      return { ok: true, data }
    } else {
      return { ok: false, err: res, data }
    }
  }
  
  const handleSessionList = (value) => {
    // Only call the setShow() function if the state needs to be changed
    console.log("value",value.Id)    
  }
  
  const handleFilter = useCallback(val => {   
    setValue(val)
  }, [])
  
  useEffect(() => {
    const searchQuery = value   
    
    const filteredUsers = AllWeek1.filter(user => {   
      console.log(user)  
      
      return (        
        user.name.toLowerCase().includes(searchQuery.toLowerCase())              
      )
    })
    setAllWeek(filteredUsers)
  }, [value]) 
  
  
  // add new dialog option
  const handleClickOpen = () => {
    setadddialogopen(true);
  };

  const handleadddialogClose = () => {
    setadddialogopen(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {}
    data.name = name;
    data.sessionid = Sessionid;
    data.EntryBy = "sysadmin";
    //alert("sucessfully add.");
    setOpenAlert(true);    
    //postWeekData(data);
    //alert(JSON.stringify(data))
    //postWeekData(name)
  };
  
  const postWeekData = async (param) => {
    
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(param),
      redirect: 'follow'
    }

    //console.log(requestOptions)

    const res = await fetch(my_url, requestOptions)
    const data = await res.json()
    if (res.ok) {
      
        // dispatch(usersList(userDispatch))
      setShow(false)      

      return { ok: true, data }
    } else {
      console.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
    }
  
}
  // close new dialog option
  // alert open and close after 3 second
  
  const handleAlertClose = () => {
    setOpenAlert(false);
  };
  setTimeout(handleAlertClose, 10000);
  
  return (
   <>
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
        {/* {{value}} */}
          <CardHeader  title="Section List" />       
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

              {/* <CustomTextField
                select
                defaultValue='Session List'
                sx={{ mr: 4, mb: 2 }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: selected => (selected?.length === 0 ? 'Program Data' : selected)
                }}
                onChange={e =>
                  ProgramType(e.target.value)
                }
              >
              </CustomTextField> */}
              <Autocomplete
                  // value={value}
                  // onChange={(event, newValue) => {
                  //   setValue(newValue);
                  // }}
                  onChange={(event, value) => handleSessionList(value)} // prints the selected value
                  size="small"
                  disablePortal
                  id="combo-box-demo"                 
                  options={AllSection}                      
                  //defaultValue={AllSection[0]} 
                  defaultValue={{ sessionname: "Session 1", Id: Sessionid }}
                  //value={(option) => option.sessionname}
                  getOptionLabel={(option) => option.sessionname}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Session List"
                      placeholder="Favorites"
                    />
                  )}
                />

              <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                <CustomTextField

                  sx={{ mr: 4 }}
                  placeholder='Search User'
                  onChange={e => handleFilter(e.target.value)}
                />
                   <Button onClick={handleClickOpen}  variant='contained' sx={{ '& svg': { mr: 2 } }}>
                <Icon fontSize='1.125rem' icon='tabler:plus' />
                Add Week
              </Button>
              </Box>
           
           </Box>

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
    <form onSubmit={handleSubmit} >
    <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          > 
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleadddialogClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
        </form>
    </Dialog>
  
   </>
  )
}

export default index