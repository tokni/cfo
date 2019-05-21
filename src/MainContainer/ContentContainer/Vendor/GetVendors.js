import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import SnackBar from '../SnackBar/SnackBar'
import UpdateVendor from './UpdateVendor'
import { DeleteIcon } from '../../../Helpers/Constants'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  GET_VENDOR_SUBSCRIPTION,
  DELETE_VENDOR,
} from '../../../utils/Query/VendorQuery'
import {
  withStyles,
  Fab,
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
    <Fragment>
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{Language[state.locals].id}</TableCell>
            <TableCell align="right">{Language[state.locals].name}</TableCell>
            <TableCell align="right">{Language[state.locals].update}</TableCell>
            <TableCell align="right">{Language[state.locals].delete}</TableCell>
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
                    <DeleteIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Fragment>
  )
}

GetVendors.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetVendors)
