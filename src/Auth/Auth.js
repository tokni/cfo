import Auth0 from "auth0-js";
import JWT from "jsonwebtoken";

class Auth {
  auth = new Auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
    audience: `https://${process.env.REACT_APP_AUTH_DOMAIN}/userinfo`,
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  login = () => {
    this.auth.authorize();
    this.handleAuthentication();
  };

  isAuthenticated = () => {
    return localStorage.getItem("idToken") ? true : false;
  };

  logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("sub");
    this.auth.logout();
  };

  checkSession = () => {
    this.auth.checkSession({}, this.setSession);
  };

  setSession = authResult => {
    // const res1 = JWT.decode(authResult.idToken);
    const res1 = JWT.decode(authResult.idToken);

    JWT.verify(authResult.idToken, "secret", (err, authdata) => {
      console.log("auth data: ", authdata);
    });
    localStorage.setItem("accessToken", authResult.accessToken);
    console.log("res is: ", JSON.stringify(res1, null, 2));

    localStorage.setItem("sub", authResult.idTokenPayload.sub);
    localStorage.setItem("idToken", authResult.idToken);
  };

  handleAuthentication = () => {
    this.auth.parseHash((err, authResult) => {
      if (err) {
        if (err.error === "login_required") {
          this.login();
        }
        console.log(err);
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        console.log(JSON.stringify(authResult, null, 2));

        this.setSession(authResult);
      }
    });
  };

  // handleAuthentication = () => {
  //   this.auth.parseHash(this.setSession);
  // };

  // setSession = (err, authResult) => {
  //   if (err) {
  //     if (err.error === "login_required") {
  //       this.login();
  //     }
  //     console.log(err);
  //   }
  //   if (authResult && authResult.accessToken && authResult.idToken) {
  //     localStorage.setItem("accessToken", authResult.accessToken);
  //     localStorage.setItem("idToken", authResult.idToken);
  //   }
  // };
}

export default Auth;
