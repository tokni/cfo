import Auth0 from 'auth0-js'
import jwt_decode from 'jwt-decode'
export const isBrowser = typeof window !== 'undefined'
class Auth {
  accessToken
  idToken
  expires_at
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
    this.handleAuthentication()
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))

    if (
      new Date().getTime() / 1000 < parseInt(expiresAt) &&
      localStorage.getItem('sub')
    ) {
      return true
    }
    return false
  }

  logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('sub')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('firstLoad')

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
    const { exp, sub } = jwt_decode(authResult.idToken)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('expires_at', exp)

    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken

    localStorage.setItem('accessToken', authResult.accessToken)
    localStorage.setItem('sub', sub)
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

  renewToken = () => {
    this.auth.checkSession({}, (err, result) => {
      if (err) {
        if (err.error === 'login_required') {
          this.login()
        } else {
          console.log(
            ` Renew Token() Could not get a new token (${err.error}: ${
              err.error_description
            }).`
          )
        }
      } else {
        this.setSession(result)
        this.tokenRenewalTimeout = setTimeout(() => {
          this.logout()
        }, (parseInt(localStorage.getItem('expires_at')) - new Date().getTime() / 1000) * 1000)
      }
    })
  }
}

export default Auth
