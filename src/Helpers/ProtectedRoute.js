import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../Auth/Auth'


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = new Auth()
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />
        } else {
          return <Redirect to="/callback" />
        }
      }}
    />
  )
}

export default ProtectedRoute
