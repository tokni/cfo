import Auth from './Auth/Auth'
import React, { Fragment, useEffect, useCallback } from 'react'
import { client } from '../src/utils/apollo'
import { ApolloProvider } from 'react-apollo-hooks'
import { MainContainer } from './MainContainer/MainContainer'
import './App.css'

const App = props => {
  const auth = new Auth()
  
  const shouldAuthenticate = useCallback(() => {
    if (auth.isAuthenticated()) {
      auth.renewToken()
    } else if (!auth.isAuthenticated() && localStorage.getItem('sub')) {
      auth.logout()
    } else {
      auth.handleAuthentication()
    }
  }, [auth])

  useEffect(() => {
    window.addEventListener('mousedown', shouldAuthenticate)
    window.addEventListener('keydown', shouldAuthenticate)
    window.addEventListener('click', shouldAuthenticate)

    return () => {
      window.removeEventListener('keydown', shouldAuthenticate)
      window.removeEventListener('click', shouldAuthenticate)
      window.removeEventListener('mousedown', shouldAuthenticate)
    }
  }, [shouldAuthenticate])

  return (
    <Fragment>
      <ApolloProvider client={client}>
        <MainContainer auth={auth} />
      </ApolloProvider>
    </Fragment>
  )
}

export default App
