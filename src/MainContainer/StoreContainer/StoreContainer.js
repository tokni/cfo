import StoreCompanies from './StoreCompanies'
import StoreUser from './StoreUser'
import React, { Fragment } from 'react'


const StoreContainer = () => {
  return (
    <Fragment>
      <StoreUser />
      <StoreCompanies/>
    </Fragment>
  )
}

export default StoreContainer