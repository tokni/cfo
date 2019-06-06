import gql from 'graphql-tag'

const GET_BALANCE_SHEETS = gql`
subscription getBalanceSheet($company_id: uuid!) {
  Balance_sheet(where: {company_id: {_eq: $company_id}}) {
    date
    total_debit
    total_credit
    Balance_sheet_credit_accounts {
      name
      amount
    }
    Balance_sheet_debit_accounts{
      name
      amount
    }
  }
}
  `

  export {GET_BALANCE_SHEETS}