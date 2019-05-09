import Account from './Account/Account'
import Callback from '../../Callback'
import Company from './Company/Company'
import CreateCompany from './Company/CreateCompany'
import DayBook from './DayBook/DayBook'
import Home from './Home/Home'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Bill from './Bill/Bill';
import Products from './Product/Products'

export const ContentContainer = () => (
  <Switch>
    <Route path={`${process.env.PUBLIC_URL}/overview`} component={Home} />
    <Route path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
    <Route path={`${process.env.PUBLIC_URL}/accounts`} component={Account} />
    <Route
      path={`${process.env.PUBLIC_URL}/addcompany`}
      component={CreateCompany}
    />
    <Route path={`${process.env.PUBLIC_URL}/companies`} component={Company} />
    <Route path={`${process.env.PUBLIC_URL}/daybook`} component={DayBook} />
    <Route path={`${process.env.PUBLIC_URL}/bills`} component={Bill} />
    <Route path={`${process.env.PUBLIC_URL}/products`} component={Products} />
  </Switch>
)
