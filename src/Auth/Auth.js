import Auth0 from 'auth0-js'
import jwt_decode from 'jwt-decode'
export const isBrowser = typeof window !== 'undefined'
class Auth {
  accessToken
  idToken

  auth = new Auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
    audience: `https://${process.env.REACT_APP_AUTH_DOMAIN}/userinfo`,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    responseType: 'token id_token',
    scope: 'openid profile',
  })

  login = () => {
    this.auth.authorize()
  }

  isAuthenticated = () => {
    return localStorage.getItem('sub')
  }

  logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('sub')
    localStorage.removeItem('isLoggedIn')

    this.accessToken = null
    this.idToken = null

    this.auth.logout()
  }

  GetUserProfile = () => {
    if (localStorage.getItem('idToken')) {
      return jwt_decode(localStorage.getItem('idToken'))
    } else {
      return 'John Doe'
    }
  }

  checkSession = () => {
    this.auth.checkSession({}, this.setSession)
  }

  setSession = authResult => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('firstLoad', 'true')
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken

    localStorage.setItem('accessToken', authResult.accessToken)
    localStorage.setItem('sub', authResult.idTokenPayload.sub)
    localStorage.setItem('idToken', authResult.idToken)
  }

  handleAuthentication = () => {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        window.location.reload()
      } else if (err) {
        console.log('Handle Authentication error', err)
      }
    })
  }
}
export default Auth
