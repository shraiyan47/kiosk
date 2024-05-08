// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Import
import Icon from 'src/@core/components/icon'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/useAuth'
import { Checkbox, Dialog, FormControlLabel, Input, MenuItem } from '@mui/material'
import { forwardRef, useState } from 'react'

// Required For Dialoge
import Fade from '@mui/material/Fade'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomCheckboxIcons from 'src/@core/components/custom-checkbox/basic'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const BonusPoint = param => {
  // ** Hook

  const pointSummeryProgram = useSelector(state => state.submissions.pointSummeryProgram)

  const auth = param.userData
  const LocalAuth = JSON.parse(localStorage.getItem('userData'))
  const [LOADING, setLOADING] = useState(false)
  const [viewReport, setViewReport] = useState(false)
  const [HolidayPoint, setHolidayPoint] = useState(0)
  const [MagalimCount, setMagalimCount] = useState(0)
  const [Affirm, setAffirm] = useState(false)
  const [Signature, setSignature] = useState('')

  function redeemHandler() {
    setViewReport(true)
    // alert('REDEEM')
  }

  async function submitHolidayPoint() {
    alert([HolidayPoint, MagalimCount, Affirm, Signature])
    // setViewReport(false)

    if (Affirm && Signature.length > 2) {
      const urls = `${process.env.NEXT_PUBLIC_BASE_URL}api/UserMapBonusPoint` //////
      const urlMagalim = `${process.env.NEXT_PUBLIC_BASE_URL}api/SectionMapUserlist` //////

      const param = {
        SessionId: pointSummeryProgram.SessionId,
        UserAccountId: pointSummeryProgram.UserAccountId,
        BonusPoint: HolidayPoint,
        MaagalimCount: MagalimCount,
        EntryBy: pointSummeryProgram.userId
      }

      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(param),
        redirect: 'follow'
      }

      console.log(requestOptions)

      const res = await fetch(urls, requestOptions)
      const data = await res.json()
      if (res.ok) {
        alert('Successfully POINT SUBMITTED')

        const magalim = []

        for (let i = 0; i < MagalimCount; i++) {
          magalim.push({
            SessionId: 11,
            WeekId: 109 + i,
            UserAccountId: LocalAuth.Id,
            SectionTitle: 'Maagalim',
            Point: 1,
            EntryBy:  LocalAuth.userId,
            SectionOptionList: [
              {
                SectionOption: 'I attended maagalim this week',
                Point: 5,
                EntryBy: LocalAuth.userId,
                Result: 'Yes'
              }
            ]
          })
          // alert(JSON.stringify(magalim))
        }

        const requestOptionsMagalim = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(magalim),
          redirect: 'follow'
        }

        const resMaga = await fetch(urlMagalim, requestOptionsMagalim)
        const dataMaga = await resMaga.json()
        if (res.ok) {
          alert('Successfully Magalim Submitted == '+JSON.stringify(dataMaga))
          setViewReport(false)
        }

      } else {
        console.log('ERROR => ', data.error)

        return { ok: false, err: res, data }
      }
    }
  }

  return (
    <>
      <Card>
        <CardHeader title={'Holiday point: Pesach Point'} />
        <CardContent sx={{ pb: 0 }}>
          <Button variant='contained' onClick={() => redeemHandler()}>
            Continue
          </Button>
        </CardContent>
      </Card>

      {viewReport && LOADING ? (
        'LOADING'
      ) : (
        <Dialog
          fullWidth
          open={viewReport}
          maxWidth='sm'
          scroll='body'
          onClose={() => setViewReport(false)}
          TransitionComponent={Transition}
          // onBackdropClick={() => setShow(false)}
          sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
          <Typography variant={'h3'} align={'center'} sx={{ paddingTop: 3 }}>
            Submit Pesach Point with magalim count
          </Typography>
          <Box
            sx={{
              rowGap: 1,
              columnGap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'left',
              padding: 5
            }}
          >
            <CustomTextField
              fullWidth
              autoFocus
              type='number'
              label='Pesach Point Amount'
              sx={{ display: 'flex', mb: 4 }}
              required
              onChange={x => setHolidayPoint(x.target.value)}
            />
            <CustomTextField
              fullWidth
              autoFocus
              type='number'
              label='Number of Magalim you have attended'
              sx={{ display: 'flex', mb: 4 }}
              required
              onChange={x => setMagalimCount(x.target.value)}
            />

            <FormControlLabel
              control={<Checkbox checked={Affirm} onChange={x => setAffirm(Affirm ? false : true)} />}
              label=' I affirm that I calculated my points with 100% honesty and I am proud to share it with the Rebbe.'
            />
            <br />
            <CustomTextField
              fullWidth
              autoFocus
              type='text'
              label='Signature (Full Name)'
              sx={{ display: 'flex', mb: 4 }}
              required
              onChange={x => setSignature(x.target.value)}
            />
            <Button type='button' variant='contained' onClick={() => submitHolidayPoint()}>
              Send Request
            </Button>
          </Box>
        </Dialog>
      )}
    </>
  )
}

export default BonusPoint
