import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import Delete from '@material-ui/icons/Delete'
import UpdateTransaction from './UpdateTransaction'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  GET_TRANSACTIONS_SUBSCRIPTION,
  DELETE_TRANSACTION,
} from '../../../utils/Query/TransactionQuery'
import PropTypes from 'prop-types'
import {
  withStyles,
  Fab,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core'

import SnackBar from '../SnackBar/SnackBar'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const GetTransactions = props => {
  const { classes } = props
  const deleteTransaction = useMutation(DELETE_TRANSACTION)
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(
    GET_TRANSACTIONS_SUBSCRIPTION,
    {
      suspend: false,
      variables: {
        company_id: state.company ? state.company.id : null,
      },
    }
  )

  const deleteHandeler = id => {
    deleteTransaction({
      variables: {
        id: id,
      },
    })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <SnackBar message={'Error loading transactions'} state={'error'} />
  }
  return (
    <Table>
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}
      <TableHead>
        <TableRow>
          <TableCell align="right">ID</TableCell>
          <TableCell align="right">Debit Account</TableCell>
          <TableCell align="right">Credit Account</TableCell>
          <TableCell align="right">Type</TableCell>
          <TableCell align="right">Date paid</TableCell>
          <TableCell align="right">Payment</TableCell>
          <TableCell align="right">Invoice</TableCell>
          <TableCell align="right">Bill</TableCell>
          <TableCell align="right">Edit</TableCell>
          <TableCell align="right">Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.Transaction ? (
          data.Transaction.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="right">{item.debit_id}</TableCell>
                <TableCell align="right">{item.credit_id}</TableCell>
                <TableCell align="right">{item.type}</TableCell>
                <TableCell align="right">{item.time_stamp}</TableCell>
                <TableCell align="right">{item.payment}</TableCell>
                <TableCell align="right">{item.invoice_id}</TableCell>
                <TableCell align="right">{item.bill_id}</TableCell>
                <TableCell align="right">
                  <UpdateTransaction id={item.id} />
                </TableCell>
                <TableCell>
                  <Fab
                    color="primary"
                    aria-label="delete"
                    className={classes.fab}
                    onClick={deleteHandeler.bind(this, item.id)}
                  >
                    <Delete />
                  </Fab>
                </TableCell>
              </TableRow>
            )
          })
        ) : (
          <TableRow>
            <TableCell>Empty</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

GetTransactions.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetTransactions)
