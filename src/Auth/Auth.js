import Auth0 from 'auth0-js'
import jwt_decode from 'jwt-decode'
export const isBrowser = typeof window !== 'undefined'
class Auth {
  auth = isBrowser
    ? new Auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH_DOMAIN,
        clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
        audience: `https://${process.env.REACT_APP_AUTH_DOMAIN}/userinfo`,
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
        responseType: 'token id_token',
        scope: 'openid profile',
      })
    : {}


  login = () => {
    if (!this.isAuthenticated()) {
      this.auth.authorize()
      this.handleAuthentication()
      this.GetUserProfile()
      console.log('login')
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

  GetUserProfile = () => {
    if (localStorage.getItem('idToken')) {

      return jwt_decode(localStorage.getItem('idToken'))
    }else{
      return 'John Doe'
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
            console.log('user profile: ', JSON.stringify(userProfile))

            console.log('user profile; inside handleAuth: ', userProfile)
            this.first_name = userProfile.given_name
            this.last_name = userProfile.family_name
          }
        )

        this.setSession(authResult)
      }
    })
  }
}
export default Auth
