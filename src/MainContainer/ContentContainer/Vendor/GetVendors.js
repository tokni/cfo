import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import SnackBar from '../SnackBar/SnackBar'
import UpdateVendor from './UpdateVendor'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  GET_VENDOR_SUBSCRIPTION,
  DELETE_VENDOR,
} from '../../../utils/Query/VendorQuery'
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

const GetVendors = props => {
  const update = <UpdateVendor/>
  const deleteVendor = useMutation(DELETE_VENDOR)
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(GET_VENDOR_SUBSCRIPTION, {
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
        message={Language[state.locals].errorloadingvendor}
        state={'error'}
      />
    )
  }
  return (
    <Fragment>{data ? <TableHelper array={data.Vendor} update={update} delete={deleteVendor} hideID={true}/> : null}</Fragment>
  )
}

GetVendors.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetVendors)
