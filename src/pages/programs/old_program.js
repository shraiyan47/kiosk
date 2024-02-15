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
import { useSelector } from 'react-redux'

const renderStats = data => {
  return data.map(
    (sale, index) =>
      sale.SectionTitle !== 'Confirmation' && (
        <Grid item xs={6} md={4} key={index}>
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize='1.5rem' />
        </CustomAvatar> */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='h5'>{sale.SectionTitle}</Typography>
              <Typography variant='body2'>{sale.Point} Point</Typography>
            </Box>
          </Box>
        </Grid>
      )
  )
}

const EcommerceStatistics = () => {
  const WeekPoints = useSelector(state => state.submissions.weekPoints)
  let x = WeekPoints[0]
  // let total_weekPoint = x.forEach( y => y.Point )
  // console.log("Week Points --->",WeekPoints[0])
  const organizedDataArray = []
  let weektotalpoint = 0

  WeekPoints[0]?.forEach(item => {
    const WeekName = item.WeekName

    // console.log("Total Week Point -> ",item)

    // Check if the WeekName already exists in the array
    const existingWeek = organizedDataArray.find(obj => obj.WeekName === WeekName)
 
    
    if (!existingWeek) {
      // If WeekName doesn't exist, add a new object with the WeekName property
      
      const newWeek = {
        WeekName,
        data: [item]
      }
      
      let WeekPoint = newWeek.data
      WeekPoint.map(x => weektotalpoint += x.Point)
      console.log("Exitsting Week => ",weektotalpoint, WeekPoint); 

      organizedDataArray.push(newWeek)
    } else {
      // If WeekName already exists, push the item to its data array
      existingWeek.data.push(item)
    }
  })

  console.log('organizedDataArray ->', organizedDataArray)

  return (
    <>
      {organizedDataArray.map((x, y) => (
        <>
          <Card key={y} sx={{ padding: '10px', marginBottom: '20px' }}>
            <CardContent
              sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
            >
              <h3>{x.WeekName}</h3>

              <Grid container spacing={6}>
                {renderStats(x.data)}
              </Grid>
            </CardContent>
          </Card>
          {/* <br /> */}
        </>
      ))}
    </>
  )
}

export default EcommerceStatistics
