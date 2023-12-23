// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

import { useAuth } from 'src/hooks/useAuth'
// import { Box } from '@mui/system'

import { styled, useTheme } from '@mui/material/styles'
// import Button from '@mui/material/Button'

import Counter from '../components/Counter'
// import Profile from '../components/Profile'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearWeeklyduchlist, weeklyduchsList } from 'src/redux/weeklyduch/weeklyduchSlice'
import CardHorizontalRatings from 'src/views/ui/cards/basic/CardHorizontalRatings'
import AnalyticsSupportTracker from 'src/views/dashboards/analytics/AnalyticsSupportTracker'
import CrmProjectStatus from 'src/views/dashboards/crm/CrmProjectStatus'

// import Counter from '../Counter/index'

const Home = () => {
  // const LoginIllustration = styled('img')(({ theme }) => ({
  //   zIndex: 2,
  //   maxWidth: 150
  // }))

  const [loading, setLoading] = useState(false)
  const auth = useAuth()

  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSection?Stauts=all`)
      const aaZara = response.data

      const secData = aaZara.map(item => ({
        // ...item,
        SectionTitle: item.Name,
        SessionId: item.Id,
        UserAccountId: auth?.user?.Id,
        WeekId: 1,
        Point: item.Point,
        EntryBy: auth?.user?.userId
      }))

      console.log('aaZara ==> ', secData)

      const requests = aaZara.map(x =>
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSectionDetailsBySectionId?SectionId=${x.Id}`)
      )

      const responseData = await Promise.all(requests)

      const combinedData = responseData.map((res, index) => {
        const obj = {
          ...secData[index],
          SectionOptionList: [] // Initialize empty array
        }

        res.data.forEach(data => {
          obj.SectionOptionList.push({
            SectionOption: data.Name,
            Point: 1,
            EntryBy: auth?.user?.userId,
            Id: data.Id
          })
        })

        return obj
      })

      const weeklyduchDispatch = {
        sectionAndOptions: combinedData
      }

      dispatch(clearWeeklyduchlist())

      dispatch(weeklyduchsList(weeklyduchDispatch))

      console.log('Combined Data: ', weeklyduchDispatch)
      setLoading(false)

      return combinedData
    } catch (error) {
      console.error('Error fetching data: ', error)
      throw error
    }
  }

  // Call fetchData function
  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  const Illustration = styled('img')(({ theme }) => ({
    right: 20,
    bottom: 0,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      right: 5,
      width: 110
    }
  }))

  //  var userData_custom = window.localStorage.getItem('userData')
  // if (auth.user.userrole === 'admin') {
  //   return (
  //     <Grid container spacing={12}>
  //       <Grid item xs={12} sm={12} md={12}>
  //         <Card>
  //           <CardHeader
  //             sx={{
  //               textAlign: 'center',
  //               color: 'primary.main'
  //             }}
  //             title='Welcome to You Create Holiness: Admin Panel 🚀'
  //           ></CardHeader>

  //           <Typography
  //             variant='h5'
  //             sx={{
  //               textAlign: 'center',
  //               mb: 0.5
  //             }}
  //           >
  //             Congratulations {auth.user.fullname}! 🎉
  //           </Typography>
  //         </Card>
  //       </Grid>
  //       <Grid item xs={12} sm={12} md={12}>
  //         <Card>
  //           <CardHeader
  //             sx={{
  //               textAlign: 'center',
  //               color: 'primary.main'
  //             }}
  //             title='Welcome to Counter App: for redux testing 🚀'
  //           ></CardHeader>

  //           <Typography
  //             variant='h5'
  //             sx={{
  //               textAlign: 'center',
  //               mb: 0.5
  //             }}
  //           >
  //             {/* <Provider store={store}> */}
  //             <Counter />

  //             {/* </Provider> */}
  //           </Typography>
  //         </Card>
  //       </Grid>
  //     </Grid>
  //   )
  // } else if (auth.user.userrole === 'student') {
  //   return (
  //     <Grid container spacing={12}>
  //       <Grid item xs={12} sm={12} md={12}>
  //         {!loading ? (
  //           <Card>
  //             <CardHeader
  //               sx={{
  //                 textAlign: 'center'
  //               }}
  //               title='Welcome to You Create Holiness: Student Panel 🚀'
  //             ></CardHeader>

  //             <Typography
  //               variant='h5'
  //               sx={{
  //                 textAlign: 'center',
  //                 mb: 0.5
  //               }}
  //             >
  //               Congratulations {auth.user.fullname}! 🎉
  //             </Typography>
  //             <Typography
  //               variant='h4'
  //               sx={{
  //                 textAlign: 'center',
  //                 mb: 0.75,
  //                 color: 'primary.main',
  //                 margin: theme => theme.spacing(2, 2, 8, 2)
  //               }}
  //             >
  //               My membership goal: {auth.user.Member}
  //             </Typography>
  //           </Card>
  //         ) : (
  //           <>
  //             <div
  //               style={{
  //                 position: 'absolute',
  //                 top: 0,
  //                 left: 0,
  //                 width: '100vw',
  //                 height: '100vh',
  //                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //                 pointerEvents: 'none',
  //                 zIndex: '2001'
  //               }}
  //             >
  //               <Card>
  //                 <CardHeader
  //                   sx={{
  //                     textAlign: 'center'
  //                   }}
  //                   title='Wait...'
  //                 ></CardHeader>
  //               </Card>
  //             </div>
  //           </>
  //         )}

  return (
    <>
      {!loading ? (
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
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              pointerEvents: 'none',
              zIndex: '2001'
            }}
          >
            <Card>
              <CardHeader
                sx={{
                  textAlign: 'center'
                }}
                title='Wait...'
              ></CardHeader>
            </Card>
          </div>
        </>
      )}
    </>
  )
}

Home.acl = {
  action: 'read',
  subject: 'home-page'
}

export default Home
