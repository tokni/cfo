import gql from 'graphql-tag'

const GET_ACCOUNTING_YEAR = gql`
  query getAccountingYear($company_id: uuid!) {
    Accounting_year(
      where: { Company: { id: { _eq: $company_id } } }
      order_by: { from: desc }
      limit: 1
    ) {
      id
      name
      from
      to
    }
  }
`

const GET_ALL_ACCOUNTING_YEAR = gql`
  subscription getAccountingYear($company_id: uuid!) {
    Accounting_year(
      where: { Company: { id: { _eq: $company_id } } }
      order_by: { from: desc }
    ) {
      id
      name
      from
      to
    }
  }
`

const POST_ACCOUNTING_YEAR = gql`
  mutation postAccountingYear(
    $name: String!
    $from: date!
    $to: date!
    $company_id: uuid!
  ) {
    insert_Accounting_year(
      objects: { company_id: $company_id, name: $name, from: $from, to: $to }
    ) {
      affected_rows
    }
  }
`

export { GET_ACCOUNTING_YEAR, GET_ALL_ACCOUNTING_YEAR, POST_ACCOUNTING_YEAR }
