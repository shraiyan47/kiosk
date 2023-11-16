import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import axios from 'axios'
import { Box } from '@mui/system'
import { Controller } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Icon, IconButton, InputAdornment } from '@mui/material'
import { redirect } from 'next/dist/server/api-utils'

import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'

import Button from '@mui/material/Button'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

export default function QrCodeScanner() {
  const theme = useTheme()

  const auth = useAuth()

  const [scanResult, setScanResult] = useState(null)
  const [data, setData] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [succ, setSucc] = useState(false)

  const LoginIllustration = styled('img')(({ theme }) => ({
    zIndex: 2,
    maxWidth: 125
  }))

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250
      },
      fps: 5
    })

    scanner.render(success, error)
    function success(result) {
      console.log('student login check', result)
      scanner.clear()
      setScanResult(result)
      axios
        .get(`https://vehayamachanechakadosh.com:8080/api/GetUserInfoByUserId?UserId=${result}`)
        .then(response => setData(response.data))

      //   alert('Get Lol')

      document
        .getElementById('html5-qrcode-button-camera-permission')
        .classList.add(
          'MuiButtonBase-root',
          'MuiButton-root',
          'MuiButton-contained',
          'MuiButton-containedPrimary',
          'MuiButton-sizeMedium',
          'MuiButton-containedSizeMedium',
          'MuiButton-fullWidth',
          'MuiButton-root',
          'MuiButton-contained',
          'MuiButton-containedPrimary',
          'MuiButton-sizeMedium',
          'MuiButton-containedSizeMedium',
          'MuiButton-fullWidth',
          'css-1yg2td1-MuiButtonBase-root-MuiButton-root'
        )
    }

    function error(err) {
      //console.warn(err)
    }
  }, [])

  function pinHandler(x) {
    console.log('student pin check', x)
    const val = Number(x.target.value)
    if (val === data.PIN) {
      setSucc(true)
      const { userid, password } = data
      const email = userid
      auth.login({ email, password }, () => {
        setError('email', {
          type: 'manual',
          message: 'Email or Password is invalid'
        })
      })
    }
  }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          borderRadius: '20px',
          justifyContent: 'center',
          margin: theme => theme.spacing(8, 8, 0, 8)
        }}
      >
        <LoginIllustration alt='login-illustration' src={`/images/pages/studentLogin.png`} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <h2>Student Login with QR Code</h2>
      </Box>

      {scanResult ? (
        <>
          {data.userid === scanResult && !succ ? (
            <div>
              <Box sx={{ mb: 1.5 }}>
                <CustomTextField
                  fullWidth
                  label='PIN'
                  onChange={pinHandler}
                  id='auth-login-v2-password'
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
              </Box>
            </div>
          ) : (
            <div>
              <b>
                LOGIN SUCCESS {data.userid}. <br /> Please wait, we are validating your data.
              </b>
            </div>
          )}
        </>
      ) : (
        <div id='reader'></div>
      )}

      <Divider>
        <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
          Login
        </Button>
      </Divider>
    </>
  )
}
