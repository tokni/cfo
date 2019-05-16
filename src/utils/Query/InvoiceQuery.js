import gql from 'graphql-tag'

const CREATE_INVOICE = gql`
  mutation createInvoice(
    $customer_id: uuid!
    $company_id: uuid!
    $attachment_id: uuid!
    $payment_due_date: date!
    $invoice_number: String!
    $description: String!
  ) {
    insert_Invoice(
      objects: {
        customer_id: $customer_id
        company_id: $company_id
        attachment_id: $attachment_id
        payment_due_date: $payment_due_date
        invoice_number: $invoice_number
        description: $description
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
      payment_due_date
      invoice_number
      paid
      attachment_id
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

export { CREATE_INVOICE, GET_INVOICES, DELETE_INVOICE }
