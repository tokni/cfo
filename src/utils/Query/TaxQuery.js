import gql from 'graphql-tag'

const GET_TAX = gql`
  query($company_id: uuid!) {
    Tax(where: { company_id: { _eq: $company_id } }) {
      id
      tax_percentage
      name
      company_id
    }
  }
`

const GET_TAX_SUBSCRIPTION = gql`
  subscription($company_id: uuid!) {
    Tax(where: { company_id: { _eq: $company_id } }) {
      id
      tax_percentage
      name
      company_id
    }
  }
`
const POST_TAX = gql`
  mutation postTax(
    $company_id: uuid!
    $name: String!
    $tax_percentage: numeric!
  ) {
    insert_Tax(
      objects: {
        name: $name
        company_id: $company_id
        tax_percentage: $tax_percentage
      }
    ) {
      affected_rows
    }
  }
`

const DELETE_TAX = gql`
  mutation deleteTax($id: uuid!) {
    delete_Tax(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

const PUT_TAX = gql`
  mutation putTax(
    $company_id: uuid!
    $id: uuid!
    $name: String!
    $tax_percentage: numeric!
  ) {
    update_Tax(
      where: { company_id: { _eq: $company_id }, id: { _eq: $id } }
      _set: { name: $name, tax_percentage: $tax_percentage }
    ) {
      affected_rows
    }
  }
`

export { GET_TAX, GET_TAX_SUBSCRIPTION, POST_TAX, DELETE_TAX, PUT_TAX }
