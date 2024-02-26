/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, forwardRef, useEffect } from 'react'
import { useRandomPassword, useRandomString } from 'src/hooks/useRandom'

// ** MUI Imports
import Box from '@mui/material/Box'

// import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Form
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import { useSelector } from 'react-redux'

// ** STATE MANAGEMENT
// import { useDispatch } from 'react-redux'
// import {  } from '../redux/state/counterSlice'

// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const EditUserDrawer = param => {
  // const [data, setData] = useState(param?.data)
  const userAllData = useSelector(state => state.userPrograms.userData[0])
  const data = (param?.data?.password == null && param.show)?userAllData: param?.data
  const userRoleStateData = useSelector(state => state.userRoles.data)
  const userProgramStateData = useSelector(state => state.userPrograms.programData[0])

  console.log("param ---> ", data)

  const [show, setShow] = useState(param?.show)

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

  const userRoleVal = !watch('userrole') ? data.userrole : watch('userrole')

  const [userMemberId, setUserMemberId] = useState('')

  useEffect(() => {
    if (!show & !!data) {
      setShow(true)
    }
    setUserMemberId(data?.MemberId?.toString())
    console.log(' Edit data -> ', data)
  }, [data])



  console.log("userProgramStateData --> ",userProgramStateData)

  const NOUS = Number(userRoleStateData.length)
  // const NOPS = Number(userProgramStateData.length)
  const userroleSV = userRoleStateData[NOUS - 1]
  // const userprogramSV = userProgramStateData[NOPS-1]

  const renderUserRoleOptions = () => {
    return userroleSV?.map(item => (
      <option key={item.Id} value={item.Name}>
        {item.Name}
      </option>
    ))
  }

  const renderUserProgramOptions = () => {
    return userProgramStateData?.map(item => (
      <option key={item.Id} value={item.Id}>
        {item.Name}
      </option>
    ))
  }

  const auth = useAuth()
  const entryPerson = !!auth?.user ? auth?.user.userId : 'unauthorizedEntry'
  const my_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/User` //////

  const onSubmit = dataX => {
    const userAddData = {
      Id: data.Id,
      UserId: data.userId,
      MemberId: dataX.Member,
      UserRole: dataX.userrole,
      PIN: data.PIN,
      UserName: dataX.username,
      Password: data.password,
      email: dataX.email,
      UpdateBy: entryPerson,
      UserProfiles: {
        Id: data.ProfileId,
        UserAccountId: data.Id,
        UserId: data.userId,
        FullName: dataX.firstname + ' ' + dataX.lastname,
        firstname: dataX.firstname,
        lastname: dataX.lastname,
        Class: !!dataX.Class ? dataX.Class : 'null',
        Grade: !!dataX.grade ? dataX.grade : 'null',
        UpdateBy: entryPerson
      }
    }

    console.log('userAddData ===> ', userAddData)

    updateData(userAddData)
  }

  const updateData = async userUpdatedData => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(userUpdatedData),
      redirect: 'follow'
    }

    console.log(' requestOptions => ', requestOptions)

    const res = await fetch(my_url, requestOptions)
    const data = await res.json()
    if (res.ok) {
      // dispatch(usersList(userDispatch))
      alert('Edit Success')
      handleClose('Edit Success')
      // console.log("first", param)
      // param.onSuccess(data)

      return { ok: true, data }
    } else {
      console.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
    }
  }

  const handleClose = (msg) => {
    setShow(false)
    reset()
    // setData('')
    if(msg){
      param.onSuccess(msg)
    }
    else{
      param.onSuccess('EDIT CLOSE')
    }
    // toggle
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => handleClose()}
        TransitionComponent={Transition}
        onBackdropClick={() => handleClose()}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>

          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >

            <CustomCloseButton onClick={() => handleClose()}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>

            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h3' sx={{ mb: 3 }}>
                Edit User {(data?.firstname==null)&&data?.fullname}
              </Typography>
            </Box>

            {!!data && (
              <>
                <Grid container spacing={6}>
                  <Grid item sm={6} xs={12}>
                    {/* <CustomTextField fullWidth label='Full Name' placeholder='John' /> */}
                    <Controller
                      name='firstname'
                      control={control}
                      rules={{ required: true }}
                      defaultValue={(data?.firstname==null)? data?.fullname:data?.firstname}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          sx={{ mb: 4 }}
                          label='First Name'
                          onChange={onChange}
                          placeholder='John'
                          error={Boolean(errors.firstname)}
                          {...(errors.firstname && { helperText: errors.firstname.message })}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='lastname'
                      control={control}
                      rules={{ required: true }}
                      defaultValue={data?.lastname}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          sx={{ mb: 4 }}
                          label='Last Name'
                          onChange={onChange}
                          placeholder='Rayan'
                          error={Boolean(errors.lastname)}
                          {...(errors.lastname && { helperText: errors.lastname.message })}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name='email'
                      control={control}
                      rules={{ required: true }}
                      defaultValue={data?.email}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          sx={{ mb: 4 }}
                          label='Email'
                          onChange={onChange}
                          placeholder='john@xyz.com'
                          error={Boolean(errors.email)}
                          {...(errors.email && { helperText: errors.email.message })}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='userrole'
                      control={control}
                      rules={{ required: true }}
                      defaultValue={data?.userrole}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          select
                          value={value}
                          onChange={onChange}
                          fullWidth
                          id='userrole-select'
                          label='User Role'
                          sx={{ mb: 4 }}
                          error={Boolean(errors.userrole)}
                          aria-describedby='validation-userrole-select'
                          {...(errors.userrole && { helperText: errors.userrole.message })}
                          SelectProps={{
                            native: true // For Material-UI native Select
                          }}
                        >
                          <option value='null'>User Role</option>
                          {renderUserRoleOptions()}
                        </CustomTextField>
                      )}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='Member'
                      control={control}
                      defaultValue={userMemberId}
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
                          <option value='null'>Program</option> {renderUserProgramOptions()}
                        </CustomTextField>
                      )}
                    />
                  </Grid>

                  {userRoleVal === 'student' && (
                    <>
                      <Grid item sm={6} xs={12}>
                        <Controller
                          name='Class'
                          control={control}
                          defaultValue={data?.Class}
                          render={({ field: { value, onChange } }) => (
                            <CustomTextField
                              fullWidth
                              value={value}
                              sx={{ mb: 4 }}
                              label='Class'
                              onChange={onChange}
                              placeholder='A'
                            />
                          )}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Controller
                          name='grade'
                          control={control}
                          defaultValue={data?.grade}
                          render={({ field: { value, onChange } }) => (
                            <CustomTextField
                              fullWidth
                              value={value}
                              sx={{ mb: 4 }}
                              label='Grade'
                              onChange={onChange}
                              placeholder='1'
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button type='submit' variant='contained' sx={{ mr: 1 }}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => handleClose()}>
              Discard
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  )
}

export default EditUserDrawer
