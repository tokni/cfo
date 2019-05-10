import gql from 'graphql-tag'


const GET_EXPENSE_SUBSCRIPTION = gql`
query ($company_id: uuid!) {
  Expense(where: {company_id: {_eq: $company_id}}) {
    id
    name
    company_id
  }
}

`

export {
    GET_EXPENSE_SUBSCRIPTION
}