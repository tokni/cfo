import React, { useContext, Fragment, useState } from 'react'
import Context from '../../../Context/Context'
import Chart from '../../../utils/Chart'
import { Typography, TextField } from '@material-ui/core'
import Language from '../../../utils/language'

const Balance = () => {
  const [state] = useContext(Context)
  const [dayOffset, setDayOffset] = useState('1m')

  const getUnpaidBills = () => {
    const array = []
    if (state.company && state.company.Bills) {
      state.company.Bills.forEach(element => {
        let date = new Date()
        switch (dayOffset) {
          case '1w':
            date.setDate(date.getDate() + 7)
            break
          case '2w':
            date.setDate(date.getDate() + 14)
            break
          case '1m':
            date.setMonth(date.getMonth() + 1)
            break
          case '2m':
            date.setMonth(date.getMonth() + 2)
            break
          case '3m':
            date.setMonth(date.getMonth() + 3)
            break
          default:
            break
        }

        if (new Date(element.payment_due) < date) {
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
          let date = new Date()
          switch (dayOffset) {
            case '1w':
              date.setDate(date.getDate() + 7)
              break
            case '2w':
              date.setDate(date.getDate() + 14)
              break
            case '1m':
              date.setMonth(date.getMonth() + 1)
              break
            case '2m':
              date.setMonth(date.getMonth() + 2)
              break
            case '3m':
              date.setMonth(date.getMonth() + 3)
              break
            default:
              break
          }

          if (new Date(element.payment_due) < date) {
            array.push(element)
          }
        }
      })
    }
    array.sort((a, b) => a.payment_due < b.payment_due)

    return array
  }

  return (
    <Fragment>
      <Typography variant="h4" component="h1" data-cy="title">
        {Language[state.locals]['unpaidbillsandinvoices']}
      </Typography>
      <TextField
        autoFocus
        select
        margin="dense"
        id="offset"
        value={dayOffset || ''}
        label={Language[state.locals].offset || 'Offset'}
        type="text"
        fullWidth
        onChange={e => {
          setDayOffset(e.target.value)
        }}
      >
        <option value={'1w'}>7 {Language[state.locals].days}</option>
        <option value={'2w'}>14 {Language[state.locals].days}</option>
        <option value={'1m'}>1 {Language[state.locals].month}</option>
        <option value={'2m'}>2 {Language[state.locals].months}</option>
        <option value={'3m'}>3 {Language[state.locals].months}</option>
      </TextField>
      <Chart
        invoices={getUnpaidInvoices()}
        bills={getUnpaidBills()}
        color_income={'blue'}
        color_payment={'red'}
      />
    </Fragment>
  )
}

export default Balance
