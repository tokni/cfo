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

export { GET_ACCOUNTING_YEAR }
