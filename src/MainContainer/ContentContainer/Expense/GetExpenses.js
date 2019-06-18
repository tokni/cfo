import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { useContext, Fragment } from 'react'
import UpdateExpense from './UpdateExpense'
import SnackBar from '../SnackBar/SnackBar'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  GET_EXPENSE_SUBSCRIPTION,
  DELETE_EXPENSE,
} from '../../../utils/Query/ExpenseQuery'
import {
  withStyles
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
})

const GetExpenses = props => {
  const deleteExpense = useMutation(DELETE_EXPENSE)
  const update = <UpdateExpense />
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(GET_EXPENSE_SUBSCRIPTION, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })


  if (loading) {
    return <p>{Language[state.locals].loading}...</p>
  }

  if (error) {
    return (
      <SnackBar
        message={Language[state.locals].errorloadingexpenses}
        state={'error'}
      />
    )
  }
  return (
    <Fragment>
      {data ? <TableHelper array={data.Expense} update={update} delete={deleteExpense} hideID={true}/> : null}
    </Fragment>
  )
}

GetExpenses.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetExpenses)
