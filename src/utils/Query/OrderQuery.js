import gql from 'graphql-tag'

const CREATE_ORDER = gql`
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

export { CREATE_ORDER }
