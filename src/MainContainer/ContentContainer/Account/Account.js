import React, { Fragment } from 'react'

import GetAccount from './getAccounts'
import CreateAccount from './createAccounts'
const Account = () => (
  <Fragment>
    <CreateAccount />
    <GetAccount />
    <selectCompany/>
  </Fragment>
)

export default Account
