import Account from './Account/Account'
import Callback from '../../Callback'
import Company from './Company/Company'
import CreateCompany from './Company/CreateCompany'
import Customers from './Customer/Customer'
import DayBook from './DayBook/DayBook'
import Home from './Home/Home'
import Products from './Product/Products'
import React from 'react'
import Bill from './Bill/Bill'
import Vendor from './Vendor/Vendor'
import Expense from './Expense/Expense'
import GetInvoice from './Invoice/GetInvoice'
import ProtectedRoute from '../../Helpers/ProtectedRoute'
import Transaction from './Transaction/Transaction'
import Tax from './Tax/Tax'
import Balance from './Balance/Balance'


import { Switch, Route } from 'react-router-dom'

export const ContentContainer = () => (
  <Switch>
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/overview`}
      component={Home}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/invoice`}
      component={GetInvoice}
    />
    <Route path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/accounts`}
      component={Account}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/addcompany`}
      component={CreateCompany}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/companies`}
      component={Company}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/daybook`}
      component={DayBook}
    />
    <ProtectedRoute path={`${process.env.PUBLIC_URL}/bills`} component={Bill} />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/products`}
      component={Products}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/customers`}
      component={Customers}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/vendor`}
      component={Vendor}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/expense`}
      component={Expense}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/transactions`}
      component={Transaction}
    />
    <ProtectedRoute path={`${process.env.PUBLIC_URL}/tax`} component={Tax} />

    <ProtectedRoute path={`${process.env.PUBLIC_URL}/balancesheet`} component={Balance} />
  </Switch>
)
