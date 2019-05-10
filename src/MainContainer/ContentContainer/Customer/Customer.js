import React, { Fragment } from 'react'
import CreateCustomer from './CreateCustomer'
import GetCustomer from './GetCustomer'

const Customer = () => {
  return (
    <Fragment>
      <CreateCustomer />
      <GetCustomer />
    </Fragment>
  )
}

export default Customer
