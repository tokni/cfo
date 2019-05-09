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

const GET_USER_PREF = gql`
  query getPref($user_id: uuid!) {
    Preferences(where: { user_id: { _eq: $user_id } }) {
      locals
      current_company
    }
  }
`

const SET_LOCALS = gql`
  mutation setLocals($user_id: uuid!, $locals: String!) {
    update_Preferences(
      where: { user_id: { _eq: $user_id } }
      _set: { locals: $locals }
    ) {
      affected_rows
    }
  }
`

const GET_SUBSCRIP_COMPANY = gql`
  subscription {
    Company {
      id
      mother_id
      name
      user_id
    }
  }
`

const GET_SUBSCRIP_ACCOUNTS = gql`
  subscription($company_id: uuid!) {
    Account(where: { company_id: { _eq: $company_id } }) {
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

const GET_USER = gql`
  query($token: String!) {
    User(where: { token: { _like: $token } }) {
      first_name
      last_name
      id
    }
  }
`

const CREATE_COMPANY = gql`
  mutation createCompany($name: String!, $mother_id: uuid, $user_id: uuid!) {
    insert_Company(
      objects: { name: $name, mother_id: $mother_id, user_id: $user_id }
    ) {
      affected_rows
    }
  }
`

const CREATE_ACCOUNT = gql`
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
subscription ($company_id: uuid!) {
  day_book(where: {company_id: {_eq: $company_id}}) {
    account_id
    name
    debit
    balance
  }
}
`

export {
  GET_COMPANY,
  GET_DAY_BOOK,
  GET_SUBSCRIP_COMPANY,
  GET_SUBSCRIP_ACCOUNTS,
  CREATE_ACCOUNT,
  CREATE_COMPANY,
  GET_USER,
  GET_USER_PREF,
  SET_LOCALS,
}
