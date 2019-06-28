import React, { useContext, Fragment, useState, useEffect } from 'react'
import Context from '../../../Context/Context'
import TableHelper from '../../../Helpers/TableHelper'
import { Typography, TextField } from '@material-ui/core'

const Operations = () => {
  const [state] = useContext(Context)
  const [sale, setSale] = useState(0)

  // const [bills, setBills] = useState([])

  const getBills = () => {
    let bills = []
    try {
      state.company.Bills.forEach(element => {
        if (element.paid === true) {
          bills.push(element)
        }
      })
    } catch (e) {
      console.log('error ', e)
    }
    console.log('bills ', bills)
    return bills
  }

  const calculateSale = () => {
    let salesAmount = 0
    try {
      state.company.Accounts.forEach(element => {
        if (element.type !== null && (element.type > 999 || element.type <= 1999)) {
          console.log("balance ",element.balance)
            salesAmount += element.balance
        }
      })
    } catch (e) {
      console.log('error ', e)
    }
    setSale(salesAmount)
    return sale
  }

  useEffect(() => {
    calculateSale()
  })

  return (
    <Fragment>
      <Typography variant="h4" component="h1" data-cy="title">
        Søla: {sale}
      </Typography>

      {/* {state.company ? state.company.Bills? <TableHelper array={getBills()} /> : null : null} */}
    </Fragment>
  )
}

export default Operations
