import Auth0 from 'auth0-js'

class Auth {
  auth = new Auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
    audience: `https://${process.env.REACT_APP_AUTH_DOMAIN}/userinfo`,
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid',
  })

  login = () => {
    this.auth.authorize()
    this.handleAuthentication()
  }

  isAuthenticated = () => {
    return localStorage.getItem('idToken') ? true : false
  }

  logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('sub')
    this.auth.logout()
  }

  checkSession = () => {
    this.auth.checkSession({}, this.setSession)
  }

  setSession = authResult => {
    localStorage.setItem('accessToken', authResult.accessToken)
    localStorage.setItem('sub', authResult.idTokenPayload.sub)
    localStorage.setItem('idToken', authResult.idToken)
  }

  handleAuthentication = () => {
    this.auth.parseHash((err, authResult) => {
      if (err) {
        if (err.error === 'login_required') {
          this.login()
        }
        console.log(err)
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setSession(authResult)
      }
    })
  }
}
export default Auth
