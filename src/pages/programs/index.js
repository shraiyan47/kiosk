// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import SubmittedDT from './SubmittedDT'
import { Card, CardHeader } from '@mui/material'

const CardBasic = () => {
  const CurrentWeekData = useSelector(state => state.weeklyduchs.currentWeek)

  return (
    <Card sx={{ p: 4 }}>
      <CardHeader title={'Current Program - Running Week : '+CurrentWeekData[0]?.WeekName} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <SubmittedDT />
        </Grid>
      </Grid>
    </Card>
  )
}

export default CardBasic
