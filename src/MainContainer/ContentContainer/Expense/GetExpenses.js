import React, { useContext, Fragment } from 'react'
import Context from '../../../Context/Context'
import Delete from '@material-ui/icons/Delete'
import UpdateExpense from './UpdateExpense'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  GET_EXPENSE_SUBSCRIPTION,
  DELETE_EXPENSE,
} from '../../../utils/Query/ExpenseQuery'
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

const GetExpenses = props => {
  const { classes } = props
  const deleteExpense = useMutation(DELETE_EXPENSE)
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(GET_EXPENSE_SUBSCRIPTION, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  const deleteHandeler = id => {
    deleteExpense({
      variables: {
        id: id,
      },
    })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <SnackBar message={'Error loading vendor'} state={'error'} />
  }
  return (
    <Fragment>
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Expense.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">
                  <UpdateExpense
                    id={item.id}
                    name={item.name}
                    company_id={item.company_id}
                  />
                </TableCell>
                <TableCell align="right">
                  <Fab
                    color="primary"
                    aria-label="Delete"
                    className={classes.fab}
                    onClick={deleteHandeler.bind(this, item.id)}
                  >
                    <Delete />
                  </Fab>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Fragment>
  )
}

GetExpenses.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetExpenses)
