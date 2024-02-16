import { Box, Divider, Grid, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import TableHeader from '../masterdata/TableHeader'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CustomTextField from 'src/@core/components/mui/text-field'

function SubmittedDT() {
  const [allUsers, setAllUsers] = useState([])
  const [LOADING, setLOADING] = useState(false)
  const [filter, setFilter] = useState("")
  const [allUsers2, setAllUsers2] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const CurrentWeekData = useSelector(state => state.weeklyduchs.currentWeek)
  const [selectedWeek, setSelectedWeek] = useState(CurrentWeekData[0]?.WeekId)
  const allWeekOfProgram = useSelector(state => state.submissions.allWeekOfProgram)
  // console.log('allWeekOfProgram -> ', allWeekOfProgram[0])

  useEffect(() => {
    setLOADING(true)
    async function weeklyUserData(params) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/GetWeekWiseUserDetails?SessionId=${params[0]?.SessionId}&WeekId=${selectedWeek}` // Active students membership
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

    weeklyUserData(CurrentWeekData)
  }, [selectedWeek])
  

  function handleFilter(para) {
    console.log("Param ->", para)
    setFilter(para)
    const searchQuery = para

    // Filter the `allUser` array based on the search query
    const filteredUsers = allUsers2.filter(user => {
      if (!user) return false

      const { userId = ''} = user

      const lowercaseQuery = searchQuery ? searchQuery.toLowerCase() : ''

      return (
        (userId && userId.toLowerCase().includes(lowercaseQuery)) 
      )
    })

    setAllUsers(filteredUsers)

  }

  const renderUserRoleOptions = () => {
    return allWeekOfProgram[0]?.map(item => (
      <option key={item.WeekId} value={item.WeekId}>
        {item.WeekName}
      </option>
    ))
  }

  useEffect(() => {
    console.log('allUsers ->', allUsers)
  }, [allUsers])

  const columns = [
    {
      flex: 0.25,
      minWidth: 240,
      field: 'id',
      headerName: 'ID',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
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
      flex: 0.15,
      field: 'Point',
      minWidth: 100,
      headerName: 'Point',
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
              {row.Point}
            </Typography>
          </Box>
        )
      }
    }
  ]

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={6}>
        <CustomTextField
          select
          value={selectedWeek}
          onChange={x => setSelectedWeek(x.target.value)}
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
      <Grid item xs={6}>
        <CustomTextField
          value={filter}
          sx={{ mr: 4 }}
          placeholder='Search User ID'
          onChange={e => handleFilter(e.target.value)}
          label='Search by User Id'
        />
      </Grid>

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
  )
}

export default SubmittedDT
