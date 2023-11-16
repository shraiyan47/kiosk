import React, { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
// import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import { styled, useTheme } from '@mui/material/styles'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: '12345',
  email: 'chaim.levilev@gmail.com'
}

export default function AuthorityLogin() {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const submitHandler = data => {
    console.log("login", data)
    const { email, password } = data
    auth.login({ email, password }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  return (
    <div>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(submitHandler)}>
        <Box sx={{ mb: 4 }}>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextField
                fullWidth
                autoFocus
                label='Email'
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder='admin@vuexy.com'
                error={Boolean(errors.email)}
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />
        </Box>
        <Box sx={{ mb: 1.5 }}>
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextField
                fullWidth
                value={value}
                onBlur={onBlur}
                label='Password'
                onChange={onChange}
                id='auth-login-v2-password'
                error={Boolean(errors.password)}
                {...(errors.password && { helperText: errors.password.message })}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            mb: 1.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <FormControlLabel
            label='Remember Me'
            control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
          />
          <Typography component={LinkStyled} href='/forgot-password'>
            Forgot Password?
          </Typography>
        </Box>
        <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
          Login
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
          <Typography href='/register' component={LinkStyled}>
            Create an account
          </Typography>
        </Box>
        <Divider
          sx={{
            color: 'text.disabled',
            '& .MuiDivider-wrapper': { px: 6 },
            fontSize: theme.typography.body2.fontSize,
            my: theme => `${theme.spacing(6)} !important`
          }}
        >
          or
        </Divider>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
            <Icon icon='mdi:facebook' />
          </IconButton>
          <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
            <Icon icon='mdi:twitter' />
          </IconButton>
          <IconButton
            href='/'
            component={Link}
            onClick={e => e.preventDefault()}
            sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
          >
            <Icon icon='mdi:github' />
          </IconButton>
          <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
            <Icon icon='mdi:google' />
          </IconButton>
        </Box>
      </form>
    </div>
  )
}
