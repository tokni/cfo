import gql from 'graphql-tag'

const POST_CUSTOMER = gql`
  mutation postCustomer($company_id: uuid!, $name: String!) {
    insert_Customer(objects: { name: $name, company_id: $company_id }) {
      affected_rows
    }
  }
`

const GET_CUSTOMERS = gql`
  subscription($company_id: uuid!) {
    Customer(where: { company_id: { _eq: $company_id } }) {
      id
      name
      company_id
    }
  }
`

const DELETE_CUSTOMERS = gql`
  mutation deleteCustomer($id: uuid!) {
    delete_Customer(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

const PUT_CUSTOMER = gql`
  mutation putCustomer($company_id: uuid!, $id: uuid!, $name: String!) {
    update_Customer(
      where: { company_id: { _eq: $company_id }, id: { _eq: $id } }
      _set: { name: $name }
    ) {
      affected_rows
    }
  }
`

export { POST_CUSTOMER, GET_CUSTOMERS, DELETE_CUSTOMERS, PUT_CUSTOMER }
