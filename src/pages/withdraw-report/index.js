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

const WithdrawReport = () => {
  const [AllWitdraw, setAllWitdraw] = useState([])
  const [AllPrograms, setAllPrograms] = useState([])
  const [ShopNameList, setShopNameList] = useState('')
  const [SelectedShop, setSelectedShop] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  useEffect(() => {
    fetchWitdrawList()
    fetchShopList()

    async function fetchShopList() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterChild/GetAllByAccesskey?Accesskey=sp`
        )

        if (response.status === 200) {
          const data = response.data
          setShopNameList(data)
          console.log('All Programs data:', data) // Use a logger for informative messages
        } else {
          throw new Error(`API request failed with status ${response.status}`)
        }
      } catch (err) {
        console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

        return { ok: false, err: err }
      }
    }

    async function fetchWitdrawList() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/Session`)

        if (response.status === 200) {
          const data = response.data
          setAllPrograms(data)
          console.log('All Programs data:', data) // Use a logger for informative messages
          try {
            const responseWithdraw = await axios.get(
              `${process.env.NEXT_PUBLIC_BASE_URL}api/UserWithDrawAmountRequest?ProgramId=${data[0]?.Id}&ShopId=${SelectedShop}`
            )

            if (responseWithdraw.status === 200) {
              const data = responseWithdraw.data
              console.log('Withdraw LIST ->', data)
              for (let i = 0; i < data.length; i++) {
                // Assign an ID to the object
                data[i].id = i + 1
              }
              setAllWitdraw(data)
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
      minWidth: 240,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
      field: 'UserName',
      headerName: 'Full Name',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row.UserName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'WithDrawAmount',
      minWidth: 100,
      headerName: 'Withdraw Amount',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.WithDrawAmount}
            </Typography>
          </Box>
        )
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box
          sx={{
            rowGap: 1,
            columnGap: 4,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'left',
            padding: 5
          }}
        > 

          
          <CustomTextField
            select
            sx={{ mr: 4, mb: 2 }}
            onChange={x => setSelectedShop(x.target.value)}
            required
            label='Shop Name'
          >
            

            {Object.values(ShopNameList).map((data, i) => (
              <MenuItem key={i + 1} value={data.Id}>
                {data.Name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Box>
        <Card>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={AllWitdraw}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default WithdrawReport
