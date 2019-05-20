import gql from 'graphql-tag'

const GET_DAY_BOOK = gql`
  subscription($company_id: uuid!) {
    day_book(where: { company_id: { _eq: $company_id } }) {
      account_id
      name
      debit
      balance
    }
  }
`

export { GET_DAY_BOOK }