import Context from '../../../Context/Context'
import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import UpdateProduct from './UpdateProduct'
import { GET_PRODUCTS, DELETE_PRODUCT } from '../../../utils/Query/ProductQuery'
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

const GetProduct = props => {
  const [state] = useContext(Context)
  const update = <UpdateProduct />
  const deleteProduct = useMutation(DELETE_PRODUCT)
  const { data } = useSubscription(GET_PRODUCTS, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  return (
    <Fragment>
      {data ? (
        <TableHelper
          array={data.Product}
          update={update}
          delete={deleteProduct}
        />
      ) : null}
    </Fragment>
  )
}

GetProduct.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetProduct)
