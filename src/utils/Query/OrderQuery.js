import gql from 'graphql-tag'

const POST_ORDER = gql`
  mutation createOrder(
    $invoice_id: uuid!
    $product_id: uuid!
    $quantity: Int!
    $price: Int!
  ) {
    insert_Order(
      objects: {
        invoice_id: $invoice_id
        product_id: $product_id
        quantity: $quantity
        price: $price
      }
    ) {
      affected_rows
    }
  }
`

const DELETE_ORDER = gql`
  mutation deleteOrder($id: uuid!) {
    delete_Order(where: { invoice_id: { _eq: $id } }) {
      affected_rows
    }
  }
`

export { POST_ORDER, DELETE_ORDER }
