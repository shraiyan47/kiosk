// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomTextField from 'src/@core/components/mui/text-field'
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip
} from '@mui/material'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { GridToolbar } from '@mui/x-data-grid'

const WithdrawReport = () => {
  const [AllWitdraw, setAllWitdraw] = useState([])
  const [AllPrograms, setAllPrograms] = useState([])
  const [ShopNameList, setShopNameList] = useState('')
  const [SelectedShop, setSelectedShop] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchWitdrawList()
    setLoading(true)

    async function fetchWitdrawList() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/Session`)

        if (response.status === 200) {
          const data = response.data
          setAllPrograms(data)
          console.log('All Programs data:', data) // Use a logger for informative messages
          try {
            const responseWithdraw = await axios.get(
              `${process.env.NEXT_PUBLIC_BASE_URL}api/GetPointSummaryList?SessionId=${data[0]?.Id}`
            )

            if (responseWithdraw.status === 200) {
              const data = responseWithdraw.data
              console.log('Withdraw LIST ->', data)
              for (let i = 0; i < data.length; i++) {
                // Assign an ID to the object
                data[i].id = i + 1
              }
              setAllWitdraw(data)
              setLoading(false)
              // alert('LOL')
            } else {
              throw new Error(`API request failed with status ${response.status}`)
            }
          } catch (err) {
            console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

            return { ok: false, err: err }
          }
        }
      } catch (err) {
        console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

        return { ok: false, err: err }
      }
    }
  }, [SelectedShop])

  const columns = [
    {
      flex: 0.25,
      minWidth: 5,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row.userId}  - {row.UserAccountId}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 30,
      field: 'fullname',
      headerName: 'Student Name',

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
      field: 'Member',
      minWidth: 30,
      headerName: 'Membership Level',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.Member}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'Point',
      minWidth: 30,
      headerName: 'Weekly Duch Point',
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
      flex: 0.15,
      field: 'WeeklySpecialPoint',
      minWidth: 30,
      headerName: 'Weekly Special Point',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.WeeklySpecialPoint}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'ConvertRate',
      minWidth: 30,
      headerName: 'Point Conversion Rate',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.ConvertRate}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'EarningValue',
      minWidth: 30,
      headerName: 'Earning Value',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.EarningValue}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'WithDrawAmount',
      minWidth: 30,
      headerName: 'Withdrawn',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.WithDrawAmount}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'Balance',
      minWidth: 30,
      headerName: 'Balance',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.Balance}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'ProgramBonusPoint',
      minWidth: 30,
      headerName: 'Program BP',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.ProgramBonusPoint}
            </Typography>
          </Box>
        )
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {loading ? (
            <>Data on the fly... take a deep breath!</>
          ) : (
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={AllWitdraw}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true
                }
              }}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default WithdrawReport
