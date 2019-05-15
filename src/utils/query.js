import gql from 'graphql-tag'

const GET_COMPANY = gql`
  query getCompanies {
    Company {
      Bills {
        attachment_id
        company_id
        date_bill_received
        description
        expense_id
        id
        paid
        payment
        payment_due
        tax_id
        vendor_id
      }
      Customers {
        id
        name
      }
      Invoices {
        attachment_id
        company_id
        customer_id
        description
        id
        invoice_number
        paid
        payment_due_date
        quantity
        time_stampt
      }
      Products {
        name
        id
        company_id
      }
      id
      mother_id
      name
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

const SET_ACTIVE_COMPANY = gql`
  mutation setCompany($user_id: uuid!, $current_company: String!) {
    update_Preferences(
      where: { user_id: { _eq: $user_id } }
      _set: { current_company: $current_company }
    ) {
      affected_rows
    }
  }
`

const GET_SUBSCRIP_COMPANY = gql`
  subscription {
    Company {
      Bills {
        attachment_id
        company_id
        date_bill_received
        description
        expense_id
        id
        paid
        payment
        payment_due
        tax_id
        vendor_id
      }
      Customers {
        id
        name
      }
      Invoices {
        attachment_id
        company_id
        customer_id
        description
        id
        invoice_number
        paid
        payment_due_date
        time_stampt
      }
      Products {
        name
        id
        company_id
      }
      id
      mother_id
      name
      Accounts {
        name
        id
        debit
        company_id
        balance
      }
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
  subscription($company_id: uuid!) {
    day_book(where: { company_id: { _eq: $company_id } }) {
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
  SET_ACTIVE_COMPANY,
}
