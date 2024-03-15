// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Custom Components Imports
// import Icon from 'src/@core/components/icon'
// import CustomAvatar from 'src/@core/components/mui/avatar'
// import ReactApexcharts from 'src/@core/components/react-apexcharts'
import * as source from 'src/views/components/progress/ProgressSourceCode'
// import ProgressLinearControlledUncontrolled from 'src/views/components/progress/ProgressLinearControlledUncontrolled'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useSelector } from 'react-redux'
import ProgressLinearControlledUncontrolled from 'src/views/components/progress/ProgressLinearControlledUncontrolled'

const AnalyticsSupportTracker = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { dashArray: 10 },
    labels: ['Completed Task'],
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityTo: 0.5,
        opacityFrom: 1,
        shadeIntensity: 0.5,
        stops: [30, 70, 100],
        inverseColors: false,
        gradientToColors: [theme.palette.primary.main]
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 130,
        startAngle: -140,
        hollow: { size: '60%' },
        track: { background: 'transparent' },
        dataLabels: {
          name: {
            offsetY: -15,
            color: theme.palette.text.disabled,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.body2.fontSize
          },
          value: {
            offsetY: 15,
            fontWeight: 500,
            formatter: value => `${value}%`,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h1.fontSize
          }
        }
      }
    },
    grid: {
      padding: {
        top: -30,
        bottom: 12
      }
    },
    responsive: [
      {
        breakpoint: 1300,
        options: {
          grid: {
            padding: {
              left: 22
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          grid: {
            padding: {
              left: 0
            }
          }
        }
      }
    ]
  }

  const pointSummeryProgram = useSelector(state => state.submissions.pointSummeryProgram)
  const CurrentWeekData = useSelector(state => state.weeklyduchs.currentWeek)

  // useEffect(() => {
  //   console.log(pointSummeryProgram, CurrentWeekData)
  // }, [pointSummeryProgram, CurrentWeekData])

  const data = [
    {
      subtitle: pointSummeryProgram[0]?.BBCount + ' times sumitted',
      title: 'Back To Basic',
      avatarIcon: 'tabler:ticket'
    },
    {
      subtitle: pointSummeryProgram[0]?.DDCount + ' times sumitted',
      avatarColor: 'info',
      title: 'Daughter of Dignity',
      avatarIcon: 'tabler:circle-check'
    },
    {
      subtitle: pointSummeryProgram[0]?.MACount + ' times sumitted',
      avatarColor: 'info',
      title: 'Maagalim',
      avatarIcon: 'tabler:circle-check'
    },
    {
      subtitle: pointSummeryProgram[0]?.TCCount + ' times sumitted',
      avatarColor: 'info',
      title: 'Tech Check',
      avatarIcon: 'tabler:circle-check'
    },
    {
      subtitle: pointSummeryProgram[0]?.MHCount + ' times sumitted',
      title: 'My Hachlata',
      avatarColor: 'warning',
      avatarIcon: 'tabler:clock'
    },
    {
      subtitle: pointSummeryProgram[0]?.GMCount + ' times sumitted',
      title: 'Geder Moments',
      avatarColor: 'warning',
      avatarIcon: 'tabler:clock'
    }
  ]

  return (
    <>
      <Card>
        <Grid container padding={3}>
          <Grid item xs={12} sm={12}>
            <ProgressLinearControlledUncontrolled currentWD={CurrentWeekData} />
          </Grid>
        </Grid>

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
              <Typography variant='h3'> Submitted Week : {pointSummeryProgram[0]?.WeekCount}</Typography>
                  
                </Box>
                {/* <Box sx={{ minWidth: 300 }}>
                  <Typography variant='h3' color='text.secondary'>
                    Total Points : {pointSummeryProgram[0]?.Point}
                  </Typography>
                </Box> */}
              </Box>

              {data.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', alignItems: 'center', mb: index !== data.length - 1 ? 4 : undefined }}
                >
                  {/* <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={item.avatarColor}
                  sx={{ mr: 4, width: 34, height: 34 }}
                >
                  <Icon icon={item.avatarIcon} />
                </CustomAvatar> */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant='h6'>{item.title}</Typography>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
            {/* <Grid item xs={12} sm={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            TOTAL POINT: {pointSummeryProgram[0]?.Point}
          </Grid> */}
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default AnalyticsSupportTracker
