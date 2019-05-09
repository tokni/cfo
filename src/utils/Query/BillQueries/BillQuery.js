import gql from 'graphql-tag'

const GET_BILLS_SUBSCRIPTION = gql`
subscription ($company_id: uuid!) {
    Bill(where: {company_id: {_eq: $company_id}}) {
      id
      Expense{
        name
      }
      payment
      Tax{
        tax_percentage
      }
      date_bill_received
      payment_due
      description
    }
  }
`


export {
    GET_BILLS_SUBSCRIPTION}