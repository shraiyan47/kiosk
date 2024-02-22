// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material'

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
  const theme = useTheme()

  const WeekPoints = useSelector(state => state.submissions.weekPoints)
  let x = WeekPoints[0]
  // let total_weekPoint = x.forEach( y => y.Point )
  console.log('Week Points --->', WeekPoints[0])
  const organizedDataArray = []
  let weektotalpoint = 0

  function sumPointsByWeekId(data) {
    const result = []

    for (const item of data) {
      const weekId = item.WeekId
      let found = false

      for (let i = 0; i < result.length; i++) {
        if (result[i].weekId === weekId) {
          result[i].total += item.Point
          found = true
          break
        }
      }

      if (!found) {
        result.push({ weekId, total: item.Point })
      }
    }

    return result
  }
  
  const weekIdTotals = (WeekPoints[0])&&sumPointsByWeekId(WeekPoints[0])
  console.log('Total Week Point -> ', weekIdTotals)

  WeekPoints[0]?.forEach((item, index) => {
    const WeekName = item.WeekName
    const WeekId = item.WeekId

    // Check if the WeekName already exists in the array
    const existingWeek = organizedDataArray.find(obj => obj.WeekName === WeekName)

    if (!existingWeek) {
      // If WeekName doesn't exist, add a new object with the WeekName property

      const newWeek = {
        WeekName,
        WeekId,
        data: [item]
      }

      console.log('Exitsting Week => ', item)
      weektotalpoint = 0

      organizedDataArray.push(newWeek)
    } else {
      // If WeekName already exists, push the item to its data array
      //   weektotalpoint += item.Point
      // console.log("Total Week Point -> ",item)

      existingWeek.data.push(item)
    }
  })

  console.log('organizedDataArray ->', organizedDataArray)

  return (
    <>
      {organizedDataArray.map((x, y) => (
        <>
          <Card key={y} sx={{ padding: '10px', marginBottom: '20px' }}>
            <CardHeader title={`${x.WeekName}`} subheader={`Total Weekly Point: ${(x.WeekId == weekIdTotals[y].weekId)&&weekIdTotals[y].total}`} subheaderTypographyProps={{ sx: { color: `ORANGE !important`, fontWeight: 'BOLD' } }}  />  
            <CardContent
              sx={{ pt: theme => `${theme.spacing(1)} !important`, pb: theme => `${theme.spacing(1.5)} !important` }}
            >
              <Grid container spacing={1}>
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
