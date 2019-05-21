import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import React, { useContext } from 'react'
import UpdateTransaction from './UpdateTransaction'
import { DeleteIcon } from '../../../Helpers/Constants'
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
    return <p>{Language[state.locals].loading}...</p>
  }

  if (error) {
    return (
      <SnackBar
        message={Language[state.locals].errorloadingtransactions}
        state={'error'}
      />
    )
  }
  return (
    <Table>
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}
      <TableHead>
        <TableRow>
          <TableCell align="right">{Language[state.locals].id}</TableCell>
          <TableCell align="right">
            {Language[state.locals].debit} {Language[state.locals].account}
          </TableCell>
          <TableCell align="right">
            {Language[state.locals].credit} {Language[state.locals].account}
          </TableCell>
          <TableCell align="right">{Language[state.locals].type}</TableCell>
          <TableCell align="right">{Language[state.locals].datepaid}</TableCell>
          <TableCell align="right">{Language[state.locals].payment}</TableCell>
          <TableCell align="right">{Language[state.locals].invoice}</TableCell>
          <TableCell align="right">{Language[state.locals].bill}</TableCell>
          <TableCell align="right">{Language[state.locals].update}</TableCell>
          <TableCell align="right">{Language[state.locals].delete}</TableCell>
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
                    <DeleteIcon />
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
