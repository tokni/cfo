import Auth from './Auth/Auth'
import React, { Fragment } from 'react'
import { client } from '../src/utils/apollo'
import { ApolloProvider } from 'react-apollo-hooks'
import { MainContainer } from './MainContainer/MainContainer'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.auth = new Auth()
  }

  render() {
    this.auth.login()
    this.auth.getUserProfile()

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
