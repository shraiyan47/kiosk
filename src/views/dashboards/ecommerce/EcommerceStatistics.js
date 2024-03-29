// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// const data = [
//   {
//     stats: '230',
//     title: 'Silver Member',
//     color: 'primary',
//     icon: 'tabler:chart-pie-2'
//   },
//   {
//     color: 'info',
//     stats: '85',
//     title: 'Gold Member',
//     icon: 'tabler:users'
//   },
//   {
//     color: 'error',
//     stats: '14',
//     title: 'Platinum Member',
//     icon: 'tabler:shopping-cart'
//   },
//   {
//     stats: '9',
//     color: 'success',
//     title: 'Non Member',
//     icon: 'tabler:currency-dollar'
//   }
// ]

const renderStats = (data) => {
  return data.map((sale, index) => (
    <Grid item xs={6} md={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={'tabler:users'} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{sale.UserCount}</Typography>
          <Typography variant='body2'>{sale.Member}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const EcommerceStatistics = ({data}) => {
  return (
    <Card>
      <CardHeader
        title='Membership'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            Active students membership wise  
          </Typography>
        }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {renderStats(data)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceStatistics
