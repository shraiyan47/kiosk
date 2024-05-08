// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

const ProgressLinearControlledUncontrolled = param => {
  // ** State
  console.log(' param.currentWD => ', param.currentWD)
  const totalC = param.currentWD[0]?.TotalWeekCount
  const progress = (param.currentWD[0]?.WeekCount / totalC) * 100

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress(oldProgress => {
  //       if (oldProgress === 100) {
  //         return 0
  //       }
  //       const diff = Math.random() * 10

  //       return Math.min(oldProgress + diff, 100)
  //     })
  //   }, 500)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          {/* <Typography sx={{ fontWeight: 500, mb: 1.5 }}> Week: {progress} </Typography> */}
          <LinearProgress variant='buffer' value={progress} />
        </Box>
        <Box sx={{ minWidth: 150 }}>
          <Typography variant='body2' color='text.secondary'>
            Week: {(param.currentWD[0])?`${param.currentWD[0]?.WeekCount}  Out of ${totalC}` : 'No Week Left'} 
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default ProgressLinearControlledUncontrolled
