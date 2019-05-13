import gql from 'graphql-tag'

const GET_EXPENSE = gql`
  query($company_id: uuid!) {
    Expense(where: { company_id: { _eq: $company_id } }) {
      id
      name
      company_id
    }
  }
`

const GET_EXPENSE_SUBSCRIPTION = gql`
  subscription($company_id: uuid!) {
    Expense(where: { company_id: { _eq: $company_id } }) {
      id
      name
      company_id
    }
  }
`

const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: uuid!) {
    delete_Expense(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

const PUT_EXPENSE = gql`
  mutation putExpense($company_id: uuid!, $id: uuid!, $name: String!) {
    update_Expense(
      where: { company_id: { _eq: $company_id }, id: { _eq: $id } }
      _set: { name: $name }
    ) {
      affected_rows
    }
  }
`

const POST_EXPENSE = gql`
  mutation postExpense($company_id: uuid!, $name: String!) {
    insert_Expense(objects: { name: $name, company_id: $company_id }) {
      affected_rows
    }
  }
`

export {
  GET_EXPENSE,
  GET_EXPENSE_SUBSCRIPTION,
  DELETE_EXPENSE,
  PUT_EXPENSE,
  POST_EXPENSE,
}
