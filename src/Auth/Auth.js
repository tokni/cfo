import Auth0 from 'auth0-js'

export const isBrowser = typeof window !== 'undefined'
class Auth {
  auth = isBrowser
    ? new Auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH_DOMAIN,
        clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
        audience: `https://${process.env.REACT_APP_AUTH_DOMAIN}/userinfo`,
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
        responseType: 'token id_token',
        scope: 'openid',
      })
    : {}

  login = () => {
    if (!this.isAuthenticated()) {
      this.auth.authorize()
      this.handleAuthentication()
    }
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

  getUserProfile = () => {
    if (this.isAuthenticated()) {
      this.auth.client.userInfo(
        localStorage.getItem('accessToken'),
        (err, userProfile) => {
          console.log('user profile: ', JSON.stringify(userProfile, null, 2))
          console.log('user profile: ', userProfile.email)
        }
      )
    }
  }

  checkSession = () => {
    this.auth.checkSession({}, this.setSession)
  }

  setSession = authResult => {
    localStorage.setItem('accessToken', authResult.accessToken)
    localStorage.setItem('sub', authResult.idTokenPayload.sub)
    localStorage.setItem('idToken', authResult.idToken)
  }

  handleAuthentication = async () => {
    console.log('1')
    await this.auth.parseHash(async (err, authResult) => {
      if (err) {
        if (err.error === 'login_required') {
          console.log('2')
          this.login()
        }
        console.log('3')

        console.log(err)
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        console.log('4')
        await this.auth.client.userInfo(
          authResult.accessToken,
          (err, userProfile) => {
            console.log('5')

            console.log('user profile; inside handleAuth: ', userProfile)
          }
        )

        this.setSession(authResult)
         
  
      }
    })
  }
}
export default Auth
