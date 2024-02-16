// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import AnalyticsOrderVisits from 'src/views/dashboards/analytics/AnalyticsOrderVisits'
import AnalyticsEarningReports from 'src/views/dashboards/analytics/AnalyticsEarningReports'
import AnalyticsSupportTracker from 'src/views/dashboards/analytics/AnalyticsSupportTracker'
import AnalyticsWebsiteAnalyticsSlider from 'src/views/dashboards/analytics/AnalyticsWebsiteAnalyticsSlider'
import ApexDonutChart from 'src/views/charts/apex-charts/ApexDonutChart'
import EcommerceStatistics from 'src/views/dashboards/ecommerce/EcommerceStatistics'

// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'
import { useEffect, useState } from 'react'
import { allWeekOfProgramList, clearallWeekOfProgramList } from 'src/redux/weeklyduch/submissionSlice'
import { CurrentWeekList, clearCurrentWeeklist } from 'src/redux/weeklyduch/weeklyduchSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import AnalyticsMonthlyCampaignState from 'src/views/dashboards/analytics/AnalyticsMonthlyCampaignState'

const AnalyticsDashboard = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [WeeklyUserCount, setWeeklyUserCount] = useState([])
  const [memberUserCount, setMemberUserCount] = useState([])

  useEffect(() => {
    setLoading(true)
    fetchActiveProgramData()
  }, [])

  async function fetchActiveProgramData() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/GetCurrentWeek`)

      if (response.status === 200) {
        const data = response.data
        console.log('Fetched Current Week data:', data) // Use a logger for informative messages

        dispatch(clearCurrentWeeklist())

        const CurrentWeekData = {
          currentWeek: data
        }

        dispatch(CurrentWeekList(CurrentWeekData))

        ///// All the weeks of running program with dates range
        try {
          const resAllWeekOfProgram = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/Week?SessionId=${data?.SessionId}`
          )

          if (resAllWeekOfProgram.status === 200) {
            const data = resAllWeekOfProgram.data
            console.log("WEEK LIST ->",data)

            const allWeekProgram = {
              allWeekOfProgram: data
            }

            dispatch(clearallWeekOfProgramList())

            dispatch(allWeekOfProgramList(allWeekProgram))
            // alert("LOL")
            console.log('Fetched ALL WEEK OF PROGRAM data:', allWeekProgram) // Use a logger for informative messages
          } else {
            throw new Error(`API request failed with status ${response.status}`)
          }
        } catch (err) {
          console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

          return { ok: false, err: err }
        }


        // wdSubReport setWeeklyUserCount
        // try {
        //   const resAllWeekOfProgram = await axios.get(
        //     `${process.env.NEXT_PUBLIC_BASE_URL}api/Week?SessionId=${data?.SessionId}` // Every Week User Submission Count
        //   )

        //   if (resAllWeekOfProgram.status === 200) {
        //     const data = resAllWeekOfProgram.data

        //     const allWeekProgram = {
        //       hachlata: data
        //     }

        //     dispatch(clearallWeekOfProgramList())

        //     dispatch(allWeekOfProgramList(allWeekProgram))
        //     // alert("LOL")
        //     console.log('Fetched ALL WEEK OF PROGRAM data:', allWeekProgram) 
        //   } else {
        //     throw new Error(`API request failed with status ${response.status}`)
        //   }
        // } catch (err) {
        //   console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

        //   return { ok: false, err: err }
        // }

        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/GetWeekWiseUser?SessionId=${data?.SessionId}` // Get Week Wise User Count
          )

          if (res.status === 200) {
            const WeekWiseUserCount = res.data 
            setWeeklyUserCount(WeekWiseUserCount)
            console.log('Fetched WEEK OF PROGRAM USER SUBMISSION COUNT -> :', WeekWiseUserCount) 
          } else {
            throw new Error(`API request failed with status ${response.status}`)
          }
        } catch (err) {
          console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

          return { ok: false, err: err }
        }


        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/GetMemberWiseUserDetails` // Active students membership
          )

          if (res.status === 200) {
            const MemberWiseUserDetails = res.data
            setMemberUserCount(MemberWiseUserDetails)
            console.log('Fetched MemberWiseUserDetails COUNT -> :', MemberWiseUserDetails) //
          } else {
            throw new Error(`API request failed with status ${response.status}`)
          }
        } catch (err) {
          console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

          return { ok: false, err: err }
        }

        setLoading(false)

        return { ok: true, data }
      } else if (response.status === 204) {
        setLoading(false)

        // alert(' NO CURRENT WEEK / PROGRAM ACTIVE ')
        console.log(' NO CURRENT WEEK / PROGRAM ACTIVE ')
      } else {
        throw new Error(`API request failed with status ${response.status}`)
      }
    } catch (err) {
      console.error('Error fetching active program data:', err)
      setLoading(false)

      return { ok: false, err: err }
    }
  }

  return (
    <>
      {!loading ? (
        <ApexChartWrapper>
          <KeenSliderWrapper>
            <Grid container spacing={5}>
              <Grid item xs={12} lg={6}>
                <AnalyticsWebsiteAnalyticsSlider />
                <br></br>
                <AnalyticsOrderVisits />
              </Grid>

              <Grid item xs={12} md={6}>
                <ApexDonutChart  data={WeeklyUserCount} />
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <AnalyticsSupportTracker />
              </Grid> */}
              <Grid item xs={12} md={6}>
                <AnalyticsMonthlyCampaignState data={WeeklyUserCount} />
              </Grid>

              <Grid item xs={12} md={6}>
                <AnalyticsEarningReports />
              </Grid>
              <Grid item xs={12} md={6}>
                <EcommerceStatistics data={memberUserCount} />
              </Grid>
            </Grid>
          </KeenSliderWrapper>
        </ApexChartWrapper>
      ) : (
        <>
          <ApexChartWrapper>
            It's a great day and you look gorgeous!
            <br />
            Please wait till all the data on board.
          </ApexChartWrapper>
        </>
      )}
    </>
  )
}
AnalyticsDashboard.acl = {
  action: 'read',
  subject: 'dashboard'
}

export default AnalyticsDashboard
