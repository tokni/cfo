import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home/Home'
import Callback from '../../Callback'
import Account from './Account/Account'
import Company from './Company/Company'
import CreateCompany from './Company/teCompany'

export const ContentContainer = () => (
  <Switch>
    <Route path={`${process.env.PUBLIC_URL}/overview`} component={Home} />
    <Route path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
    <Route path={`${process.env.PUBLIC_URL}/accounts`} component={Account} />
    <Route path={`${process.env.PUBLIC_URL}/addcompany`} component={CreateCompany} />
    <Route path={`${process.env.PUBLIC_URL}/companies`} component={Company} />
  </Switch>
)
