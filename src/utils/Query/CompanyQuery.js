import gql from 'graphql-tag'

const GET_COMPANIES_NAME_ID_MOTHERID = gql`
  subscription getCompanies {
    Company {
      id
      mother_id
      name
    }
  }
`
/**  subscription getCompanies {
    Company {
      Bills {
        attachment_id
        company_id
        date_bill_received
        description
        expense_id
        id
        paid
        payment
        payment_due
        tax_id
        vendor_id
      }
      Customers {
        id
        name
      }
      Invoices {
        attachment_id
        company_id
        customer_id
        description
        id
        invoice_number
        paid
        payment_due
        quantity
        time_stampt
      }
      Products {
        name
        id
        company_id
      }
      id
      mother_id
      name
    }
  }
` */

const SET_ACTIVE_COMPANY = gql`
  mutation setCompany($user_id: uuid!, $current_company: String!) {
    update_Preferences(
      where: { user_id: { _eq: $user_id } }
      _set: { current_company: $current_company }
    ) {
      affected_rows
    }
  }
`

const GET_SUBSCRIP_COMPANY = gql`
  subscription {
    Company {
      Bills {
        attachment_id
        company_id
        date_bill_received
        description
        expense_id
        id
        paid
        payment
        payment_due
        tax_id
        vendor_id
      }
      Customers {
        id
        name
      }
      Invoices {
        attachment_id
        company_id
        customer_id
        description
        id
        invoice_number
        paid
        payment_due
        time_stampt
        payment
        Orders{
          quantity
          price
        }
      }
      Products {
        name
        id
        company_id
      }
      id
      mother_id
      name
      Accounts {
        name
        id
        debit
        company_id
        balance
      }
      Transactions{
        payment
        type
        invoice_id
        bill_id
        time_stamp
      }
    }
  }
`
const POST_COMPANY = gql`
  mutation createCompany($name: String!, $mother_id: uuid, $user_id: uuid!) {
    insert_Company(
      objects: { name: $name, mother_id: $mother_id, user_id: $user_id }
    ) {
      affected_rows
    }
  }
`


export {GET_COMPANIES_NAME_ID_MOTHERID, SET_ACTIVE_COMPANY, GET_SUBSCRIP_COMPANY, POST_COMPANY}