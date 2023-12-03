
export default {
  meEndpoint: process.env.NEXT_PUBLIC_BASE_URL + 'api/tokenvalidateByGet',
  loginEndpoint: process.env.NEXT_PUBLIC_BASE_URL + 'api/token',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
