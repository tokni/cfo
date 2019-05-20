import AddIcon from '@material-ui/icons/Add'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { POST_ACCOUNT } from '../../../utils/Query/AccountQuery'
import { setTimeout } from 'timers'
import { useMutation } from 'react-apollo-hooks'
import {
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Fab,
} from '@material-ui/core'

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
  const createAccountMutation = useMutation(POST_ACCOUNT)
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
    e.preventDefault()
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
      <Fab
        onClick={handleClose}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {Language[state.locals].addaccount}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {Language[state.locals].fillformtoaddaccount}
          </DialogContentText>
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
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {Language[state.locals].cancel}
          </Button>
          <Button onClick={onSubmit} color="primary">
            {Language[state.locals].add}
          </Button>
        </DialogActions>
      </Dialog>
      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar message={'Account added successfully'} state={'success'} />
        ) : (
          <SnackBar message={'Name is required'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

CreateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateAccount)
