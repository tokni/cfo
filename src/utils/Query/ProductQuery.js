import gql from 'graphql-tag'

const POST_PRODUCT = gql`
  mutation postProduct($company_id: uuid!, $name: String!) {
    insert_Product(objects: { name: $name, company_id: $company_id }) {
      affected_rows
    }
  }
`

const DELETE_PRODUCT = gql`
  mutation postProduct($id: uuid!) {
    delete_Product(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

const GET_PRODUCTS = gql`
  subscription($company_id: uuid!) {
    Product(where: { company_id: { _eq: $company_id } }) {
      id
      name
      company_id
    }
  }
`

const PUT_PRODUCT = gql`
  mutation putProduct($company_id: uuid!, $id: uuid!, $name: String!) {
    update_Product(
      where: { company_id: { _eq: $company_id }, id: { _eq: $id } }
      _set: { name: $name }
    ) {
      affected_rows
    }
  }
`

export { POST_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT, PUT_PRODUCT }
