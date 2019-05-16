import gql from 'graphql-tag'

const GET_BILLS_SUBSCRIPTION = gql`
  subscription($company_id: uuid!) {
    Bill(where: { company_id: { _eq: $company_id } }) {
      id
      Expense {
        name
        id
      }
      Vendor{
        name
        id
      }
      payment
      Tax {
        tax_percentage
        id
      }
      date_bill_received
      payment_due
      description
      paid
      Attachment {
        attachment_name
        id
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

const PUT_BILL = gql`
  mutation putBill(
    $id: uuid!
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
    update_Bill(
      where: { company_id: { _eq: $company_id }, id: { _eq: $id } }
      _set: {
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
const PUT_BILL_PAY = gql`
mutation putBill(
  $id: uuid!
  $company_id: uuid!
  $paid: Boolean!
) {
  update_Bill(
    where: { company_id: { _eq: $company_id }, id: { _eq: $id } }
    _set: {
      paid: $paid
    }
  ) {
    affected_rows
  }
}
`


const DELETE_BILL = gql`
mutation deleteBill($id: uuid!) {
  delete_Bill(where: { id: { _eq: $id } }) {
    affected_rows
  }
}
`

export { GET_BILLS_SUBSCRIPTION, CREATE_BILL, PUT_BILL, DELETE_BILL, PUT_BILL_PAY }
