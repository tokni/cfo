import AddIcon from '@material-ui/icons/Add'
import Context from '../../../Context/Context'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import Invoice from './Invoice'
import { GET_INVOICES, DELETE_INVOICE } from '../../../utils/Query/InvoiceQuery'
import { DELETE_ORDER } from '../../../utils/Query/OrderQuery'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  withStyles,
  Dialog,
  Fab,
} from '@material-ui/core'
import TableHelper from '../../../Helpers/TableHelper';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  dialogPaper: {
    minWidth: '120vh',
    maxWidth: '120vh',
  },
})

const CreateCustomer = props => {
  const [open, setOpen] = useState(false)
  const { classes } = props
  const [state] = useContext(Context)
  const deleteInvoiceMutation = useMutation(DELETE_INVOICE)
  const deleteOrderMutation = useMutation(DELETE_ORDER)
  const { data } = useSubscription(GET_INVOICES, {
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  const handleClose = () => {
    if (state.company !== null) {
      setOpen(!open)
    }
  }

  // const deleteHandler = async id => {
  //   await deleteOrderMutation({
  //     variables: {
  //       id: id,
  //     },
  //   })

  //   await deleteInvoiceMutation({
  //     variables: {
  //       id: id,
  //     },
  //   })
  // }

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
        classes={{ paper: classes.dialogPaper }}
      >
        <Invoice handleClose={handleClose} />
      </Dialog>
      {data ? <TableHelper array={data.Invoice} delete={deleteInvoiceMutation} deleteOrder={deleteOrderMutation}/> : null}
    </Fragment>
  )
}

CreateCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateCustomer)
