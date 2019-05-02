import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Auth from './Auth/Auth'
import './App.css'
import Callback from './Callback'
import Db from './components/db/db'
import Home from './components/Home/home'
import { client } from '../src/utils/apollo'
import { ApolloProvider } from 'react-apollo-hooks'

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
      <div className="App">
        <ApolloProvider client={client}>
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
        </ApolloProvider>
      </div>
    )
  }
}

export default App
