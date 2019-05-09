import gql from './node_modules/graphql-tag'

const GET_BILLS_SUBSCRIPTION = gql`
  subscription($company_id: uuid!) {
    Bill(where: { company_id: { _eq: $company_id } }) {
      id
      Expense {
        name
      }
      payment
      Tax {
        tax_percentage
      }
      date_bill_received
      payment_due
      description
      Attachment {
        attachment_name
      }
    }
  }
`

const CREATE_BILL = gql`
  mutation createBill(
    $company_id: uuid!
    $vendor_id: uuid!
    $expense_id: uuid!
    $description: String!
    $payment: numeric!
    $tax_id: uuid!
    $date_bill_received: date!
    $payment_due: date!
    $attachment_id: uuid!
  ) {
    insert_Bill(
      objects: {
        company_id: $company_id
        vendor_id: $vendor_id
        expense_id: $expense_id
        description: $description
        payment: $payment
        tax_id: $tax_id
        date_bill_received: $date_bill_received
        payment_due: $payment_due
        attachment_id: $attachment_id
      }
    ) {
      affected_rows
    }
  }
`

export { GET_BILLS_SUBSCRIPTION, CREATE_BILL }
