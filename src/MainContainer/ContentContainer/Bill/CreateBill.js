import AddIcon from '@material-ui/icons/Add'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { CREATE_BILL } from '../../../utils/Query/BillQuery'
import StoreExpense from '../../StoreContainer/StoreExpense'
import StoreVendor from '../../StoreContainer/StoreVendor'
import StoreTax from '../../StoreContainer/StoreTax'
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
  InputLabel,
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

const CreateBill = props => {
  //load expense, vendor, tax
  const expenses = StoreExpense()
  const vendors = StoreVendor()
  const taxes = StoreTax()

  const [open, setOpen] = useState(false)
  const [vendor_id, setVendor_id] = useState('')
  const [expense_id, setExpense_id] = useState('')
  const [description, setDescription] = useState('')
  const [tax_id, setTax_id] = useState('')
  const [payment, setPayment] = useState(0)
  const [date_bill_received, setDate_bill_received] = useState(null)
  const [payment_due, setPayment_due] = useState(null)
  const [attachment_id, setAttachment_id] = useState('')

  const { classes } = props
  const createBilltMutation = useMutation(CREATE_BILL)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setVendor_id('')
    setExpense_id('')
    setDescription('')
    setTax_id('')
    setPayment(0)
    setDate_bill_received(null)
    setPayment_due(null)
    setAttachment_id('')

    if (state.company) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (
      state.vendor_id !== '' &&
      state.expense_id !== '' &&
      description !== '' &&
      tax_id !== '' &&
      payment !== 0 &&
      date_bill_received !== null &&
      payment_due !== null &&
      attachment_id !== ''
    ) {
      createBilltMutation({
        variables: {
          vendor_id,
          expense_id,
          description,
          tax_id,
          payment,
          date_bill_received,
          payment_due,
          attachment_id,
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
          {Language[state.locals].addbill}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {Language[state.locals].fillformtoaddbill}
          </DialogContentText>

          <TextField
            select
            margin="dense"
            value={vendor_id || ''}
            id="vendor"
            label={Language[state.locals].vendor}
            fullWidth
            onChange={e => {
              setVendor_id(e.target.value)
            }}
          >
            {vendors ? (
              vendors.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                )
              })
            ) : (
              <option>no vendors created</option>
            )}
          </TextField>

          <TextField
            autoFocus
            select
            margin="dense"
            value={expense_id || ''}
            id="expense"
            label={Language[state.locals].expense}
            fullWidth
            onChange={e => {
              setExpense_id(e.target.value)
            }}
          >
            {expenses ? (
              expenses.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                )
              })
            ) : (
              <option>empty</option>
            )}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label={Language[state.locals].description}
            type="text"
            fullWidth
            onChange={e => {
              setDescription(e.target.value)
            }}
          />

          <TextField
            focus
            margin="dense"
            id="payment"
            label={Language[state.locals].payment}
            value={payment}
            type="number"
            fullWidth
            onChange={e => {
              setPayment(e.target.value)
            }}
          />
          <TextField
            autoFocus
            select
            margin="dense"
            id="tax"
            label={Language[state.locals].tax}
            value={tax_id || ''}
            fullWidth
            onChange={e => {
              setTax_id(e.target.value)
            }}
          >
            {taxes ? (
              taxes.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name + ' %' + item.tax_percentage * 100}
                  </option>
                )
              })
            ) : (
              <option>No tax created</option>
            )}
          </TextField>

          <InputLabel>{Language[state.locals].billreceived}</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="tax"
            value={date_bill_received}
            type="date"
            fullWidth
            onChange={e => {
              setDate_bill_received(e.target.value)
            }}
          />
          <InputLabel>{Language[state.locals].paymentdue}</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="payment_due"
            label={Language[state.locals].payment_due}
            value={payment_due}
            type="date"
            fullWidth
            onChange={e => {
              setPayment_due(e.target.value)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="attachment"
            label={Language[state.locals].attachment}
            value={attachment_id}
            type="text"
            fullWidth
            onChange={e => {
              setAttachment_id(e.target.value)
            }}
          />
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
          <SnackBar message={'Bill updated successfully'} state={'success'} />
        ) : (
          <SnackBar message={'Fill all parameters'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

CreateBill.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateBill)
