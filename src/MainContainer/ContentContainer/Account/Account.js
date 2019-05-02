import React, { Fragment } from 'react'

import GetAccount from './getAccounts'
import CreateAccount from './createAccounts'
const Account = () => (
  <Fragment>
    <CreateAccount />
    <GetAccount />
  </Fragment>
)

export default Account
