import Account from './Account/Account'
import Callback from '../../Callback'
import Company from './Company/Company'
import CreateCompany from './Company/CreateCompany'
import Customers from './Customer/Customer'
import DayBook from './DayBook/DayBook'
import Home from './Home/Home'
import Products from './Product/Products'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

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
    <Route path={`${process.env.PUBLIC_URL}/products`} component={Products} />
    <Route path={`${process.env.PUBLIC_URL}/customers`} component={Customers} />
  </Switch>
)
