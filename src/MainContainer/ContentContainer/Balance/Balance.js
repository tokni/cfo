import React, { useContext, Fragment, useState } from 'react'
import Context from '../../../Context/Context'
import TableHelper from '../../../Helpers/TableHelper'
import ChartLine from '../../../utils/Chart'

const Balance = () => {
  const [open, setOpen] = useState(false)
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [state] = useContext(Context)

  const getTransactions = type => {
    const array = []
    if (state.company && state.company.Transactions) {
      state.company.Transactions.forEach(item => {
        if (type === 'bills') {
          if (item.bill_id !== null) {
            array.push(item)
          }
        } else if (type === 'invoices') {
          if (item.invoice_id !== null) {
            console.log('bills else', item)
            array.push(item)
          }
        }
      })
    }
    array.sort((a, b) => a.time_stamp < b.time_stamp)

    return array
  }

  const getUnpaidBills = () => {
    const array = []
    if (state.company && state.company.Bills) {
      state.company.Bills.forEach(element => {
        if (!element.paid) {
          array.push(element)
        }
      })
    }
    array.sort((a, b) => a.payment_due < b.payment_due)

    return array
  }

  const getUnpaidInvoices = () => {
    const array = []
    if (state.company && state.company.Invoices) {
      state.company.Invoices.forEach(element => {
        if (!element.paid) {
          array.push(element)
        }
      })
    }
    array.sort((a, b) => a.payment_due < b.payment_due)

    return array
  }

  return (
    <Fragment>
      <ChartLine
        invoices={getTransactions('invoices')}
        bills={getTransactions('bills')}
      />

      <ChartLine
        invoices={getUnpaidInvoices()}
        bills={getUnpaidBills()}
      />
    </Fragment>
  )
}

export default Balance