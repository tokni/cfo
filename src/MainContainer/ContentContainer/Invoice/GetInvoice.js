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
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core'

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
  const [name, setName] = useState('')
  const { classes } = props
  const [state] = useContext(Context)
  const [setMsg] = useState(false)
  const deleteInvoiceMutation = useMutation(DELETE_INVOICE)
  const deleteOrderMutation = useMutation(DELETE_ORDER)
  const { data } = useSubscription(GET_INVOICES, {
    variables: {
      company_id: state.company.id,
    },
  })

  const handleClose = () => {
    setName(null)
    if (state.company !== null) {
      setOpen(!open)
    }
    // setMsg(false)
  }

  const deleteHandler = async id => {
    await deleteOrderMutation({
      variables: {
        id: id,
      },
    })

    await deleteInvoiceMutation({
      variables: {
        id: id,
      },
    })
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
        classes={{ paper: classes.dialogPaper }}
        // aria-labelledby="form-dialog-title"
      >
        <Invoice />
      </Dialog>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>customer id</TableCell>
            <TableCell>timestamp</TableCell>
            <TableCell>payment due</TableCell>
            <TableCell>invoice number</TableCell>
            <TableCell>paid</TableCell>
            <TableCell>description</TableCell>
          </TableRow>
        </TableHead>
        {data ? (
          <TableBody>
            {data.Invoice.map((invoice, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.customer_id}</TableCell>
                  <TableCell>
                    {invoice.time_stampt
                      .replace('T', ' ')
                      .substring(0, invoice.time_stampt.indexOf('.'))}
                  </TableCell>
                  <TableCell>{invoice.payment_due_date}</TableCell>
                  <TableCell>{invoice.invoice_number}</TableCell>
                  <TableCell style={{ color: invoice.paid ? 'green' : 'red' }}>
                    {invoice.paid ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>PAY</TableCell>
                  <TableCell>EDIT</TableCell>
                  <TableCell onClick={deleteHandler.bind(this, invoice.id)}>
                    DEL
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        ) : null}
      </Table>
    </Fragment>
  )
}

CreateCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateCustomer)
