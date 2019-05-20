import gql from 'graphql-tag'


const GET_TAX = gql`
query ($company_id: uuid!) {
  Tax(where: {company_id: {_eq: $company_id}}) {
    id
    tax_percentage
    name
    company_id
  }
}

`

const GET_TAX_SUBSCRIPTION = gql`
query ($company_id: uuid!) {
  Tax(where: {company_id: {_eq: $company_id}}) {
    id
    tax_percentage
    name
    company_id
  }
}

`



export {
    GET_TAX, GET_TAX_SUBSCRIPTION
}