import auth0 from "auth0-js";

let tokens = {
  idToken: null,
  accessToken: null,
  all: null
};
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  login() {
    this.auth0.authorize();
    this.handleAuthentication();
    console.log("from login token: ", tokens.accessToken);
  }

  logout() {
    tokens.idToken = null;
    tokens.accessToken = null;
    this.auth0.logout();
  }

  getTokens() {
    return tokens.all;
  }

  isLoggedIn() {
    console.log("token: ", tokens);
    return tokens.accessToken ? true : false;
  }

  setSession = authResult => {
    tokens.idToken = authResult.idToken;
    tokens.accessToken = authResult.accessToken;
    tokens.all = authResult;
  };

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        console.log(err);
      }
      console.log("auth res: ", authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      }

      console.log("tokens fdsfdsffsdaafs: ", tokens);
      console.log("tokens fdsfdsffsdaafs: ", tokens);
      console.log("tokens fdsfdsffsdaafs: ", tokens);
      return authResult;
    });
  }
}
