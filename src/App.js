import React, { Fragment, useState } from 'react'
import './App.css'
import { MainContainer } from './MainContainer/MainContainer'
import { ApolloProvider } from 'react-apollo-hooks'
import { client } from '../src/utils/apollo'
import Auth from './Auth/Auth'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.auth = new Auth()
  }

  render() {
    this.auth.login()

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
