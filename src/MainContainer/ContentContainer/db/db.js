import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { client } from '../../../utils/apollo'
import Company from '../company/getCompany'
import DayBook from '../Day Book/getDayBook'
import Accounts from '../Account/getAccounts'
import CreateAccounts from '../Account/createAccounts'
class Db extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        {/* <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">user id</th>
              <th scope="col">company name</th>
            </tr>
          </thead>
          <tbody>
            <Company />
          </tbody>
        </table>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">balance</th>
            </tr>
          </thead>
          <tbody>
            <DayBook />
          </tbody>
        </table> */}
        <Accounts />
        <CreateAccounts />
      </ApolloProvider>
    )
  }
}

export default Db
