import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { Add } from '../../../Helpers/Constants'
import { POST_ACCOUNTING_YEAR } from '../../../utils/Query/AccountingYear'
import { setTimeout } from 'timers'
import DateFnsUtils from '@date-io/date-fns'
import { useMutation } from 'react-apollo-hooks'
import { withStyles, TextField } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const CreateVendor = props => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const createAccountingYearMutation = useMutation(POST_ACCOUNTING_YEAR)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setName('')
    setFrom(null)
    setTo(null)

    if (state.company) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = e => {
    if (name !== '' && from !== null && to !== null) {
      createAccountingYearMutation({
        variables: {
          company_id: state.companies
            ? state.companies[state.company_index].id
            : null,
          name,
          from,
          to,
        },
      })
      setTimeout(() => {
        setMsgSuccess(true)
        setMsg(true)
      }, 1000)
    } else {
      setTimeout(() => {
        setMsgSuccess(false)
        setMsg(true)
      }, 1000)
    }
    handleClose()
  }

  return (
    <Fragment>
      <Modal
        Icon={Add}
        title="addaccountingyear"
        name="addaccountingyear"
        tooltipTitle={Language[state.locals].addaccountingyear}
        submit={onSubmit}
        close={handleClose}
      >
        <TextField
          autoFocus
          focus
          required
          margin="dense"
          id="name"
          name="name"
          variant="outlined"
          label={Language[state.locals].name}
          value={name}
          type="text"
          fullWidth
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="dense"
            required
            variant="outlined"
            fullWidth
            id="mui-pickers-date"
            label={Language[state.locals].from}
            value={from}
            onChange={date => {
              setFrom(date)
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            required
            variant="dialog"
            fullWidth
            id="mui-pickers-date"
            label={Language[state.locals].to}
            value={to}
            onChange={date => {
              setTo(date)
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Modal>

      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar
            message={'Accounting year created successfully'}
            state={'success'}
          />
        ) : (
          <SnackBar message={'Something went wrong'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

CreateVendor.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateVendor)
