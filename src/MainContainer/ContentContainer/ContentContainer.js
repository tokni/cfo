import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home/home'
import Callback from '../../Callback'
import Account from './Account/Account'
import CreateCompany from './Company/createCompany'
import selectCompany from './Company/selectCompany';

export const ContentContainer = () => (
  <Switch>
    <Route path={`${process.env.PUBLIC_URL}/overview`} component={Home} />
    <Route path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
    <Route path={`${process.env.PUBLIC_URL}/accounts`} component={Account} />
    <Route path={`${process.env.PUBLIC_URL}/addcompany`} component={CreateCompany} />
  </Switch>
)
