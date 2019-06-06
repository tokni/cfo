import React, { useContext, useState, Fragment } from 'react'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import { useSubscription } from 'react-apollo-hooks'
import { GET_BALANCE_SHEETS } from '../../../utils/Query/BalanceSheetQuery'
import TableHelper from '../../../Helpers/TableHelper'
import { Typography, TextField  } from '@material-ui/core'
import Modal from '../../../Helpers/Modal'
import { DateRange } from '../../../Helpers/Constants'

const GetBalanceSheets = props => {
  const [state] = useContext(Context)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(null)

  const { data } = useSubscription(GET_BALANCE_SHEETS, {
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  const handleClose = props => {
    if (state.company) {
      setOpen(!open)
    }
  }

  const onSubmit = e => {
    if (date !== null) {
      setTimeout(() => {}, 1000)
    } else {
      setTimeout(() => {}, 1000)
    }

    handleClose()
  }

  const getSheetRows = () => {
    return data.Balance_sheet.map((item, index) => {
      if (item.date === date) {
        console.log('assets ', item)
        return (
          <Fragment>
            <Typography variant="h5" component="h3">
              {Language[state.locals]['assets']}
            </Typography>

            <TableHelper array={item.Balance_sheet_debit_accounts} />
            <Typography component="h5" align="center">
              Total Assets: {item.total_debit}
            </Typography>

            <Typography variant="h5" component="h3">
              {Language[state.locals]['liabilities']}
            </Typography>
            <TableHelper array={item.Balance_sheet_credit_accounts} />

            <Typography component="h5" align="center">
              Total liabilities: {item.total_credit}
            </Typography>
          </Fragment>
        )
      } else {
        return null
      }
    })
  }

  return (
    <Fragment>
        <Modal
          Icon={DateRange}
          title="showpreviousbalancesheets"
          submit={onSubmit}
          close={handleClose}
          tooltipTitle={Language[state.locals].showpreviousbalancesheets}
        >
          <TextField
            autoFocus
            margin="dense"
            id="showpreviousbalancesheets"
            value={date || ''}
            label={date}
            select
            fullWidth
            onChange={e => {
              setDate(e.target.value)
            }}
          >
            {data ? (
              data.Balance_sheet ? (
                data.Balance_sheet.map((item, index) => {
                  return (
                    <option key={index} value={item.date}>
                      {item.date}
                    </option>
                  )
                })
              ) : (
                <option value={null}>
                  {Language[state.locals].choosebalance}
                </option>
              )
            ) : (
              <option value={null}>
                {' '}
                {Language[state.locals].choosebalance}
              </option>
            )}
            <option value={null}>{Language[state.locals].clear}</option>
          </TextField>
        </Modal>

      {data
        ? data.Balance_sheet
          ? getSheetRows()
          : console.log('empty')
        : null}
    </Fragment>
  )
}

export default GetBalanceSheets
