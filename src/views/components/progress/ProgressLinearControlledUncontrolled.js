// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

const ProgressLinearControlledUncontrolled = () => {
  // ** State
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10

        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontWeight: 500, mb: 1.5 }}> Week: </Typography>
        <LinearProgress variant='determinate' value={40} />
      </Box>
    </>
  )
}

export default ProgressLinearControlledUncontrolled
