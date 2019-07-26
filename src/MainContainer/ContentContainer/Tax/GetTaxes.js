import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import React, { useContext, Fragment } from 'react'
import UpdateTax from './UpdateTax'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  GET_TAX_SUBSCRIPTION,
  DELETE_TAX,
} from '../../../utils/Query/TaxQuery'
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

const GetTaxes = props => {
  const update = <UpdateTax />
  const deleteTax = useMutation(DELETE_TAX)
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(GET_TAX_SUBSCRIPTION, {
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
        message={Language[state.locals].errorloadingtaxes}
        state={'error'}
      />
    )
  }
  return (
    <Fragment>
      {data ? (
        <TableHelper array={data.Tax} update={update} delete={deleteTax} hideID={true}/>
      ) : null}
    </Fragment>
  )
}

GetTaxes.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetTaxes)
