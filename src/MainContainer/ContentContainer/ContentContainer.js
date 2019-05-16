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
import Transaction from './Transaction/Transaction'
import { Switch, Route } from 'react-router-dom'

export const ContentContainer = () => (
  <Switch>
    <Route path={`${process.env.PUBLIC_URL}/overview`} component={Home} />
    <Route path={`${process.env.PUBLIC_URL}/invoice`} component={GetInvoice} />
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
    <Route path={`${process.env.PUBLIC_URL}/customers`} component={Customers} />
    <Route path={`${process.env.PUBLIC_URL}/vendor`} component={Vendor} />
    <Route path={`${process.env.PUBLIC_URL}/expense`} component={Expense} />
    <Route
      path={`${process.env.PUBLIC_URL}/transactions`}
      component={Transaction}
    />
  </Switch>
)
