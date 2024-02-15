// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const donutColors = {
  series1: '#fdd835',
  series2: '#2244ff',
  series3: '#826bf8',
  series4: '#1FD5EB',
  series5: '#ffa1a1',
  series6: '#39FF33',
  series7: '#39FF53',
  series8: '#39FF73',
  series9: '#39FF93',
  series10: '#39FF23',
  series11: '#39FF43',
  series12: '#39FF53',
  series13: '#39FF63',
  series14: '#12FF63',
  series15: '#39FF88',
}

const ApexDonutChart = ({ data }) => {
  // ** Hook
  const theme = useTheme()

  let weeksName = data.map(x => x.WeekName)
  let weekUserCount = data.map(x => x.UserCount)
  const totalUserCount = weekUserCount.reduce((acc, curr) => acc + curr, 0)

  const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  const roundedValue = formatter.format(((100 / totalUserCount) * weekUserCount[weekUserCount.length - 1])-.5)

  // console.log('totalUCount -> ', totalUserCount)

  const options = {
    stroke: { width: 0 },
    labels: weeksName,
    colors: [
      donutColors.series1,
      donutColors.series2,
      donutColors.series3,
      donutColors.series4,
      donutColors.series5,
      donutColors.series6,
      donutColors.series7,
      donutColors.series8,
      donutColors.series9,
      donutColors.series10,
      donutColors.series11,
      donutColors.series12,
      donutColors.series13,
      donutColors.series14,
      donutColors.series15
    ],
    dataLabels: {
      enabled: true,
      formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: val => `${parseInt(val, 0)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: weeksName[weeksName.length - 1],
              formatter: () => roundedValue+"%",
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  value: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  total: {
                    fontSize: theme.typography.body1.fontSize
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Submission Ratio'
        subheader='Running programs section submission graph'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <ReactApexcharts type='donut' height={400} options={options} series={weekUserCount} />
      </CardContent>
    </Card>
  )
}

export default ApexDonutChart
