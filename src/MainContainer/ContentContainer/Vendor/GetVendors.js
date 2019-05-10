import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import Delete from '@material-ui/icons/Delete'
 import UpdateVendor from './UpdateVendor'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import { GET_VENDOR_SUBSCRIPTION, DELETE_VENDOR } from '../../../utils/Query/VendorQuery'
import PropTypes from 'prop-types'
import {
  withStyles,
  Fab,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core'

import SnackBar from '../SnackBar/SnackBar'

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
  const { classes } = props
  const deleteVendor = useMutation(DELETE_VENDOR)
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(GET_VENDOR_SUBSCRIPTION, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  const deleteHandeler = id => {
    deleteVendor({
      variables: {
        id: id,
      },
    })
  }

  if (loading) {
    return (
      <tr>
        <td>-</td>
      </tr>
    )
  }

  if (error) {
    return <SnackBar message={'Error loading vendor'} state={'error'} />
  }
  return (
    <Table>
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Edit</TableCell>
          <TableCell align="right">Delete</TableCell>
          </TableRow>
      </TableHead>
      <TableBody>
        {data.Vendor.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">
                <UpdateVendor
                  id={item.id}
                  name={item.name}
                  company_id={item.company_id}
               
                />
              </TableCell>
              <TableCell align="right">
                <Fab
                  color="primary"
                  aria-label="Delete"
                  className={classes.fab}
                  onClick={deleteHandeler.bind(this, item.id)}
                >
                  <Delete />
                </Fab>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

GetVendors.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetVendors)
