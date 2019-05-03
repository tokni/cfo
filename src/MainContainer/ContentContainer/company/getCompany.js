import { useSubscription } from 'react-apollo-hooks'
import { GET_SUBSCRIP_COMPANY } from '../../../utils/query'
import React from 'react'

const Company = () => {
  const { data, error, loading } = useSubscription(GET_SUBSCRIP_COMPANY, {
    suspend: false,
  })

  if (loading) {
    console.log('Loading...')
    return (
      <tr>
        <td>-</td>
      </tr>
    )
  }
  if (error) {
    console.log('Error: ', error.message)
    return (
      <tr>
        <td>-</td>
      </tr>
    )
  }
  return data.Company.map((item, key) => {
    return (
      <tr key={key}>
        <th>{item.user_id}</th>

        <td>{item.name}</td>
      </tr>
    )
  })
}

export default Company
