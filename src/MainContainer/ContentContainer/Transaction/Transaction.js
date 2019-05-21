import React, { Fragment } from 'react'
import CreateTransactions from './CreateTransaction'
import GetTransactions from './GetTransactions'


const Transaction = () => {
  return (
    <Fragment>
      <CreateTransactions/>
      <GetTransactions/>
    </Fragment>
  )
}

export default Transaction