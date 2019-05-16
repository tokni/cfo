import StoreCompanies from './StoreCompanies'
import StoreUser from './StoreUser'
import StorePreferences from './StorePreferences'
import React, { Fragment} from 'react'


const StoreContainer = props => {

  return (
    <Fragment>
      <StoreUser />
      <StoreCompanies />
      <StorePreferences />
    </Fragment>
  )
}

export default StoreContainer
