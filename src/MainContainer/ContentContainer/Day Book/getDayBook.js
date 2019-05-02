import { useQuery } from 'react-apollo-hooks'
import { GET_DAY_BOOK } from '../../../utils/query'
import React from 'react'

const DayBook = () => {
  const { data, error, loading } = useQuery(GET_DAY_BOOK, {
    suspend: false,
  })

  if (loading) {
    console.log('Loading...')
    return (
      <tr>
        <td />
      </tr>
    )
  }
  if (error) {
    console.log('Error Daybook: ', error.message)
    return (
      <tr>
        <td>-</td>
      </tr>
    )
  }
  console.log('DayBook er : ', data.day_book)
  return data.day_book.map((item, key) => {
    return (
      <tr key={key}>
        <th>{item.account_id}</th>

        <td>{item.name}</td>
        <td>{item.balance}</td>
        <td>{item.debit}</td>
      </tr>
    )
  })
}

export default DayBook
