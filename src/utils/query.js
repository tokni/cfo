import gql from 'graphql-tag'
const GET_COMPANY = gql`
  query getCompanies {
    Company {
      id
      mother_id
      name
      user_id
    }
  }
`

const GET_SUBSCRIP_COMPANY = gql`
  subscription {
    Company {
      user_id
      name
    }
  }
`

const GET_ACCOUNTS = gql`
  {
    Company {
      user_id
      name
    }
  }
`

const GET_SUBSCRIP_ACCOUNTS = gql`
  subscription {
    Account {
      id
      name
      debit
      balance
      company_id
      Company {
        user_id
        name
      }
    }
  }
`
// mutation createAccount($name: String!, $balance: numeric!, $debit: Boolean!, $company_id: uuid!) {
//   createAccount(name: $name, balance: $balance, debit: $debit, company_id: $company_id) {
//     id
//     name
//     balance
//     debit
//     account_owner
//   }
//   affected_rows
// }
// mutation insert_Account($name: String!, $balance: numeric!, $debit: Boolean!, $company_id: uuid!) {
//   insert_Account(objects: {balance:$balance, debit: $debit, name: $name, company_id: $company_id}) {
//     name
//   }
// }

const createAccount = gql`
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
const GET_DAY_BOOK = gql`
  {
    day_book {
      account_id
      name
      balance
    }
  }
`

export {
  GET_COMPANY,
  GET_DAY_BOOK,
  GET_SUBSCRIP_COMPANY,
  GET_ACCOUNTS,
  GET_SUBSCRIP_ACCOUNTS,
  createAccount,
}
