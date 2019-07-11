// import StoreAccountingYear from './StoreAccountingYear'
import StoreCompanies from './StoreCompanies'
import StoreUser from './StoreUser'
import StorePreferences from './StorePreferences'
import PostUser from '../ContentContainer/User/PostUser'
import React, { Fragment } from 'react'

const StoreContainer = props => {
  return (
    <Fragment>
      <PostUser
        first_name={props.auth.GetUserProfile().given_name}
        last_name={props.auth.GetUserProfile().family_name}
      />
      <StoreUser />
      <StoreCompanies />
      <StorePreferences />
      {/* <StoreAccountingYear /> */}
    </Fragment>
  )
}

export default StoreContainer
