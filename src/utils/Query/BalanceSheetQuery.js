import gql from 'graphql-tag'

const GET_BALANCE_SHEETS = gql`
subscription getBalanceSheet($company_id: uuid!, $date: date!) {
    Balance_sheet(where: {company_id: {_eq: $company_id}, date: {_eq: $date}}) {
      date
      Balance_sheet_rows {
        name
        amount
      }
    }
  }
  `

  export {GET_BALANCE_SHEETS}