import gql from 'graphql-tag'

const GET_VENDOR = gql`
  subscription($company_id: uuid!) {
    Vendor(where: { company_id: { _eq: $company_id } }) {
      id
      name
      company_id
    }
  }
`

const GET_VENDOR_SUBSCRIPTION = gql`
  subscription($company_id: uuid!) {
    Vendor(where: { company_id: { _eq: $company_id } }) {
      id
      name
      company_id
    }
  }
`

const DELETE_VENDOR = gql`
  mutation deleteVendor($id: uuid!) {
    delete_Vendor(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

const PUT_VENDOR = gql`
  mutation putVendor($company_id: uuid!, $id: uuid!, $name: String!) {
    update_Vendor(
      where: { company_id: { _eq: $company_id }, id: { _eq: $id } }
      _set: { name: $name }
    ) {
      affected_rows
    }
  }
`

const POST_VENDOR = gql`
  mutation postVendor($company_id: uuid!, $name: String!) {
    insert_Vendor(objects: { name: $name, company_id: $company_id }) {
      affected_rows
    }
  }
`

export {
  GET_VENDOR,
  GET_VENDOR_SUBSCRIPTION,
  DELETE_VENDOR,
  PUT_VENDOR,
  POST_VENDOR,
}
