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
import BalanceSheet from './BalanceSheet/BalanceSheet'
import Balance from './Balance/Balance'

import { Switch, Route } from 'react-router-dom'
import Operations from './Operations/Operations'

export const ContentContainer = props => (
  <Switch>
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/overview`}
      component={Home}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/invoice`}
      component={GetInvoice}
      auth={props.auth}
    />
    <Route path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/accounts`}
      component={Account}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/addcompany`}
      component={CreateCompany}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/companies`}
      component={Company}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/daybook`}
      component={DayBook}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/bills`}
      component={Bill}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/products`}
      component={Products}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/customers`}
      component={Customers}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/vendor`}
      component={Vendor}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/expense`}
      component={Expense}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/transactions`}
      component={Transaction}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/tax`}
      component={Tax}
      auth={props.auth}
    />

    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/balancesheet`}
      component={BalanceSheet}
      auth={props.auth}
    />
    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/balance`}
      component={Balance}
      auth={props.auth}
    />

    <ProtectedRoute
      path={`${process.env.PUBLIC_URL}/operations`}
      component={Operations}
      auth={props.auth}
    />
  </Switch>
)
