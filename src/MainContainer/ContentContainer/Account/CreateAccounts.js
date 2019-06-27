import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { Add } from '../../../Helpers/Constants'
import { POST_ACCOUNT } from '../../../utils/Query/AccountQuery'
import { setTimeout } from 'timers'
import { useMutation } from 'react-apollo-hooks'
import { withStyles, TextField } from '@material-ui/core'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const CreateAccount = props => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState(0)
  const [debit, setDebit] = useState(true)
  const [balance, setBalance] = useState(0)
  const createAccountMutation = useMutation(POST_ACCOUNT)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setName(null)
    setBalance(0)
    setType(0)
    setDebit(true)
    if (state.company !== null) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = e => {
    if (name !== null && type !== 0) {
      createAccountMutation({
        variables: {
          name,
          balance,
          type,
          debit,
          company_id: state.company.id,
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
        title="addaccount"
        text="fillformtoaddaccount"
        name="addaccount"
        submit={onSubmit}
        close={handleClose}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label={Language[state.locals].name}
          type="text"
          fullWidth
          onChange={e => {
            setName(e.target.value)
          }}
        />{' '}
        <TextField
          autoFocus
          margin="dense"
          id="balance"
          label="Balance"
          value={balance}
          type="number"
          fullWidth
          onChange={e => {
            setBalance(e.target.value)
          }}
        />
        <TextField
          autoFocus
          select
          margin="dense"
          id="debit"
          label="Debit / Credit"
          fullWidth
          value={debit}
          onChange={e => {
            setDebit(e.target.value)
          }}
        >
          <option key={1} value={true}>
            Debit
          </option>
          <option key={2} value={false}>
            Credit
          </option>
        </TextField>
        <TextField
          select
          margin="dense"
          id="type"
          label={Language[state.locals].type}
          fullWidth
          value={type}
          onChange={e => {
            setType(e.target.value)
          }}
        >
          <option key={1} value={1}>
            Assets
          </option>
          <option key={2} value={2}>
            Liabillities
          </option>
          <option key={3} value={3}>
            Owner's Equity
          </option>
          <option key={4} value={4}>
            Revenues
          </option>
          <option key={5} value={5}>
            Cost of goods Sold
          </option>
          <option key={6} value={6}>
            Expenses
          </option>
          <option key={7} value={7}>
            Other
          </option>
        </TextField>
      </Modal>
      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar message={'Account added successfully'} state={'success'} />
        ) : (
          <SnackBar
            message={Language[state.locals].nameisrequired}
            state={'error'}
          />
        )
      ) : null}
    </Fragment>
  )
}

CreateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateAccount)
