// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { useDispatch } from 'react-redux'
import { userAllList } from 'src/redux/user/userProgramSlice'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [cleared, setCleared] = useState(false)
  const dispatch = useDispatch()

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          })
          .then(async response => {
            response.data.role = response.data.userrole
            setLoading(false)
            // setUser({ ...response.data })

            const x = {
              email: response.data.email,
              password: response.data.password
            }

            handleLogin(x)
            
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    console.log(params.email)
    axios
      .post(authConfig.loginEndpoint, {
        email: params.email,
        password: params.password
      })
      .then(async response => {
        response.data.userData.role = response.data.userData.userrole

        const params = new URLSearchParams([['UserId', response.data.userData.userId]])
        const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + 'api/GetUserInfoByUserId', { params })

        response.data.userData.Member = res.data.Member
        response.data.userData.fullname = res.data.fullname
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        res.data.ProfileId = response.data.userData.ProfileId
        
        const userAllDispatch = {
          userData: res?.data
        }

        dispatch(userAllList(userAllDispatch))
  
        console.log("User All Dispatch -> ",userAllDispatch)
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.userData })
        window.localStorage.setItem('userData', JSON.stringify(response.data.userData))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    // if (!cleared) {
      const clearCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('clearStorage='))
      // if (!clearCookie) {
        // window.localStorage.removeItem('userData')
        // window.localStorage.removeItem(authConfig.storageTokenKeyName)
        window.localStorage.clear()
        window.sessionStorage.clear()
        document.cookie = 'clearStorage=true; expires=Thu, 01 Jan 2030 00:00:00 GMT';
        setCleared(true);
      // }
    // }
    // router.push('/login')
    window.location.replace('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
