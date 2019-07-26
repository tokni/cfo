import AddIcon from '@material-ui/icons/Add'
import Context from '../../../Context/Context'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import Invoice from './Invoice'
import { GET_INVOICES, DELETE_INVOICE } from '../../../utils/Query/InvoiceQuery'
import { DELETE_ORDER } from '../../../utils/Query/OrderQuery'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import { withStyles, Dialog, Fab } from '@material-ui/core'
import TableHelper from '../../../Helpers/TableHelper'
import PayInvoice from './PayInvoice'
import Language from '../../../utils/language'
import SnackBar from '../SnackBar/SnackBar'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  const { data, loading, error } = useSubscription(GET_INVOICES, {
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })
  const payInvoice = <PayInvoice />

  const handleClose = () => {
    if (state.company !== null) {
      setOpen(!open)
    }
  }

  let newArr = null
  if (data) {
    const from = new Date(
      state.accounting_year[state.accounting_year_index].from
    )
    const to = new Date(state.accounting_year[state.accounting_year_index].to)
    newArr = data.Invoice.filter(
      obj =>
        new Date(obj.payment_due) >= from && new Date(obj.payment_due) <= to
    )
  }

  if (loading) {
    return (
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
        <CircularProgress />
        {Language[state.locals].loading}...
      </div>
    )
    // return <p>{Language[state.locals].loading}...</p>
  }

  if (error) {
    return (
      <SnackBar
        message={
          Language[state.locals].errorloadinginvoice || 'Error fetching data...'
        }
        state={'error'}
      />
    )
  }

  return (
    <Fragment>
      <Fab
        onClick={handleClose}
        color="primary"
        data-cy="addinvoice"
        name="addinvoice"
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
      {data ? (
        <TableHelper
          array={newArr ? newArr : []}
          // array={data.Invoice}
          deleteInvoiceMutation={deleteInvoiceMutation}
          deleteOrderMutation={deleteOrderMutation}
          pay={payInvoice}
          hideID={true}
        />
      ) : null}
    </Fragment>
  )
}

CreateCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateCustomer)
