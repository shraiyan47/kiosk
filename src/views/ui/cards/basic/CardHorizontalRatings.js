// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import CardSnippet from 'src/@core/components/card-snippet'
import * as source from 'src/views/components/progress/ProgressSourceCode'
import EcommerceStatistics from 'src/pages/programs/old_program'
import ProgressLinearControlledUncontrolled from 'src/pages/programs/old_progress_bar'

// Styled Grid component
const StyledGrid1 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0 !important'
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3, 4.75),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  }
}))

// Styled Grid component
const StyledGrid2 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0 !important'
  },
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  height: '11rem',
  borderRadius: theme.shape.borderRadius
}))

const CardHorizontalRatings = () => {
  return (
    <Card>
      <Grid container spacing={6}>
        <StyledGrid1 item xs={12} md={6} lg={7}>
          <CardContent>
            <Typography variant='h5' sx={{ mb: 2 }}>
            December 27, 2023 to July 24, 2024
            </Typography>
            <Box>
              <ProgressLinearControlledUncontrolled />
            </Box>

            <EcommerceStatistics />

          </CardContent>
          
        </StyledGrid1> 
      </Grid>
    </Card>
  )
}

export default CardHorizontalRatings
