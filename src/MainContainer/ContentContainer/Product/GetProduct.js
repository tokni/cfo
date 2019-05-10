import Context from '../../../Context/Context'
import React, { useContext } from 'react'
import Delete from '@material-ui/icons/Delete'
import UpdateProduct from './UpdateProduct'
import PropTypes from 'prop-types'
import { GET_PRODUCTS, DELETE_PRODUCT } from '../../../utils/Query/ProductQuery'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  withStyles,
  Fab,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core'

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
  const deleteProduct = useMutation(DELETE_PRODUCT)
  const { classes } = props
  const { data } = useSubscription(GET_PRODUCTS, {
    suspend: false,
    variables: {
      company_id: state.company.id,
    },
  })

  const deleteHandeler = id => {
    deleteProduct({
      variables: {
        id: id,
      },
    })
  }

  return (
    <Grid container lg={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Comapny id</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Del</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ? data.Product.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.company_id}</TableCell>
                    <TableCell>
                      <UpdateProduct name={product.name} id={product.id} />
                    </TableCell>
                    <TableCell>
                      <Fab
                        color="primary"
                        aria-label="Add"
                        className={classes.fab}
                        onClick={deleteHandeler.bind(this, product.id)}
                      >
                        <Delete />
                      </Fab>
                    </TableCell>
                  </TableRow>
                )
              })
            : null}
        </TableBody>
      </Table>
    </Grid>
  )
}

GetProduct.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetProduct)
