// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

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

// ** Store Imports
// import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'
import { Button, ButtonGroup, IconButton, Menu, MenuItem } from '@mui/material'

// import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'/

// ** Custom Table Components Imports
import TableHeader from './TableHeader'

// ** STATE MANAGEMENT
import { useSelector, useDispatch } from 'react-redux'
import { usersList } from '../../redux/user/userSlice'

const RowOptions = ({ id }) => {
  // ** Hooks
  // const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ButtonGroup variant='contained' aria-label='outlined primary button group'>
        <Button>
          <Icon icon='tabler:qrcode' />
        </Button>
        <Button>
          <Icon icon='tabler:eye' />
        </Button>
        <Button>
          <Icon icon='tabler:pencil' />
        </Button>
        <Button>
          <Icon icon='tabler:trash' />
        </Button>
      </ButtonGroup>
    </>
  )
}

const columns = [
  {
    flex: 0.25,
    minWidth: 240,
    field: 'Name',
    headerName: 'Name',

    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderClient(row)} */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.Name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 100,
    headerName: 'Accesskey',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <CustomAvatar
            skin='light'
            sx={{ mr: 4, width: 30, height: 30 }}
            color={userRoleObj[row.role].color || 'primary'}
          >
            <Icon icon={userRoleObj[row.role].icon} />
          </CustomAvatar> */}
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.Accesskey}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 50,
    headerName: 'Value',
    field: 'currentPlan',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.Value}
        </Typography>
      )
    }
  }
]

const Masterdata = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [value, setValue] = useState('')
  const [masterid, setMasterid] = useState(1)

  const [allUsers, setAllUsers] = useState([])
  const [allUsers2, setAllUsers2] = useState([])

  //const my_url = `https://vehayamachanechakadosh.com:8080/api/MasterChild?Stauts=all&MasterId=1` ////// Leads Company Admin
  const my_url = `https://vehayamachanechakadosh.com:8080/api/MasterChild` ////// Leads Company Admin
  const userStateData = useSelector(state => state.users.data)
  //console.log('User State Data => ', userStateData)
  //const dispatch = useDispatch()

  // get User from API
  useEffect(() => {
    fetchData(masterid)
  }, [])

  async function fetchData(masterid) {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    const params = {
      Stauts: 'all',
      MasterId: masterid
    }

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(params)
    }

    const res = await axios.get(my_url, { params })
    const data = await res.data
    console.log('reponse', res)
    if (res.status == 200) {
      setAllUsers(
        Object.values(data).map((row, index) => ({
          id: row.Id, // You can use a different logic for generating unique IDs if needed
          ...row
        }))
      )
      setAllUsers2(
        Object.values(data).map((row, index) => ({
          id: row.Id, // You can use a different logic for generating unique IDs if needed
          ...row
        }))
      )
      //console.log("api data", formattedData)
      // setAllUsers(formattedData)
      // setAllUsers2(formattedData)
      //   let newArr = [...allUsers];
      //   newArr[index] = formattedData;
      //   setAllUsers(newArr);
      //   setAllUsers(
      //     formattedData.map(item =>
      //         item.id === index
      //         ? {...item, someProp : "changed", someOtherProp: 42}
      //         : item
      // ))
      // setAllUsers({...allUsers,formattedData})
      // setAllUsers2({...allUsers,formattedData})

      console.log('alluser', allUsers)
      //   const userDispatch = {
      //     data: formattedData
      //   }

      //   dispatch(usersList(userDispatch))

      return { ok: true, data }
    } else {
      return { ok: false, err: res, data }
    }
  }

  useEffect(() => {
    const searchQuery = value

    // const lol = userStateData

    // Filter the `allUser` array based on the search query
    const filteredUsers = allUsers2.filter(user => {
      console.log(user)

      return (
        user.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.Accesskey.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.Value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

    setAllUsers(filteredUsers)
  }, [value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const userListHandler = useCallback(val => {
    console.log('Program Val', val)
    setMasterid(val)
    fetchData(val)
    // setValue(val)
  }, [])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Master Item List' />
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader masterid={masterid} value={value} handleFilter={handleFilter} ProgramType={userListHandler} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={allUsers}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[2, 3, 4, 10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Masterdata
