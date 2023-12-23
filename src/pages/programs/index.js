// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import CardHorizontalRatings from 'src/views/ui/cards/basic/CardHorizontalRatings'
import AnalyticsSupportTracker from 'src/views/dashboards/analytics/AnalyticsSupportTracker'
import CrmProjectStatus from 'src/views/dashboards/crm/CrmProjectStatus'

const CardBasic = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ pb: 4 }}>
        <Typography variant='h4'>Current Program </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <AnalyticsSupportTracker />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
          <CrmProjectStatus />
      </Grid>
      <Grid item xs={12} sx={{ pb: 4 }}>
        <Typography variant='h4'>Past Programs </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <CardHorizontalRatings />
        <br></br>
        <CardHorizontalRatings />
        <br></br>
        <CardHorizontalRatings />
        <br></br>
      </Grid>
    </Grid>
  )
}

export default CardBasic
