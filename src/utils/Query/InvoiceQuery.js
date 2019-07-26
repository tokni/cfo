import gql from 'graphql-tag'

const POST_INVOICE = gql`
  mutation createInvoice(
    $customer_id: uuid!
    $company_id: uuid!
    $attachment_id: uuid!
    $payment_due: date!
    $invoice_number: String!
    $description: String!
    $payment: numeric!
  ) {
    insert_Invoice(
      objects: {
        customer_id: $customer_id
        company_id: $company_id
        attachment_id: $attachment_id
        payment_due: $payment_due
        invoice_number: $invoice_number
        description: $description
        payment: $payment
      }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`

const GET_INVOICES = gql`
  subscription($company_id: uuid!) {
    Invoice(where: { company_id: { _eq: $company_id } }) {
      id
      description
      company_id
      customer_id
      time_stampt
      payment_due
      invoice_number
      paid
      attachment_id
      Attachment{
        name
      }
      payment
    }
  }
`

const DELETE_INVOICE = gql`
  mutation deleteInvoice($id: uuid!) {
    delete_Invoice(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

const PUT_INVOICE_PAY = gql`
mutation putInvoice(
  $id: uuid!
  $company_id: uuid!
  $paid: Boolean!
) {
  update_Invoice(
    where: { company_id: { _eq: $company_id }, id: { _eq: $id } }
    _set: {
      paid: $paid
    }
  ) {
    affected_rows
  }
}
`

export { POST_INVOICE, GET_INVOICES, DELETE_INVOICE,PUT_INVOICE_PAY }
