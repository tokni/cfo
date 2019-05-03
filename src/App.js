import React, { useContext, Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Auth from './Auth/Auth'
import './App.css'
import { MainContainer } from './MainContainer/MainContainer'
import { ApolloProvider, useQuery } from 'react-apollo-hooks'
import { client } from '../src/utils/apollo'
import Context from '../src/Context/Context'
import { GET_USER } from '../src/utils/query'

const StoreUser = () => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      token: localStorage.getItem('sub'),
    },
  })

  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    dispatch({
      type: 'load_user',
      user: data.User,
    })
  })
  return (null)
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.auth = new Auth()
  }

  handleAuth = () => {
    if (this.auth.isAuthenticated() === false) {
      this.auth.login()
    } else {
      console.log('try again')
      //  this.auth.handleAuthentication();
    }
  }

  handleLogout = () => {
    this.auth.logout()
  }

  render() {
    return (
      <Fragment>
        <ApolloProvider client={client}>
          <StoreUser />
          <MainContainer />
        </ApolloProvider>
      </Fragment>
    )
  }
}

export default App

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
