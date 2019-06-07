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


  const POST_BALANCE_SHEET = gql`
  mutation postBalanceSheet($company_id: uuid!, $date: date!, $total_credit: numeric!, $total_debit: numeric!) {
    insert_Balance_sheet(objects: {company_id: $company_id, date: $date, total_credit: $total_credit, total_debit: $total_debit}) {
      affected_rows
      returning {
        id
      }
    }
  }  
  `

const POST_BALANCE_SHEET_DEBIT_ACCOUNT = gql`
mutation postBalanceSheetDebit($objects: [Balance_sheet_debit_accounts_insert_input!]!) {
  insert_Balance_sheet_debit_accounts(objects: $objects) {
    affected_rows
  }
}
`

const POST_BALANCE_SHEET_CREDIT_ACCOUNT = gql`
mutation postBalanceSheetCredit($objects: [Balance_sheet_credit_accounts_insert_input!]!) {
  insert_Balance_sheet_credit_accounts(objects: $objects) {
    affected_rows
  }
}`


  export {GET_BALANCE_SHEETS, POST_BALANCE_SHEET, POST_BALANCE_SHEET_DEBIT_ACCOUNT, POST_BALANCE_SHEET_CREDIT_ACCOUNT}