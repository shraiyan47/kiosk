// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomTextField from 'src/@core/components/mui/text-field'
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip
} from '@mui/material'
import axios from 'axios'
import { allWeekOfProgramList, clearallWeekOfProgramList } from 'src/redux/weeklyduch/submissionSlice'

const SecondPage = () => {
  const [sectionOptionName, setSectionOptionName] = useState('')
  const [sectionOptionPoint, setSectionOptionPoint] = useState('')
  const CurrentWeekData = useSelector(state => state.weeklyduchs.currentWeek)
  const [selectedWeek, setSelectedWeek] = useState([])
  const [selectedWeekName, setSelectedWeekName] = useState(CurrentWeekData[0]?.WeekName)
  const [allWeekOfProgram, setAllWeekProgram] = useState([])
  const [updated, setUpdated] = useState('')

  const dispatch = useDispatch()

  function formatDate(dateString) {
    // Split the input date string into day, month, and year
    var parts = dateString.split('-')
    var day = parseInt(parts[0])
    var monthStr = parts[1]
    var year = parseInt(parts[2])

    // Define a mapping of month abbreviations to month numbers
    var monthMap = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12
    }

    // Get the month number from the mapping
    var month = monthMap[monthStr]

    // Construct a Date object with the provided day, month, and year
    var dateObj = new Date(year, month - 1, day)

    // Get the formatted date in 'YYYY-MM-DD' format
    var formattedDate = dateObj.toISOString().split('T')[0]

    return formattedDate
  }

  const renderUserRoleOptions = () => {
    return allWeekOfProgram[0]?.map(item => (
      <option key={item.WeekId} value={[item.WeekId, item.WeekStartDt, item.WeekEndDt]}>
        {item.WeekName}
      </option>
    ))
  }

  useEffect(() => {
    fetchWeeks()
    fetchBonusSection()

    async function fetchWeeks() {
      try {
        const resAllWeekOfProgram = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/Week?SessionId=${CurrentWeekData[0]?.SessionId}`
        )

        if (resAllWeekOfProgram.status === 200) {
          const data = resAllWeekOfProgram.data
          console.log('WEEK LIST ->', data)

          const allWeekProgram = {
            allWeekOfProgram: data
          }

          dispatch(clearallWeekOfProgramList())

          dispatch(allWeekOfProgramList(allWeekProgram))

          setAllWeekProgram([data])
          // alert("LOL")
          console.log('Fetched ALL WEEK OF PROGRAM data:', allWeekProgram) // Use a logger for informative messages
        } else {
          throw new Error(`API request failed with status ${response.status}`)
        }
      } catch (err) {
        console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

        return { ok: false, err: err }
      }
    }

    async function fetchBonusSection() {
      try {
        const resAllWeekOfProgram = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSectionDetailsBySectionId?SectionId=8`
        )

        if (resAllWeekOfProgram.status === 200) {
          const data = resAllWeekOfProgram.data

          setSectionOptionName(data[0].Name)
          setSectionOptionPoint(data[0].Point)
          // alert("LOL")
          console.log('Fetched ALL WEEK OF PROGRAM data:', allWeekProgram) // Use a logger for informative messages
        } else {
          throw new Error(`API request failed with status ${response.status}`)
        }
      } catch (err) {
        console.error('Error fetching ALL WEEK OF PROGRAM data:', err)

        return { ok: false, err: err }
      }
    }
  }, [ updated])

  useEffect(() => {
    console.log(' allWeekOfProgram -> ', allWeekOfProgram)
  }, [allWeekOfProgram])

  const urls = `${process.env.NEXT_PUBLIC_BASE_URL}api/Week` //////
  const urlMSD = `${process.env.NEXT_PUBLIC_BASE_URL}api/MasterSectionDetails` //////

  async function resetHandler(x) {
    console.log('RESET WEEK ---> ', x)

    const param = {
      Id: x[0],
      sessionid: CurrentWeekData[0]?.SessionId,
      name: x[3],
      IsBonusSection: false,
      StartDt: formatDate(x[1]),
      EndDt: formatDate(x[2])
    }

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(param),
      redirect: 'follow'
    }

    console.log(requestOptions)

    const res = await fetch(urls, requestOptions)
    const data = await res.json()
    if (res.ok) {
      alert('Successfully Week Reset')

      setUpdated('Successfully Week Updated' + data)
    } else {
      console.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
    }
  }

  const handleBonusSectionSubmission = async () => {
    const x = selectedWeek.split(',')
    console.log('selectedWeek => ', x)

    if (x[0] > CurrentWeekData[0].WeekId) {
      //////////////////////////////////////////////// Week UPDATE
      const param = {
        Id: x[0],
        sessionid: CurrentWeekData[0]?.SessionId,
        name: selectedWeekName,
        IsBonusSection: true,
        StartDt: formatDate(x[1]),
        EndDt: formatDate(x[2])
      }

      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(param),
        redirect: 'follow'
      }

      console.log(requestOptions)

      const res = await fetch(urls, requestOptions)
      const data = await res.json()
      if (res.ok) {
        alert('Successfully Week Updated')

        /////////////////////////////////////////////// MASTER SECTION UPDATE

        const paramMSD = {
          Id: 18,
          SectionId: 8,
          Name: sectionOptionName,
          Point: sectionOptionPoint,
          UpdateBy: 'sysadmin'
        }

        const myHeadersMSD = new Headers()
        myHeadersMSD.append('Content-Type', 'application/json')

        const requestOptionsMSD = {
          method: 'PUT',
          headers: myHeadersMSD,
          body: JSON.stringify(paramMSD),
          redirect: 'follow'
        }

        const resMSD = await fetch(urlMSD, requestOptionsMSD)
        const dataMSD = await resMSD.json()

        if (resMSD.ok) {
          alert('Successfully Section Option Updated')
          setUpdated('Successfully Week Updated')
        } else {
          console.log('ERROR => ', dataMSD.error)

          return { ok: false, err: res, dataMSD }
        }

        // return { ok: true, data }
      } else {
        console.log('ERROR => ', data.error)

        return { ok: false, err: res, data }
      }
    } else {
      alert('You can not choose previous or current week.')
    }
    // alert('BOOM ')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={'Bonus Section || Current Week: ' + CurrentWeekData[0]?.WeekName}></CardHeader>
          <CardContent>
            <Grid container spacing={6.5}>
              <Grid item xs={3}>
                <CustomTextField
                  select
                  value={selectedWeek}
                  onChange={x => {
                    setSelectedWeek(x.target.value)
                    setSelectedWeekName(x.target.selectedOptions[0].text)
                  }}
                  fullWidth
                  id='userrole-select'
                  label='Week List'
                  sx={{ mb: 4 }}
                  SelectProps={{
                    native: true // For Material-UI native Select
                  }}
                >
                  <option>Select Week</option>
                  {renderUserRoleOptions()}
                </CustomTextField>
              </Grid>
              <Grid item xs={5}>
                <CustomTextField
                  value={sectionOptionName}
                  fullWidth
                  sx={{ mr: 4 }}
                  placeholder='Section Option Name'
                  onChange={e => setSectionOptionName(e.target.value)}
                  label='Section Option Name'
                />
              </Grid>
              <Grid item xs={2}>
                <CustomTextField
                  value={sectionOptionPoint}
                  fullWidth
                  sx={{ mr: 4 }}
                  placeholder='Point'
                  onChange={e => setSectionOptionPoint(e.target.value)}
                  label='Point'
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant='contained' sx={{ marginTop: '20px' }} onClick={() => handleBonusSectionSubmission()}>
                  Add
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item>
                <Tooltip
                  title="After select a week and set Section option with a point and submit these data, you are actually
                'Active' a week's bonus section and set a 'Section Option Name' with its 'Point'. If you choose Another
                week and do the same thing, it will just active another week's bonus section and Section Option will be
                updated. It will not create a new section option for another week. And if you press the 'Reset' button from the table, it will simply deactivate the weeks bonus section. "
                  placement='right'
                  arrow
                >
                  <Button> ** NOTE</Button>
                </Tooltip>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableContainer component={Paper}>
            <Table sx={{ padding: '100px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align='center' variant='head'>
                    Week Name
                  </TableCell>
                  <TableCell align='center' variant='head'>
                    Week Start Date
                  </TableCell>
                  <TableCell align='center' variant='head'>
                    Week End Date
                  </TableCell>
                  <TableCell align='center' variant='head'>
                    Bonus Section
                  </TableCell>
                  <TableCell align='center' variant='head'>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allWeekOfProgram[0]?.map((x, i) => (
                  <TableRow key={i}>
                    <TableCell> {x.WeekId} </TableCell>
                    <TableCell align='center' variant='body'>
                      {' '}
                      {x.WeekName}{' '}
                    </TableCell>
                    <TableCell align='center' variant='body'>
                      {' '}
                      {x.WeekStartDt}{' '}
                    </TableCell>
                    <TableCell align='center' variant='body'>
                      {' '}
                      {x.WeekEndDt}{' '}
                    </TableCell>
                    <TableCell align='center' variant='body'>
                      {' '}
                      {x?.IsBonusSection ? 'ACTIVE' : ''}{' '}
                    </TableCell>
                    <TableCell align='center' variant='body'>
                      {x?.IsBonusSection && CurrentWeekData[0]?.WeekId < x.WeekId ? (
                        <Button
                          variant='contained'
                          size='small'
                          onClick={() => resetHandler([x.WeekId, x.WeekStartDt, x.WeekEndDt, x.WeekName])}
                        >
                          RESET
                        </Button>
                      ) : (
                        <Button variant='contained' size='small' disabled>
                          RESET
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SecondPage
