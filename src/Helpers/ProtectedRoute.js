import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props, { component: Component, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={props => {
        if (props.auth.isAuthenticated()) {
          return <Component {...props} />
        } else {
          return <Redirect to="/callback" />
        }
      }}
    />
  )
}

export default ProtectedRoute
