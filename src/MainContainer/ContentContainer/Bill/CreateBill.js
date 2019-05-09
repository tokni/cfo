import AddIcon from '@material-ui/icons/Add'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { CREATE_BILL } from '../../../utils/Query/BillQuery'
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

const CreateBill = props => {
  const [open, setOpen] = useState(false)
  const [vendor_id, setVendor_id] = useState(null)
  const [expense_id, setExpense_id] = useState(null)
  const [description, setDescription] = useState('')
  const [tax_id, setTax_id] = useState(null)
  const [payment, setPayment] = useState(0)
  const [date_bill_received, setDate_bill_received] = useState(Date.now())
  const [payment_due, setPayment_due] = useState(null)
  const [attachment_id, setAttachment_id] = useState(null)

  const { classes } = props
  const createAccountMutation = useMutation(CREATE_BILL)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setVendor_id(null)
    setExpense_id(null)
    if (state.company !== null) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (0 !== 1) {
      createAccountMutation({
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
            autoFocus
            margin="dense"
            id="vendor"
            label={Language[state.locals].vendor}
            type="text"
            fullWidth
            onChange={e => {
              setVendor_id(e.target.value)
            }}
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="expense"
            label={Language[state.locals].expense}
            type="text"
            fullWidth
            onChange={e => {
              setExpense_id(e.target.value)
            }}
          />

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
            autoFocus
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
            margin="dense"
            id="tax"
            label={Language[state.locals].tax}
            value={tax_id}
            type="text"
            fullWidth
            onChange={e => {
              setTax_id(e.target.value)
            }}
          />

          <TextField
             autoFocus
             margin="dense"
             id="tax"
             label={Language[state.locals].billreceived}
             value={date_bill_received}
             type="date"
             fullWidth
             onChange={e => {
               setDate_bill_received(e.target.value)
             }}
          />

          <TextField
             autoFocus
             margin="dense"
             id="tax"
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
          <SnackBar message={'Account added successfully'} state={'success'} />
        ) : (
          <SnackBar message={'Name is required'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

CreateBill.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateBill)
