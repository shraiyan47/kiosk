// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { useAuth } from 'src/hooks/useAuth'
import { Box } from '@mui/system'

import { styled, useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'

import Counter from '../components/Counter'
import Profile from '../components/Profile'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearWeeklyduchlist, weeklyduchsList } from 'src/redux/weeklyduch/weeklyduchSlice'
import CardHorizontalRatings from 'src/views/ui/cards/basic/CardHorizontalRatings'
import AnalyticsSupportTracker from 'src/views/dashboards/analytics/AnalyticsSupportTracker'
import CrmProjectStatus from 'src/views/dashboards/crm/CrmProjectStatus'

// import Counter from '../Counter/index'

const Home = () => {
  const LoginIllustration = styled('img')(({ theme }) => ({
    zIndex: 2,
    maxWidth: 150
  }))
  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSection?Stauts=all`);
      const aaZara = response.data;

      const requests = aaZara.map(x =>
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSectionDetailsBySectionId?SectionId=${x.Id}`)
      );

      const responseData = await Promise.all(requests);

      const combinedData = responseData.map((res, index) => ({
        options: res.data,
        ...aaZara[index]
      }));

      const weeklyduchDispatch = {
        sectionAndOptions : combinedData
      }

      dispatch(clearWeeklyduchlist())

      dispatch(weeklyduchsList(weeklyduchDispatch))

      console.log('Combined Data: ', weeklyduchDispatch);

      return combinedData;
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  };

  // Call fetchData function
  useEffect(() => {
    fetchData();
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

  return (
      <Grid container spacing={12}>
        <Grid item xs={12} sm={12} md={12}>
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
        </Grid>
      </Grid>
    )
  }
Home.acl = {
  action: 'read',
  subject: 'home-page'
}

export default Home
