/* eslint-disable react-hooks/exhaustive-deps */
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

// import Counter from '../components/Counter'
// import Profile from '../components/Profile'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CurrentWeekList,
  clearCurrentWeeklist,
  clearWeeklyduchlist,
  weeklyduchsList
} from 'src/redux/weeklyduch/weeklyduchSlice'
import CardHorizontalRatings from 'src/views/ui/cards/basic/CardHorizontalRatings'
import AnalyticsSupportTracker from 'src/views/dashboards/analytics/AnalyticsSupportTracker'
// import CrmProjectStatus from 'src/views/dashboards/crm/CrmProjectStatus'
import {
  GetPointSummeryList,
  WeeklyPointsList,
  allWeekOfProgramList,
  clearEligiblesList,
  clearGetPointSummeryList,
  clearSubmissionsList,
  clearWeeklyPointsList,
  clearallWeekOfProgramList,
  cleargedermomentsList,
  clearhachlatasList,
  eligiblesList,
  gedermomentsList,
  hachlatasList,
  submissionsList
} from 'src/redux/weeklyduch/submissionSlice'
import { ProcessLinearWithLabel } from 'src/views/components/progress/ProgressLinearWithLabel'
import { ClearShopName, shopNameList, userRolesList } from 'src/redux/user/userRoleSlice'
import { userProgramsList } from 'src/redux/user/userProgramSlice'
import CrmProjectStatus from 'src/views/dashboards/crm/CrmProjectStatus'
import BonusPoint from 'src/views/dashboards/crm/BonusPoint'
// import { useRandomPassword } from 'src/hooks/useRandom'

// import Counter from '../Counter/index'

