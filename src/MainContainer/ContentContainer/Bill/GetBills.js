import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import Delete from '@material-ui/icons/Delete'
import UpdateBill from './UpdateBill'
import PayBill from './PayBill'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  GET_BILLS_SUBSCRIPTION,
  DELETE_BILL,
} from '../../../utils/Query/BillQuery'
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

const GetBills = props => {
  const { classes } = props
  const deleteBill = useMutation(DELETE_BILL)
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(GET_BILLS_SUBSCRIPTION, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  const deleteHandeler = id => {
    deleteBill({
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
    return <SnackBar message={'Error loading bills'} state={'error'} />
  }
  return (
    <Table>
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell align="right">Expense Name</TableCell>
          <TableCell align="right">Vendor Name</TableCell>

          <TableCell align="right">Payment</TableCell>
          <TableCell align="right">Tax</TableCell>
          <TableCell align="right">Date: Bill received</TableCell>
          <TableCell align="right">Date: Payment due</TableCell>
          <TableCell align="right">Description</TableCell>
          <TableCell align="right">Has been paid</TableCell>
          <TableCell align="right">Edit</TableCell>
          <TableCell align="right">Delete</TableCell>
          <TableCell align="right">Pay Bill</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.Bill.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="right">{item.Expense.name}</TableCell>
              <TableCell align="right">{item.Vendor.name}</TableCell>
              <TableCell align="right">{item.payment}</TableCell>
              <TableCell align="right">{item.Tax.tax_percentage}</TableCell>
              <TableCell align="right">{item.date_bill_received}</TableCell>
              <TableCell align="right">{item.payment_due}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
              {/* <TableCell align="right">{item.attachment_name}</TableCell> */}
              <TableCell align="right">{item.paid ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <UpdateBill
                  id={item.id}
                  vendor_id={item.Vendor.id}
                  expense_id={item.Expense.id}
                  payment={item.payment}
                  tax_id={item.Tax.id}
                  date_bill_received={item.date_bill_received}
                  payment_due={item.payment_due}
                  description={item.description}
                  attachment_id={item.Attachment.id}
                />
              </TableCell>
              <TableCell>
                <Fab
                  color="primary"
                  aria-label="Update"
                  className={classes.fab}
                  onClick={deleteHandeler.bind(this, item.id)}
                >
                  <Delete />
                </Fab>
              </TableCell>
              <TableCell>
                <PayBill bill_id={item.id} payment={item.payment}/>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

GetBills.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetBills)
