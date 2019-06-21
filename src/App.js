import Auth from './Auth/Auth'
import React, { Fragment, useEffect, useCallback, useState } from 'react'
import { client } from '../src/utils/apollo'
import { ApolloProvider } from 'react-apollo-hooks'
import { MainContainer } from './MainContainer/MainContainer'
import './App.css'

const App = props => {
  const auth = new Auth()
  const [isTimedOut, setTimedOut] = useState(false)
  const tle = new Date()
  // tle.setSeconds(5000)
  // console.log("time ", new Date().getTime())
  // console.log("tle ", tle.getTime())

  const resetTimer = useCallback(() => {
    //  setTimeout(logIdleUserOut, new Date().getTime() < tle.getTime())
    console.log('clicked')    
    setTimeout(function() {
      setTimedOut(true)
      console.log('logged out')
    },900000 + new Date().getTime())
  }, [])

  useEffect(() => {
    auth.handleAuthentication()

    window.addEventListener('mousedown', resetTimer)
    // document.addEventListener('onmousedown', resetTimer)
    window.addEventListener('onclick', resetTimer)

    window.addEventListener('onkeypress', resetTimer)


    if(isTimedOut && auth.isAuthenticated()){
      auth.logout()
    }

    return () => {
      console.log('Cleaned up')
      window.removeEventListener('mousedown', resetTimer)
      window.removeEventListener('onclick', resetTimer)
      window.removeEventListener('onkeypress', resetTimer)
      // window.removeEventListener("mousedown", resetTimer);
    }
  }, [auth, resetTimer, isTimedOut])

  return (
    <Fragment>
      <ApolloProvider client={client}>
        <MainContainer auth={auth} />
      </ApolloProvider>
    </Fragment>
  )
}

export default App
