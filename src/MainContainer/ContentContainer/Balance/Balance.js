import React, { useContext, Fragment } from 'react'
import Context from '../../../Context/Context'
import Chart from '../../../utils/Chart'
import { Typography } from '@material-ui/core'
import Language from '../../../utils/language'
<<<<<<< HEAD
import GetBalanceSheets from './GetBalanceSheets'
import GetAccountsType from '../Account/GetAccountsType'
import Modal from '../../../Helpers/Modal'
import { ArrowDropDown } from '../../../Helpers/Constants'
import SnackBar from '../SnackBar/SnackBar'
import CreateBalanceSheets from './CreateBalanceSheet'
=======
>>>>>>> 9b73d12e3febe4302f55496ea5203ae9b946f619

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

<<<<<<< HEAD
  const printCurrentBalanceSheet = () => {
    return (
      <Fragment>
        <Typography variant="h4" component="h1">
          {Language[state.locals]['currentbalancesheet']}
        </Typography>

        <Typography variant="h5" component="h3">
          {Language[state.locals]['assets']}
        </Typography>
        <GetAccountsType debit={true} />

        <Typography name="total" component="p" align="center">
          {Language[state.locals]['total']} : {assets}
        </Typography>

        <Typography variant="h5" component="h3">
          {Language[state.locals]['liabilities']}
        </Typography>

        <GetAccountsType debit={false} />

        <Typography name="total" component="p" align="center">
          {Language[state.locals]['total']} : {liabilities}
        </Typography>
=======
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
>>>>>>> 9b73d12e3febe4302f55496ea5203ae9b946f619

    return array
  }

  return (
    <Fragment>
<<<<<<< HEAD
      {data ? (
        data.Account ? (
          <CreateBalanceSheets
            liabilities={liabilities}
            assets={assets}
            accounts={data.Account}
          />
        ) : null
      ) : null}

      <Modal
        Icon={ArrowDropDown}
        title={Language[state.locals].showcurrentbalancesheet}
        name="currentbalance"
        submit={onSubmit}
        close={handleClose}
        tooltipTitle={Language[state.locals].showcurrentbalancesheet}
      >
        <TextField
          autoFocus
          margin="dense"
          id="showcurrentbalancesheet"
          name="dropdown"
          value={showCurrent}
          label={' '}
          select
          fullWidth
          onChange={e => {
            setShowCurrent(e.target.value)
          }}
        >
          <option name="show" value={true}>
            {Language[state.locals].show}
          </option>
          <option name="dontshow" value={false}>
            {Language[state.locals].dontshow}
          </option>
        </TextField>
      </Modal>

      {showCurrent ? printCurrentBalanceSheet() : null}

      <GetBalanceSheets />
=======
      {/* <Chart
        invoices={getTransactions('invoices')}
        bills={getTransactions('bills')}
        color_income={'blue'}
        color_payment={'red'}
      /> */}

      <Typography variant="h4" component="h1">
        {Language[state.locals]['unpaidbillsandinvoices']}
      </Typography>
      <Chart
        invoices={getUnpaidInvoices()}
        bills={getUnpaidBills()}
        color_income={'blue'}
        color_payment={'red'}
      />
>>>>>>> 9b73d12e3febe4302f55496ea5203ae9b946f619
    </Fragment>
  )
}

export default Balance
