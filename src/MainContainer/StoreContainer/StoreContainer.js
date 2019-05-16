import StoreCompanies from './StoreCompanies'
import StoreUser from './StoreUser'
import StorePreferences from './StorePreferences'
import React, { Fragment, useEffect } from 'react'
import { POST_USER } from '../../utils/Query/UserQuery'
import { useMutation } from 'react-apollo-hooks'


const StoreContainer = () => {
const data  = useMutation(POST_USER, {
  variables: {
    token: localStorage.getItem('sub'),
    first_name: 'Jørgen',
    last_name: 'Lognberg'
  },
})

useEffect(() => {
  async function fetchData() {
    await data()
  }
  fetchData()
})
  
  
  return (
    <Fragment>
      <StoreUser />
      <StoreCompanies />
      <StorePreferences />
    </Fragment>
  )
}

export default StoreContainer
