import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { CREATE_ACCOUNT } from '../../../utils/query'
import { setTimeout } from 'timers'
import { useMutation } from 'react-apollo-hooks'
import Modal from '../../../Helpers/Modal'
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
  const [debit, setDebit] = useState(true)
  const [balance, setBalance] = useState(0)
  const { classes } = props
  const createAccountMutation = useMutation(CREATE_ACCOUNT)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setName(null)
    setBalance(0)
    setDebit(true)
    if (state.company !== null) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = e => {
    if (name !== null) {
      createAccountMutation({
        variables: {
          name,
          balance,
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
      <Modal title="addaccount" text="fillformtoaddaccount" submit={onSubmit}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
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
