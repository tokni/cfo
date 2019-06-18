import Context from '../../../Context/Context'
import PropTypes from 'prop-types'
import React, { useContext, Fragment } from 'react'
import Update from './UpdateCustomer'
import {
  GET_CUSTOMERS,
  DELETE_CUSTOMERS,
} from '../../../utils/Query/CustomersQuery'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import { withStyles } from '@material-ui/core'
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

const GetCustomer = props => {
  const deleteCustomer = useMutation(DELETE_CUSTOMERS)
  const [state] = useContext(Context)
  const update = <Update />
  const { data } = useSubscription(GET_CUSTOMERS, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  return (
    <Fragment>
      {data ? <TableHelper array={data.Customer} update={update} delete={deleteCustomer} hideID={true}/> : null}
    </Fragment>
  )
}

GetCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetCustomer)
