import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { ApolloProvider } from "react-apollo-hooks";
// import { client } from "./utils/apollo";
// import Company from "./components/company/getCompany";
// import DayBook from "./components/Day Book/getDayBook";
import Auth from "./Auth/Auth";
import "./App.css";
import Callback from "./Callback";
import Db from "./components/db/db";
import Home from "./components/Home/home";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      token: {}
    };
    this.auth = new Auth();
  }

  handleAuth = () => {
    if (this.auth.isLoggedIn() === false) {
      console.log("inni í login");
      this.auth.login();

      this.setState({
        token: { name: "james" }
      });
      console.log("inni í login:: ", this.auth.getTokens());
    } else {
      //  this.auth.handleAuthentication();
      console.log("inni i else:: ", this.auth.getTokens());
      this.setState({
        token: { name: "james" }
      });
      console.log("inni í lsdfdsfsfsd:: ", this.auth.getTokens());
    }
  };

  handleLogout = () => {
    console.log("inni í logout");
    this.auth.logout();
    this.setState({
      token: {}
    });
  };

  render() {
    console.log("state: ", this.state.token);
    return (
      <div className="App">
        <nav>
          <Router>
            <ul>
              <li>
                <Link className="btn btn-primary" to="/home">
                  Home
                </Link>
              </li>
              <li>
                <Link className="btn btn-primary" to="/callback">
                  Add User
                </Link>
              </li>
              <li>
                <Link className="btn btn-primary" to="/db">
                  Database
                </Link>
              </li>
            </ul>
            <Route path="/home" component={Home} />
            <Route path="/callback" component={Callback} />
            <Route path="/db" component={Db} />
          </Router>
        </nav>
        <button onClick={this.handleAuth.bind(this)}>Log in</button>
        <button onClick={this.handleLogout.bind(this)}>Log out</button>
      </div>
    );
  }
}

export default App;

// import React from "react";
// import { ApolloProvider } from "react-apollo-hooks";
// import { client } from "./utils/apollo";
// import Company from "./components/company/getCompany";
// import DayBook from "./components/Day Book/getDayBook";
// import Auth from "./Auth/Auth";
// import "./App.css";

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <div className="App">
//         <header className="App-header">
//           <h1>C.FO</h1>
//         </header>
//       </div>
//       <table className="table table-dark">
//         <thead>
//           <tr>
//             <th scope="col">user id</th>
//             <th scope="col">company name</th>
//           </tr>
//         </thead>
//         <tbody>
//           <Company />
//         </tbody>
//       </table>
//       <table className="table table-dark">
//         <thead>
//           <tr>
//             <th scope="col">id</th>
//             <th scope="col">name</th>
//             <th scope="col">balance</th>
//           </tr>
//         </thead>
//         <tbody>
//           <DayBook />
//         </tbody>
//       </table>
//     </ApolloProvider>
//   );
// }

// export default App;
