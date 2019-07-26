import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import React, { useContext, Fragment } from 'react'
import UpdateBill from './UpdateBill'
import PayBill from './PayBill'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  GET_BILLS_SUBSCRIPTION,
  DELETE_BILL,
} from '../../../utils/Query/BillQuery'
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

const GetBills = props => {
  const deleteBill = useMutation(DELETE_BILL)
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(GET_BILLS_SUBSCRIPTION, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })
  const update = <UpdateBill />
  const payBill = <PayBill />

  if (loading) {
    return <p>{Language[state.locals].loading}...</p>
  }

  let newArr = null
  try {
    if (data) {
      const from = new Date(
        state.accounting_year[state.accounting_year_index].from
      )
      const to = new Date(state.accounting_year[state.accounting_year_index].to)
      newArr = data.Bill.filter(
        obj =>
          new Date(obj.payment_due) >= from && new Date(obj.payment_due) <= to
      )
    }
  } catch (e) {
    console.log(`trying data....`)
  }
  if (error) {
    return (
      <SnackBar
        message={Language[state.locals].errorloadingbills}
        state={'error'}
      />
    )
  }
  return (
    <Fragment>
      {data.Bill ? (
        <TableHelper
          array={newArr ? newArr : []}
          update={update}
          delete={deleteBill}
          pay={payBill}
          hideID={true}
        />
      ) : null}
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}
    </Fragment>
  )
}

GetBills.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetBills)
