// ** React Imports
import { forwardRef, useState, Fragment } from 'react'

// ** Next Import
// import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// Required For Edit Dialoge
import EditUserDrawer from 'src/views/pages/user/EditUser'
import { Button, Dialog, Grid } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

// Required For Dialoge
import Fade from '@mui/material/Fade'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const UserDropdown = props => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [LOADING, setLOADING] = useState(false)

  const [viewProfile, setViewProfile] = useState(false)
  const [ProfileLoading, setProfileLoading] = useState(false)

  // ** Hooks
  // const router = useRouter()
  const { logout } = useAuth()
  const auth = useAuth()
  const userAllData = useSelector(state => state.userPrograms.userData[0])
  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const userProgramStateData = useSelector(state => state.userPrograms.programData[0])


  const handleDropdownClose = url => {
    // if (url) {
    //   router.push(url)
    // }
    setAnchorEl(null)
  }

  // function handleProfile(params) {
  //   alert(params)

  //   // if (params) {
  //   //   router.push(params)
  //   // }
  //   setAnchorEl(null)

  //   setViewProfile(true)
  // }

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem',
      color: 'text.secondary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  const onSuccessHandler = x => {
    alert(x)
  }

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue
  } = useForm({
    mode: 'onSubmit'
  })

  const onSubmit = x => {
    const UpdateProfile = {
      password: userAllData?.password,
      PIN: auth?.user?.PIN,
      UserId: auth?.user?.userId,
      UpdateBy: auth?.user?.userId, 
      UserName: auth?.user?.fullname,
      MotherName: x.fullnameMother,
      TargetMemberId: Number(x.Member)
    }

    console.log('Update Profile ===> ', UpdateProfile, auth)

    postData(UpdateProfile)
  }

  const my_url_PIN_PASS = `${process.env.NEXT_PUBLIC_BASE_URL}api/User/PINPassword` //////

  const postData = async param => {
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

    const res = await fetch(my_url_PIN_PASS, requestOptions)
    const data = await res.json()
    if (res.ok) {
      // dispatch(usersList(userDispatch))
      // setShow(false)
      // toggle(true)
      alert(' Successfully Updated') 

      return { ok: true, data }
    } else {
      console.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
    }
  }

  return (
    <>
      <Fragment>
        <Badge
          overlap='circular'
          onClick={handleDropdownOpen}
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Avatar
            alt='John Doe'
            src='/images/avatars/admin.png'
            onClick={handleDropdownOpen}
            sx={{ width: 38, height: 38 }}
          />
        </Badge>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleDropdownClose()}
          sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        >
          <Box sx={{ py: 1.75, px: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap='circular'
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Avatar alt='John Doe' src='/images/avatars/admin.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
              </Badge>
              <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 500 }}>{auth.user.fullname}</Typography>
                <Typography variant='body2'>{auth.user.userrole}</Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
          <MenuItemStyled sx={{ p: 0 }} onClick={() => setViewProfile(true)}>
            <Box sx={styles}>
              <Icon icon='tabler:user-check' />
              Update Profile
            </Box>
          </MenuItemStyled>
          <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='tabler:settings' />
              Settings
            </Box>
          </MenuItemStyled>
          {/* <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='tabler:credit-card' />
            Billing
          </Box>
        </MenuItemStyled>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='tabler:lifebuoy' />
            Help
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='tabler:info-circle' />
            FAQ
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='tabler:currency-dollar' />
            Pricing
          </Box>
        </MenuItemStyled> */}
          <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
          <MenuItemStyled sx={{ p: 0 }} onClick={handleLogout}>
            <Box sx={styles}>
              <Icon icon='tabler:logout' />
              Sign Out
            </Box>
          </MenuItemStyled>
        </Menu>
      </Fragment>
      {/* {viewProfile == true &&  */}
      {viewProfile && LOADING ? (
        'LOADING'
      ) : (
        <Dialog
          fullWidth
          open={viewProfile}
          maxWidth='sm'
          scroll='body'
          onClose={() => setViewProfile(false)}
          TransitionComponent={Transition}
          // onBackdropClick={() => setShow(false)}
          sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
          <Typography variant={'h3'} align={'center'} sx={{ paddingTop: 4 }}>
            Update Profile
          </Typography>
          <Box
            sx={{
              rowGap: 1,
              columnGap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'left',
              padding: 3
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={5} sx={{ px: 4 }}>
                  <Controller
                    name='fullnameMother'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        sx={{ mb: 4 }}
                        label="Mother Full Name"
                        onChange={onChange}
                        type={'text'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={5} sx={{ px: 4 }}> 
                  <Controller
                    name='Member'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        id='Member-select'
                        label='Member'
                        value={value}
                        onChange={onChange}
                        sx={{ mb: 4 }}
                        error={Boolean(errors.Member)}
                        aria-describedby='validation-Member-select'
                        {...(errors.Member && { helperText: errors.Member.message })}
                        SelectProps={{ native: true }}
                      >
                        {userProgramStateData.map(item => (
                          <option key={item.Id} value={item.Id}>
                            {item.Name}
                          </option>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={2} sx={{ px: 4, pt: 5 }}>
                  <Button type='submit' variant='contained'>
                    Update
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Dialog>
      )}
    </>
  )
}

export default UserDropdown