const Home = () => {
  // const LoginIllustration = styled('img')(({ theme }) => ({
  //   zIndex: 2,
  //   maxWidth: 150
  // }))

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // WE TRIED TO UPDATE ALL THE USER EMAIL
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   getAllUser()
  // }, [])

  // async function updateUser(user) {
  //   try {
  //     const url = `${process.env.NEXT_PUBLIC_BASE_URL}/////////////api////////User`
  //     const myHeaders = new Headers()
  //     myHeaders.append('Content-Type', 'application/json')

  //     const userData = {
  //       Id: user.Id,
  //       UserId: user.userId,
  //       MemberId: (user.MemberId).toString(),
  //       UserRole: user.userrole,
  //       PIN: user.PIN,
  //       UserName: user.UserName,
  //       Password: user.password,
  //       email: `${user.userId}@vehayamachanechakadosh.com`,
  //       UpdateBy: 'sysadmin',
  //       UserProfiles: {
  //         Id: user.ProfileId,
  //         UserAccountId: user.Id,
  //         UserId: user.userId,
  //         FullName: user.fullname,
  //         Class: user.Class,
  //         Grade: user.grade,
  //         UpdateBy: 'sysadmin'
  //       }
  //     }

  //     const requestOptions = {
  //       method: 'PUT',
  //       headers: myHeaders,
  //       body: JSON.stringify(userData),
  //       redirect: 'follow'
  //     }
  //     const res = await fetch(url, requestOptions)
  //     const data = await res.json()
  //     if (res.ok) {
  //       console.log('Success Email Update ==>', data)

  //       return { ok: true, data }
  //     } else {
  //       console.log('ERROR => ', data.error)

  //       return { ok: false, err: res, data }
  //     }
  //   } catch (err) {
  //     console.error('Error fetching active program data:', err)

  //     return { ok: false, err: err }
  //   }
  // }

  // async function getAllUser() {
  //   try {
  //     const getUsers = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}///////api/////////GetAllUserInfo?Stauts=all`)

  //     if (getUsers.status === 200) {
  //       const getAllUserData = getUsers.data

  //       getAllUserData.map(x => {
  //         console.log('User ID = ', x.userId + '@vehayamachanechakadosh.com')
  //         updateUser(x)
  //       })
  //     } else {
  //       throw new Error(`API request failed with status ${response.status}`)
  //     }
  //   } catch (err) {
  //     console.error('Error fetching active program data:', err)

  //     return { ok: false, err: err }
  //   }
  // }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // WE TRIED TO UPDATE ALL THE USER EMAIL
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const [CurrentWeek, setCurrentWeek] = useState(false)
  const [AllPrograms, setAllPrograms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [PointSubmitted, setPointSubmitted] = useState(false)
  const auth = useAuth()
  const [weekPointSummary, setWeekPointSummary] = useState({})


  const userAllData = useSelector(state => state.userPrograms.userData[0])
  const pointSummeryProgram = useSelector(state => state.submissions.pointSummeryProgram)

  const dispatch = useDispatch()

  console.log(' AUTH ==> ', userAllData)

  const [runningWeek, setRunningWeek] = useState([])

  async function fetchActiveProgramData() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/GetCurrentWeek`)

      if (response.status === 200) {
        const data = response.data
        setCurrentWeek(data)
        console.log('Fetched Current Week data:', data) // Use a logger for informative messages
        setRunningWeek(data)
        dispatch(clearCurrentWeeklist())

        const CurrentWeekData = {
          currentWeek: data
        }

        dispatch(CurrentWeekList(CurrentWeekData))

        // Fetch Current Week Data for this User - SectionSubmitCheckByUserId & ProgramCheckByUserId
        try {
          const response1 = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/SectionSubmitCheckByUserId?UserAccountId=${auth?.user?.Id}&SessionId=${data?.SessionId}&WeekId=${data?.WeekId}` // if it returns null, that weekly duch already submitted
          )

          const response2 = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/ProgramCheckByUserId?UserAccountId=${auth?.user?.Id}&ProgramId=${data?.SessionId}` // Student eligible for Program = active
          )

          if (response1.status === 200) {
            const data1 = response1.data

            const submissionDispatch = {
              sub: data1
            }

            dispatch(clearSubmissionsList())

            dispatch(submissionsList(submissionDispatch))

            console.log('Fetched Submitted Weekly data:', data1) // Use a logger for informative messages

            // return { ok: true, data1 }
          } else if (response1.status === 204) {
            const submissionDispatch = {
              sub: 'ALREADY SUBMITTED'
            }

            dispatch(clearSubmissionsList())

            dispatch(submissionsList(submissionDispatch))
            setLoading(false)

            console.log('Fetched Submitted Weekly Data: ', submissionDispatch)
          } else {
            throw new Error(`API request failed with status ${response1.status}`)
          }

          if (response2.status === 200) {
            const data2 = response2.data

            const elegibleDispatch = {
              eleg: data2
            }

            dispatch(clearEligiblesList())

            dispatch(eligiblesList(elegibleDispatch))

            console.log('Fetched Program Eligible data:', data2) // Use a logger for informative messages

            // return { ok: true, data2 }
          } else {
            throw new Error(`API request failed with status ${response2.status}`)
          }
        } catch (err) {
          console.error('Error fetching active program data:', err)

          // return { ok: false, err: err }
        }

        // // // MasterSection // // //
        try {
          const response4 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSection?Stauts=all`)
          const aaZara = response4.data

          const secData = aaZara.map(item => ({
            // ...item,
            SectionTitle: item.Name,
            SessionId: data?.SessionId,
            UserAccountId: auth?.user?.Id,
            WeekId: data?.WeekId,
            Point: item.Point,
            EntryBy: auth?.user?.userId
          }))

          console.log('aaZara ==> ', secData)

          const requests = aaZara.map(x =>
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSectionDetailsBySectionId?SectionId=${x.Id}`)
          )

          const response4Data = await Promise.all(requests)

          console.log('response4Data ====================> ', response4Data)

          const combinedData = response4Data.map((res, index) => {
            const obj = {
              ...secData[index],
              SectionOptionList: [] // Initialize empty array
            }

            res.data.forEach(data => {
              obj.SectionOptionList.push({
                SectionOption: data.Name,
                Point: data.Point,
                EntryBy: auth?.user?.userId,
                Id: data.Id,
                IsActive: data.IsActive
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
          // throw error
        }

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

      // return { ok: false, err: err }
    }
  }

  async function fetchAllProgramList() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/Session`)

      if (response.status === 200) {
        const data = response.data
        setAllPrograms(data)
        console.log('All Programs data:', data) // Use a logger for informative messages

        ///// All the weeks of running program with dates range
        try {
          const resAllWeekOfProgram = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/Week?SessionId=${data[0]?.Id}`
          )

          if (resAllWeekOfProgram.status === 200) {
            const data = resAllWeekOfProgram.data

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

          // return { ok: false, err: err }
        }

        //// POINT SUMMERY OF PROGRAM
        try {
          const resWeekPoints = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/GetPointSummary?UserAccountId=${auth?.user?.Id}&SessionId=${data[0]?.Id}`
          )

          if (resWeekPoints.status === 200) {
            const data = resWeekPoints.data
            console.log("week point  --- > ", data)
            setWeekPointSummary(data)

            const getPointSummeryProgram = {
              pointSummeryProgram: data
            }

            dispatch(clearGetPointSummeryList())

            dispatch(GetPointSummeryList(getPointSummeryProgram))
            // alert("LOL")
            console.log('SUBMITTED WEEK POINT SUMMERY :', getPointSummeryProgram) // Use a logger for informative messages
          } else {
            throw new Error(`API request failed with status ${response.status}`)
          }
        } catch (err) {
          console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

          // return { ok: false, err: err }
        }


        //// POINT SUMMERY OF PROGRAM By Week list
        try {
          const resWeekPoints = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/GetPointSummaryByWeekList?UserAccountId=${auth?.user?.Id}`
          )

          if (resWeekPoints.status === 200) {
            const data = resWeekPoints.data

            const allWeekPoints = {
              weekPoints: data
            }

            dispatch(clearWeeklyPointsList())

            dispatch(WeeklyPointsList(allWeekPoints))
            // alert("LOL")
            console.log('SUBMITTED WEEK POINT DETAILS :', allWeekPoints) // Use a logger for informative messages
          } else {
            throw new Error(`API request failed with status ${response.status}`)
          }
        } catch (err) {
          console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

          // return { ok: false, err: err }
        }

        return { ok: true, data }
      } else {
        throw new Error(`ALL PROGRAM LIST API request failed with status ${response.status}`)
      }
    } catch (err) {
      console.error('Error fetching active program data:', err)
      setLoading(false)

      // return { ok: false, err: err }
    }
  }

  async function fetchHachlataGedderMomentData() {
    try {
      const resHachlata = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterChild/GetAllByAccesskey?Accesskey=HA`
      )

      const resGedder = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterChild/GetAllByAccesskey?Accesskey=GM`
      )

      if (resHachlata.status === 200) {
        const data = resHachlata.data

        const HachlataDispatch = {
          hachlata: data
        }

        dispatch(clearhachlatasList())

        dispatch(hachlatasList(HachlataDispatch))
        console.log('Fetched Hachlata data:', data) // Use a logger for informative messages
      } else {
        throw new Error(`API request failed with status ${response.status}`)
      }

      if (resGedder.status === 200) {
        const data = resGedder.data

        const GedderDispatch = {
          gedermoment: data
        }

        dispatch(cleargedermomentsList())

        dispatch(gedermomentsList(GedderDispatch))

        console.log('Fetched Gedder Moment data:', data) // Use a logger for informative messages
      } else {
        throw new Error(`API request failed with status ${response.status}`)
      }
    } catch (err) {
      console.error('Error fetching active program data:', err)

      return { ok: false, err: err }
    }
  }

  const UserRoleURL = `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterChild/GetAllByAccesskey?MasterId=2&Accesskey=UR` ////// All User Roles
  const shopURL = `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterChild/GetAllByAccesskey?Accesskey=sp` ////// All Shop Names
  const UserProgramURL = `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterChild/GetAllByAccesskey?MasterId=1&Accesskey=TM` ////// All User Program

  async function fetchUserRoles() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const res = await fetch(UserRoleURL, requestOptions)
    const data = await res.json()
    if (res.ok) {
      const userRoleDispatch = {
        data: data
      }

      // console.log(" userRoleDispatch -> ", userRoleDispatch)
      dispatch(userRolesList(userRoleDispatch))

      return { ok: true, data }
    } else {
      constole.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
    }
  }

  async function fetchShopName() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const res = await fetch(shopURL, requestOptions)
    const data = await res.json()
    if (res.ok) {
      const shopNames = {
        shopData: data
      }

      console.log(' shopNames -> ', shopNames)
      dispatch(ClearShopName())
      dispatch(shopNameList(shopNames))

      return { ok: true, data }
    } else {
      constole.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
    }
  }

  async function fetchUserPrograms() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const res = await fetch(UserProgramURL, requestOptions)
    const data = await res.json()
    if (res.ok) {
      const userProgramDispatch = {
        programData: data
      }
      dispatch(userProgramsList(userProgramDispatch))

      console.log('userProgramDispatch -> ', userProgramDispatch)

      return { ok: true, data }
    } else {
      constole.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
    }
  }

  // Call fetchMasterSectionData function
  useEffect(() => {
    setLoading(true)
    fetchHachlataGedderMomentData()
    fetchActiveProgramData()
    fetchAllProgramList()
    fetchUserRoles()
    fetchShopName()
    fetchUserPrograms()
  }, [PointSubmitted])

  const Illustration = styled('img')(({ theme }) => ({
    right: 20,
    bottom: 0,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      right: 5,
      width: 110
    }
  }))

  function holidayCallback(x){
    // if(!PointSubmitted){
      setPointSubmitted(x)
    // }
  }

  return (
    <>
      {!loading ? (
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ pb: 4 }}>
            <Typography variant='h1'>
              {userAllData?.fullname} Bas {userAllData?.MotherName}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ pb: 4 }}>
            {/* {JSON.stringify(CurrentWeek)}  */}
            <Typography variant='h4'>
              Current Program :
              {CurrentWeek ? (
                CurrentWeek?.SessionStartDt?.replace('00:00:00', '') +
                ' From ' +
                CurrentWeek?.SessionEndDt?.replace('00:00:00', '')
              ) : (
                <> No Current Program</>
              )}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <AnalyticsSupportTracker lol={PointSubmitted} />
          </Grid>

          <Grid item xs={12} md={6}>
            {pointSummeryProgram[0]?.ProgramBonusPoint > 0 && <CrmProjectStatus userData={userAllData}  x={() => holidayCallback()} />}
            <br />
            {weekPointSummary['MACount'] === 0 && (
              <BonusPoint userData={userAllData}  x={() => holidayCallback()} />
            )}
              {/* <BonusPoint userData={userAllData} x={() => holidayCallback()} /> */}

          </Grid>

          <Grid item xs={12} sx={{ pb: 4 }}>
            <Typography variant='h4'>Week wise point calculation </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
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
