// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
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

const AddMasterdataDrawer = props => {
  const { toggle } = props  
  const { masterid } = props
  console.log("props add", masterid)
  // ** States
  const [show, setShow] = useState(false)

  const handleShow = () => {
    // Only call the setShow() function if the state needs to be changed
    if (!show) {
      setShow(true)
    }
  }

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    console.log("Boom ---> ",toggle)
  }, [control]);

  const onSubmit = data => {
    console.log(" Form => ",data)

    // if (store.allData.some(u => u.email === data.email || u.username === data.username)) {
    //   store.allData.forEach(u => {
    //     if (u.email === data.email) {
    //       setError('email', {
    //         message: 'Email already exists!'
    //       })
    //     }
    //     if (u.username === data.username) {
    //       setError('username', {
    //         message: 'Username already exists!'
    //       })
    //     }
    //   })
    // } else {
 
      
      toggle()
      reset()

    // }
  }

  const handleClose = () => { 
    setShow(false)
    //setValue('contact', Number(''))
    //toggle()
    reset()
  }

  const demoData = {
    userid: '1699036939',
    userrole: 'admin', //
    PIN: 4567,
    MemberId: 1,
    Member: 'Non member', //
    fullname: 'Test User', //
    password: '1234',
    nickname: null, //
    Class: 'B', //
    grade: '9', //
    filepath: null,
    filename: null,
    Id: 1,
    EntryDt: '2023-11-04T00:00:00',
    EntryBy: 'sysadmin',
    UpdateDt: '2023-11-04T01:58:42.783',
    UpdateBy: 'sysadmin',
    IsActive: true,
    Remarks: null
  }

  return (
    <Card>
      <Button onClick={handleShow} variant='contained' sx={{ '& svg': { mr: 2 } }}>
        <Icon fontSize='1.125rem' icon='tabler:plus' />
        Add Master Data
      </Button>

      <Dialog
        disableEscapeKeyDown
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              handleClose()
            }
          }}
        TransitionComponent={Transition}     
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
            <CustomCloseButton onClick={() => setShow(false)}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h3' sx={{ mb: 3 }}>
                Add User
              </Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={8} xs={12}>
                {/* <CustomTextField fullWidth label='Full Name' placeholder='John' /> */}
                <Controller
                  name='filename'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='Name'
                      onChange={onChange}
                      placeholder='Master Data Name'
                      error={Boolean(errors.filename)}
                      {...(errors.filename && { helperText: errors.filename.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <Controller
                  name='nickname'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='Nick Name'
                      onChange={onChange}
                      placeholder='Rayan'
                      error={Boolean(errors.nickname)}
                      {...(errors.nickname && { helperText: errors.nickname.message })}
                    />
                  )}
                />
              </Grid>

              {/* <Grid item xs={12}>
                <CustomTextField fullWidth label='Username' placeholder='johnDoe' />

                <Controller
                  name='nickname'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => ( 
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='Nick Name'
                      onChange={onChange}
                      placeholder='Rayan'
                      error={Boolean(errors.nickname)}
                      {...(errors.nickname && { helperText: errors.nickname.message })}
                    />
                  )}
                />
              </Grid> */}

              <Grid item sm={6} xs={12}>
                <Controller
                  name='userrole'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      defaultValue='Student'
                      fullWidth
                      id='userrole-select'
                      label='User Role'
                      sx={{ mb: 4 }}
                      error={Boolean(errors.userrole)}
                      aria-describedby='validation-userrole-select'
                      {...(errors.userrole && { helperText: errors.userrole.message })}
                      SelectProps={{ value: value, onChange: e => onChange(e) }}
                    >
                      <MenuItem value=''>User Role</MenuItem>
                      <MenuItem value='Admin'>Admin</MenuItem>
                      <MenuItem value='Teacher'>Teacher</MenuItem>
                      <MenuItem value='Student'>Student</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='Member'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      defaultValue='Non-member'
                      fullWidth
                      id='Member-select'
                      label='Member'
                      sx={{ mb: 4 }}
                      error={Boolean(errors.Member)}
                      aria-describedby='validation-Member-select'
                      {...(errors.Member && { helperText: errors.Member.message })}
                      SelectProps={{ value: value, onChange: e => onChange(e) }}
                    >
                      <MenuItem value='Program'>Program</MenuItem>{' '}
                      {/* Non-member / Silver member / Gold member / Platinum member */}
                      <MenuItem value='Non-member'>Non-member</MenuItem>
                      <MenuItem value='Silver-member'>Silver member</MenuItem>
                      <MenuItem value='Gold-member'>Gold member</MenuItem>
                      <MenuItem value='Platinum-member'>Platinum member</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Controller
                  name='Class'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='Class'
                      onChange={onChange}
                      placeholder='A'
                      error={Boolean(errors.Class)}
                      {...(errors.Class && { helperText: errors.Class.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
              <Controller
                  name='Grade'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='Grade'
                      onChange={onChange}
                      placeholder='1'
                      error={Boolean(errors.Grade)}
                      {...(errors.Grade && { helperText: errors.Grade.message })}
                    />
                  )}
                /> 
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button type='submit' variant='contained' sx={{ mr: 1 }} onClick={() => setShow(false)}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Discard
            </Button>            
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  )
}

export default AddMasterdataDrawer
