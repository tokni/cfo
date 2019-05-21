import Auth from './Auth/Auth'
import React, { Fragment, useEffect } from 'react'
import { client } from '../src/utils/apollo'
import { ApolloProvider } from 'react-apollo-hooks'
import { MainContainer } from './MainContainer/MainContainer'
import './App.css'

const App = props => {

  const auth = new Auth()

  useEffect(() => {
    auth.handleAuthentication()
  })

  return (
    <Fragment>
      <ApolloProvider client={client}>
        <MainContainer auth={auth} />
      </ApolloProvider>
    </Fragment>
  )
}

export default App
