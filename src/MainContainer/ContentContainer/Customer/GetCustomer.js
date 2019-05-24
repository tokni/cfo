import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { useContext, Fragment } from 'react'
import Update from './UpdateCustomer'
import { DeleteIcon } from '../../../Helpers/Constants'
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
  const { classes } = props
  const { data } = useSubscription(GET_CUSTOMERS, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null
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
    <Fragment>{data ? <TableHelper array={data.Customer} /> : null}</Fragment>
    // <Grid item container lg={12}>
    //   <Table>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>{Language[state.locals].id}</TableCell>
    //         <TableCell>{Language[state.locals].name}</TableCell>
    //         <TableCell>{Language[state.locals].update}</TableCell>
    //         <TableCell>{Language[state.locals].delete}</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data
    //         ? data.Customer.map((customer, index) => {
    //             return (
    //               <TableRow key={index}>
    //                 <TableCell>{customer.id}</TableCell>
    //                 <TableCell>{customer.name}</TableCell>
    //                 <TableCell>
    //                   <Update name={customer.name} id={customer.id} />
    //                 </TableCell>
    //                 <TableCell>
    //                   <Fab
    //                     color="primary"
    //                     aria-label="Add"
    //                     className={classes.fab}
    //                     onClick={deleteHandeler.bind(this, customer.id)}
    //                   >
    //                     <DeleteIcon />
    //                   </Fab>
    //                 </TableCell>
    //               </TableRow>
    //             )
    //           })
    //         : null}
    //     </TableBody>
    //   </Table>
    // </Grid>
  )
}

GetCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetCustomer)
