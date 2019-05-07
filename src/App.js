import React, { Fragment } from 'react'
import Auth from './Auth/Auth'
import './App.css'
import { MainContainer } from './MainContainer/MainContainer'
import { ApolloProvider } from 'react-apollo-hooks'
import { client } from '../src/utils/apollo'




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
    }
  }

  handleLogout = () => {
    this.auth.logout()
  }

  render() {
    return (
      <Fragment>
        <ApolloProvider client={client}>
          
          <MainContainer />
        </ApolloProvider>
      </Fragment>
    )
  }
}

export default App
