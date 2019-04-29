import auth0 from "auth0-js";

// let tokens = {
//   idToken: null,
//   accessToken: null,
//   all: null
// };
export default class Auth {
  constructor() {
    this.tokens = {
      idToken: null,
      accessToken: null,
      all: null
    };
  }
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  login() {
    this.auth0.authorize();
    // this.handleAuthentication();
    this.handleAuthentication();
    console.log("from login token: ", this.tokens.accessToken);
  }

  logout() {
    this.tokens.idToken = null;
    this.tokens.accessToken = null;
    this.auth0.logout();
  }

  checkSession = () => {
    this.auth0.checkSession({}, this.setSession);
  };

  getTokens() {
    console.log("get tokens ===> ", this.tokens);
    return this.tokens.accessToken;
  }

  isLoggedIn() {
    console.log("token: ", this.tokens);
    return this.tokens.accessToken ? true : false;
  }

  // setSession = authResult => {
  //   this.tokens.idToken = authResult.idToken;
  //   this.tokens.accessToken = authResult.accessToken;
  //   this.tokens.all = authResult;
  // };

  handleAuthentication = () => {
    this.auth0.parseHash(this.setSession);
  };

  setSession = (err, authResult) => {
    if (err) {
      if (err.error === "login_required") {
        this.login();
      }
      console.log(err);
    }
    console.log("auth result => ", authResult);
    if (authResult) {
      console.log("set session");
      this.tokens.idToken = authResult.idToken;
      this.tokens.accessToken = authResult.accessToken;
      this.tokens.all = authResult;
    }
    if (authResult && authResult.accessToken && authResult.idToken) {
      this.tokens.idToken = authResult.idToken;
      this.tokens.accessToken = authResult.accessToken;
      this.tokens.all = authResult;
    }
  };
}
