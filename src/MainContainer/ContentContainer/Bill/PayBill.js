import AddIcon from '@material-ui/icons/Money'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { useMutation } from 'react-apollo-hooks'
import { POST_TRANSACTION } from '../../../utils/Query/TransactionQuery'
import { PUT_BILL_PAY } from '../../../utils/Query/BillQuery'
import { PUT_ACCOUNT_BALANCE } from '../../../utils/Query/AccountQuery'
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

const PayBill = props => {
  const [open, setOpen] = useState(false)
  const [debit_id, setDebitAccount] = useState('')
  const [credit_id, setCreditAccount] = useState('')

  const [type, setType] = useState('')
  const bill_id = props.id
  const payment = props.payment

  const { classes } = props
  const postTransactionMutation = useMutation(POST_TRANSACTION)
  const updateBilltMutation = useMutation(PUT_BILL_PAY)
  const updateAccountBalanceMutation = useMutation(PUT_ACCOUNT_BALANCE)

  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setDebitAccount('')
    setCreditAccount('')
    if (state.company !== null) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = async e => {
    let debit
    let credit
    e.preventDefault()
    if (
      debit_id !== '' &&
      credit_id !== '' &&
      payment !== '' &&
      bill_id !== ''
    ) {
      await state.company.Accounts.forEach(element => {
        if (element.id === debit_id) {
          debit = element.balance
        }
        if (element.id === credit_id) {
          credit = element.balance
        }
      })

      await postTransactionMutation({
        variables: {
          company_id: state.company.id,
          credit_id,
          debit_id,
          payment: props.payment,
          type,
          bill_id: bill_id,
        },
      })
      await updateBilltMutation({
        variables: {
          id: bill_id,
          company_id: state.company.id,
          paid: true,
        },
      })
      // update Debit account
      await updateAccountBalanceMutation({
        variables: {
          id: debit_id,
          company_id: state.company.id,
          balance: debit + props.payment,
        },
      })
      // update credit account
      await updateAccountBalanceMutation({
        variables: {
          id: credit_id,
          company_id: state.company.id,
          balance: credit - props.payment,
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
          {Language[state.locals].addtransaction}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {Language[state.locals].fillformtoaddtransaction}
          </DialogContentText>

          {/* invoice FIELD */}
          <TextField
            autoFocus
            margin="dense"
            id="debit"
            label={Language[state.locals].type}
            type="text"
            fullWidth
            onChange={e => {
              setType(e.target.value)
            }}
          />

          {/* DEBIT FIELD */}
          <TextField
            autoFocus
            select
            margin="dense"
            id="debit"
            value={debit_id || ''}
            label={Language[state.locals].debit}
            type="text"
            fullWidth
            onChange={e => {
              setDebitAccount(e.target.value)
            }}
          >
            {state.company.Accounts ? (
              state.company.Accounts.map((item, index) => {
                if (item.debit === true) {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  )
                }else{
                  return null
                }
              })
            ) : (
              <option>empty</option>
            )}
          </TextField>

          {/* CREDIT FIELD */}
          <TextField
            autoFocus
            margin="dense"
            id="credit"
            select
            value={credit_id || ''}
            label={Language[state.locals].credit || ''}
            type="text"
            fullWidth
            onChange={e => {
              setCreditAccount(e.target.value)
            }}
          >
            {state.company.Accounts ? (
              state.company.Accounts.map((item, index) => {
                if (item.debit === false) {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  )
                }else{
                  return null
                }
              })
            ) : (
              <option>empty</option>
            )}
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
          <SnackBar
            message={'Transaction added successfully'}
            state={'success'}
          />
        ) : (
          <SnackBar message={'Fields are required'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

PayBill.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PayBill)
