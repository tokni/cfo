import gql from 'graphql-tag'

const POST_MVG = gql`
  mutation createMVG(
    $outgoing: Boolean!
    $rate: numeric!
    $amount: numeric!
    $fk_id: uuid!
    $accounting_year_id: uuid!
  ) {
    insert_MVG(
      objects: {
        outgoing: $outgoing
        rate: $rate
        amount: $amount
        fk_id: $fk_id
        accounting_year_id: $accounting_year_id
      }
    ) {
      affected_rows
    }
  }
`

export { POST_MVG }
