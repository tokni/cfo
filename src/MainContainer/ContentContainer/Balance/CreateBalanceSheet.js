import React, { useContext, useState, Fragment } from 'react'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import { useMutation } from 'react-apollo-hooks'
import {
  POST_BALANCE_SHEET,
  POST_BALANCE_SHEET_DEBIT_ACCOUNT,
  POST_BALANCE_SHEET_CREDIT_ACCOUNT,
} from '../../../utils/Query/BalanceSheetQuery'
import { TextField } from '@material-ui/core'
import Modal from '../../../Helpers/Modal'
import { Add } from '../../../Helpers/Constants'

const CreateBalanceSheets = props => {
  const [state] = useContext(Context)
  const [open, setOpen] = useState(false)

  const [date, setDate] = useState(null)
  const postBalanceSheetDebitMutation = useMutation(POST_BALANCE_SHEET)
  const postBalanceDebitAccountMutation = useMutation(
    POST_BALANCE_SHEET_DEBIT_ACCOUNT
  )
  const postBalanceCreditAccountMutation = useMutation(
    POST_BALANCE_SHEET_CREDIT_ACCOUNT
  )

  const handleClose = props => {
    if (date !== null) {
     
      setOpen(!open)
    }
  }

  const formatAccountIntoSheetRows = debit => {
    const container = []

    props.accounts.forEach(element => {
      let object = {}
      if (debit) {
        if (element.debit) {
          object.name = element.name
          object.balance = element.balance
          object.balance_sheet_id = '44504370-1579-4065-9a48-f049fd5b7e45'

          container.push(object)
        }
      } else {
        if (!element.debit) {
          object.name = element.name
          object.balance = element.balance
          object.balance_sheet_id = '44504370-1579-4065-9a48-f049fd5b7e45'

          container.push(object)
        }
      }
    })
    return container
  }
  const onSubmit = e => {
    if (date !== null) {
      setTimeout(() => {}, 1000)
      // console.log('data ', props.accounts)
      postBalanceSheetDebitMutation({
        variables: {
          company_id: state.company ? state.company.id : null,
          total_debit: props.assets,
          total_credit: props.liabilities,
          date,
        },
      })

      postBalanceDebitAccountMutation({
        variables: {
          objects: formatAccountIntoSheetRows(true),
        },
      })

      postBalanceCreditAccountMutation({
        variables: {
          objects: formatAccountIntoSheetRows(false),
        },
      })
    } else {
      setTimeout(() => {}, 1000)
    }
    handleClose()
  }

  return (
    <Fragment>
      <Modal
        Icon={Add}
        title="date"
        submit={onSubmit}
        close={handleClose}
        tooltipTitle={Language[state.locals].createbalancesheets}
      >
        {/* add date */}
        <TextField
          autoFocus
          margin="dense"
          id="balancedate"
          value={date || ''}
          label={'date' || ''}
          type="date"
          fullWidth
          onChange={e => {
            setDate(e.target.value)
          }}
        />
      </Modal>
    </Fragment>
  )
}

export default CreateBalanceSheets
