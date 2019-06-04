import React, { useContext, useState, Fragment } from 'react'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import { useSubscription } from 'react-apollo-hooks'
import { GET_BALANCE_SHEETS } from '../../../utils/Query/BalanceSheetQuery'
import TableHelper from '../../../Helpers/TableHelper'
import { Typography, TextField } from '@material-ui/core'
import Modal from '../../../Helpers/Modal'
import { DateRange } from '../../../Helpers/Constants'

const GetBalanceSheets = props => {
  const [state] = useContext(Context)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(null)

  const { data} = useSubscription(GET_BALANCE_SHEETS, {
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
    return data.Balance_sheet.map((row, rowIndex) => {
      
      if (row.date === date) {
        console.log("id ", row.id)
        return (
          <Fragment>
            <Typography component="h5" align="left">
              {row.date}
            </Typography>
            <TableHelper key={rowIndex} array={row.Balance_sheet_rows} />
          </Fragment>
        )
      }else{
        return null
      }
    })
  }
  return (
    <Fragment>
      <Modal
        Icon={DateRange}
        title="showcurrentbalancesheet"
        submit={onSubmit}
        close={handleClose}
      >
        <TextField
          autoFocus
          margin="dense"
          id="showcurrentbalancesheet"
          value={date}
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
              <option value={null}>{Language[state.locals].choosebalance}</option>
            )
          ) : (
            <option value={null}> {Language[state.locals].choosebalance}</option>
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
