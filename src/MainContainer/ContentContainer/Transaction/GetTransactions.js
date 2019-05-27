import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import React, { useContext, Fragment } from 'react'
import UpdateTransaction from './UpdateTransaction'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  GET_TRANSACTIONS_SUBSCRIPTION,
  DELETE_TRANSACTION,
} from '../../../utils/Query/TransactionQuery'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

import SnackBar from '../SnackBar/SnackBar'
import TableHelper from '../../../Helpers/TableHelper'

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
  const update = <UpdateTransaction />
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
    <Fragment>
      {data ? (
        <TableHelper
          array={data.Transaction}
          update={update}
          delete={deleteTransaction}
        />
      ) : null}
    </Fragment>
  )
}

GetTransactions.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetTransactions)
