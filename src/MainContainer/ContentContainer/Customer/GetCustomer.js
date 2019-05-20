import Context from '../../../Context/Context'
import { DeleteIcon } from '../../../Helpers/Constants'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Update from './UpdateCustomer'
import {
  GET_CUSTOMERS,
  DELETE_CUSTOMERS,
} from '../../../utils/Query/CustomersQuery'
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

const GetCustomer = props => {
  const deleteCustomer = useMutation(DELETE_CUSTOMERS)
  const [state] = useContext(Context)
  const { classes } = props
  const { data } = useSubscription(GET_CUSTOMERS, {
    suspend: false,
    variables: {
      company_id: state.company.id,
    },
  })

  const deleteHandeler = id => {
    deleteCustomer({
      variables: {
        id: id,
      },
    })
  }

  return (
    <Grid item container lg={12}>
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
            ? data.Customer.map((customer, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.company_id}</TableCell>
                    <TableCell>
                      <Update name={customer.name} id={customer.id} />
                    </TableCell>
                    <TableCell>
                      <Fab
                        color="primary"
                        aria-label="Add"
                        className={classes.fab}
                        onClick={deleteHandeler.bind(this, customer.id)}
                      >
                        <DeleteIcon />
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

GetCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetCustomer)
