import gql from 'graphql-tag'


const GET_VENDOR = gql`
query ($company_id: uuid!) {
  Vendor(where: {company_id: {_eq: $company_id}}) {
    id
    name
    company_id
  }
}

`

export {
    GET_VENDOR
}