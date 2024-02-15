// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

const AnalyticsMonthlyCampaignState = ({ data }) => {
  let t = 0

  data.map(x => {
    t+=x.UserCount
  })

  return (
    <Card>
      <CardHeader
        title='Every Week User Submission Count'
        subheader={t + ' Total Submission'}
        action={
          <OptionsMenu
            options={['Last Month', 'Last 6 Months', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
          />
        }
      />
      <CardContent>
        {data.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== data.length - 1 ? [6.5, 6.5, 7.5, 6.5] : undefined
              }}
            >
              <CustomAvatar
                skin='light'
                variant='rounded'
                color={item.avatarColor}
                sx={{ mr: 4, width: 34, height: 34 }}
              >
                <Icon icon='tabler:users' />
              </CustomAvatar>
              <Box
                sx={{
                  rowGap: 1,
                  columnGap: 4,
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='h6'>{item.WeekName}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 4, fontWeight: 500, color: 'text.secondary' }}>{item.UserCount}</Typography>
                  <Typography sx={{ color: `${item.trend === 'negative' ? 'error' : 'success'}.main` }}>
                    {item.trendNumber}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default AnalyticsMonthlyCampaignState
