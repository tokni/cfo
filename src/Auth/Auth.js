import Auth0 from 'auth0-js'
import jwt_decode from 'jwt-decode'
export const isBrowser = typeof window !== 'undefined'
class Auth {
  accessToken
  idToken
  tokenRenewalTimeout

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
    this.scheduleRenewal()
  }

  isAuthenticated = () => {
    // return localStorage.getItem('sub')
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('sub')
    localStorage.removeItem('isLoggedIn')

    this.accessToken = null
    this.idToken = null
    clearTimeout(this.tokenRenewalTimeout)
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
    const expiresAt = JSON.stringify(
      authResult.expiresIn
    )
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('firstLoad', 'true')
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken

    localStorage.setItem('accessToken', authResult.accessToken)
    localStorage.setItem('sub', authResult.idTokenPayload.sub)
    localStorage.setItem('idToken', authResult.idToken)
    this.scheduleRenewal()
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

  renewToken = () => {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        this.setSession(result)
      }
    })
  }

  scheduleRenewal = () => {
    if (typeof window !== 'undefined') {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
      const delay = expiresAt - Date.now()
      if (delay > 0) {
        this.tokenRenewalTimeout = setTimeout(() => {
          this.renewToken()
        }, delay)
      }
    }
  }
}

export default Auth
