import React, { useContext, Fragment } from 'react'
import Context from '../../../Context/Context'
import Chart from '../../../utils/Chart'
import { Typography } from '@material-ui/core'
import Language from '../../../utils/language'

const Balance = () => {
  const [state] = useContext(Context)

  // const getTransactions = type => {
  //   const array = []
  //   if (state.company && state.company.Transactions) {
  //     state.company.Transactions.forEach(item => {
  //       if (type === 'bills') {
  //         if (item.bill_id !== null) {
  //           // item.payment = item.payment * -1
  //           array.push(item)
  //         }
  //       } else if (type === 'invoices') {
  //         if (item.invoice_id !== null) {
  //           console.log('bills else', item)
  //           array.push(item)
  //         }
  //       }
  //     })
  //   }
  //   array.sort((a, b) => a.time_stamp < b.time_stamp)

  //   return array
  // }

  const getUnpaidBills = () => {
    const array = []
    if (state.company && state.company.Bills) {
      state.company.Bills.forEach(element => {
        if (!element.paid) {
          // element.payment = element.payment * -1
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
      {/* <Chart
        invoices={getTransactions('invoices')}
        bills={getTransactions('bills')}
        color_income={'blue'}
        color_payment={'red'}
      /> */}

      <Typography variant="h4" component="h1" data-cy="title">
        {Language[state.locals]['unpaidbillsandinvoices']}
      </Typography>
      <div name={'canvas'}>
        <Chart
          name="bergur"
          invoices={getUnpaidInvoices()}
          bills={getUnpaidBills()}
          color_income={'blue'}
          color_payment={'red'}
        />
      </div>
    </Fragment>
  )
}

export default Balance
