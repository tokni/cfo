import gql from 'graphql-tag'



const GET_SUBSCRIP_ACCOUNTS = gql`
subscription($company_id: uuid!) {
  Account(where: { company_id: { _eq: $company_id } }) {
    id
    name
    debit
    balance
    company_id
    account_numbers
    Company {
      user_id
      name
    }
  }
}
`




const POST_ACCOUNT = gql`
mutation createAccount(
  $name: String!
  $balance: numeric!
  $debit: Boolean!
  $company_id: uuid!
) {
  insert_Account(
    objects: {
      name: $name
      balance: $balance
      debit: $debit
      company_id: $company_id
    }
  ) {
    affected_rows
  }
}
`
export { GET_SUBSCRIP_ACCOUNTS, POST_ACCOUNT}