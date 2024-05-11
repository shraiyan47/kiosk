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
import { Dialog, Input, MenuItem } from '@mui/material'
import { forwardRef, useEffect, useState } from 'react'

// Required For Dialoge
import Fade from '@mui/material/Fade'
import CustomTextField from 'src/@core/components/mui/text-field'
import axios from 'axios'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CrmProjectStatus = param => {
  // ** Hook

  const pointSummeryProgram = useSelector(state => state.submissions.pointSummeryProgram)
  const shopName = useSelector(state => state.userRoles.shopData)
  const shopName2 = shopName[0]

  console.log(
    'shopName CRMP-> ',
    useSelector(state => state.userRoles.shopData),
    shopName2
  )

  const auth = param.userData
  const LocalAuth = JSON.parse(localStorage.getItem('userData'))

  const [LOADING, setLOADING] = useState(false)
  const [viewReport, setViewReport] = useState(false)
  const [selectedShop, setSelectedShop] = useState(0)
  const [selectedShopName, setSelectedShopName] = useState('')
  const [WithdrawAmount, setWithdrawAmount] = useState(0)
  const [withDrawHistory, setWithDrawHistory] = useState(0)

  const remainingBalance = pointSummeryProgram[0]?.EarningValue - withDrawHistory

  const data = [
    {
      title: 'Withdraw Amount',
      trend: 'negative',
      amount: '$' + withDrawHistory
      // amount: '$' + pointSummeryProgram[0]?.WithDrawAmount
      // trendDiff: 139.34
    },
    {
      title: 'Remaining Balance',
      // trendDiff: 576.24,
      amount: '$' + remainingBalance
      // amount: '$' + pointSummeryProgram[0]?.Balance
    }
  ]

  useEffect(() => {
    fetchWithdrawAmount()
  }, [])

  async function fetchWithdrawAmount() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/UserWithDrawAmountHistory?UserAccountId=${LocalAuth.Id}`
      )

      if (response.status === 200) {
        const data = response.data
        // alert(JSON.stringify(response.data))
        console.log('WITHDRAW HISTORY -----> ', response.data)
        let s = 0
        data.map(x => {
          s += x.WithDrawAmount
        })

        setWithDrawHistory(s)
      }
    } catch (err) {
      console.error('Error fetching active program data:', err)
      // setLoading(false)

      // return { ok: false, err: err }
    }
  }

  function redeemHandler() {
    setViewReport(true)
    // alert('REDEEM')
  }

  const shopHandler = para => {
    console.log(para)
    setSelectedShop(para.target.value)
    setSelectedShopName(shopName2.find(x => x.Id == para.target.value).Name)
  }

  async function submitVoucherHandler() {
    // alert(['UNDER DEVELOPMENT', selectedShop, WithdrawAmount])
    setViewReport(false)

    if (selectedShop > 0 && WithdrawAmount > 0) {
      if (remainingBalance < WithdrawAmount) {
        alert('You can not withdraw more than your remaining balance!')
      } else {
        const urls = `${process.env.NEXT_PUBLIC_BASE_URL}api/UserWithDrawAmount` //////
        const date = new Date(Date.now())

        const withdrawData = {
          SessionId: 11,
          UserAccountId: LocalAuth.Id,
          ShopId: selectedShop,
          ShopName: selectedShopName,
          WithDrawAmount: Number(WithdrawAmount),
          EntryBy: 'USER'
        }

        console.log('withdrawData ==> ', withdrawData)

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(withdrawData),
          redirect: 'follow'
        }

        console.log(requestOptions)

        const res = await fetch(urls, requestOptions)
        const data = await res.json()
        if (res.ok) {
          alert('Successfully Point Withdraw')
          fetchWithdrawAmount(remainingBalance)
          param.x()
        } else {
          console.log('ERROR => ', data.error)

          return { ok: false, err: res, data }
        }
      }
    }
  }

  

  return (
    <>
      <Card>
        <CardHeader title={'Membership Level : ' + pointSummeryProgram[0]?.Member} />
        <CardContent sx={{ pb: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '15px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <CustomAvatar skin='light' color='warning' variant='rounded' sx={{ mr: 3, width: 34, height: 34 }}>
                <Icon icon='tabler:star-filled' />
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant='h6'>{pointSummeryProgram[0]?.TotalPoint}</Typography>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    Total Points
                  </Typography>
                </Box>
                {/* <Typography sx={{ fontWeight: 500, color: 'success.main' }}>+10.2%</Typography> */}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <CustomAvatar skin='light' color='warning' variant='rounded' sx={{ mr: 3, width: 34, height: 34 }}>
                <Icon icon='tabler:report-money' />
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant='h6'>
                    {pointSummeryProgram[0]?.EarningValue == null
                      ? auth?.user?.MemberId > 0 || auth?.user?.MemberId !== null
                        ? '$0'
                        : 'No Membership Choosed'
                      : '$' + pointSummeryProgram[0]?.EarningValue}
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    Your Earnings
                  </Typography>
                </Box>
                {/* <Typography sx={{ fontWeight: 500, color: 'success.main' }}>+10.2%</Typography> */}
              </Box>
            </Box>
          </Box>
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                rowGap: 1,
                columnGap: 4,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: index !== data.length - 1 ? 4 : undefined
              }}
            >
              <Typography variant='h6'>{item.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 4, color: 'text.secondary' }}>{item.amount}</Typography>
                {/* <Typography sx={{ fontWeight: 500, color: `${item.trend === 'negative' ? 'error' : 'success'}.main` }}>
                  {`${item.trend === 'negative' ? '-' : '+'}${item.trendDiff}`}
                </Typography> */}
              </Box>
            </Box>
          ))}
          <br></br>
          <Button variant='contained' onClick={() => redeemHandler()}>
            Redeem
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
            Voucher Request
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
            <CustomTextField select sx={{ mr: 4, mb: 2 }} onChange={x => shopHandler(x)} required label='Shop Name'>
              {shopName2?.map((data, i) => (
                <MenuItem key={i + 1} value={data.Id}>
                  {data.Name}
                </MenuItem>
              ))}
            </CustomTextField>

            <CustomTextField
              fullWidth
              autoFocus
              type='number'
              label='Withdraw Amount'
              sx={{ display: 'flex', mb: 4 }}
              required
              onChange={x => setWithdrawAmount(x.target.value)}
            />

            <Button type='button' variant='contained' onClick={() => submitVoucherHandler()}>
              Send Request
            </Button>
          </Box>
        </Dialog>
      )}
    </>
  )
}

export default CrmProjectStatus
