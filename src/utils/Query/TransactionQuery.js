import gql from 'graphql-tag'

const GET_TRANSACTIONS_SUBSCRIPTION = gql`
  subscription($company_id: uuid!) {
    Transaction(where: { company_id: { _eq: $company_id } }) {
      id
      debit_id
      credit_id
      time_stamp
      type
      payment
      company_id
      invoice_id
      bill_id
    }
  }
`

const POST_TRANSACTION = gql`
  mutation createTransaction(
    $company_id: uuid!
    $debit_id: uuid!
    $credit_id: uuid!
    $type: String!
    $payment: numeric!
    $invoice_id: uuid
    $bill_id: uuid
  ) {
    insert_Transaction(
      objects: {
        company_id: $company_id
        debit_id: $debit_id
        credit_id: $credit_id
        type: $type
        payment: $payment
        invoice_id: $invoice_id
        bill_id: $bill_id
      }
    ) {
      affected_rows
    }
  }
`

const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: uuid!) {
    delete_Transaction(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

const PUT_TRANSACTION = gql`
  mutation putTransaction(
    $id: uuid!
    $company_id: uuid!
    $debit_id: uuid!
    $credit_id: uuid!
    $type: String!
    $payment: numeric!
    $invoice_id: uuid
    $bill_id: uuid
  ) {
    update_Transaction(
      where: { company_id: { _eq: $company_id }, id: { _eq: $id }  }
      _set: {
        debit_id: $debit_id
        credit_id: $credit_id
        type: $type
        invoice_id: $invoice_id
        bill_id: $bill_id
      }
    ) {
      affected_rows
    }
  }
`

export {
  POST_TRANSACTION,
  GET_TRANSACTIONS_SUBSCRIPTION,
  DELETE_TRANSACTION,
  PUT_TRANSACTION,
}
