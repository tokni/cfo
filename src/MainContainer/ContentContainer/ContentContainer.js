import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home/home'
import Callback from '../../Callback'
import Account from './Account/Account'

export const ContentContainer = () => (
  <Switch>
    <Route path="/Overview" component={Home} />
    <Route path="/callback" component={Callback} />
    <Route path="/Accounts" component={Account} />
  </Switch>
)
