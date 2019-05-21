import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import React, { useContext, Fragment } from 'react'
import UpdateBill from './UpdateBill'
import PayBill from './PayBill'
import { DeleteIcon } from '../../../Helpers/Constants'
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
    return <p>{Language[state.locals].loading}...</p>
  }

  if (error) {
    return (
      <SnackBar
        message={Language[state.locals].errorloadingbills}
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
            <TableCell align="right">
              {Language[state.locals].expensename}
            </TableCell>
            <TableCell align="right">
              {Language[state.locals].vendorname}
            </TableCell>
            <TableCell align="right">
              {Language[state.locals].payment}
            </TableCell>
            <TableCell align="right">{Language[state.locals].tax}</TableCell>
            <TableCell align="right">
              {Language[state.locals].received}
            </TableCell>
            <TableCell align="right">
              {Language[state.locals].paymentdue}
            </TableCell>
            <TableCell align="right">
              {Language[state.locals].description}
            </TableCell>
            <TableCell align="right">{Language[state.locals].paid}</TableCell>
            <TableCell align="right">{Language[state.locals].update}</TableCell>
            <TableCell align="right">{Language[state.locals].delete}</TableCell>
            <TableCell align="right">
              {Language[state.locals].paybill}
            </TableCell>
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
                <TableCell align="right">
                  {item.paid
                    ? Language[state.locals].yes
                    : Language[state.locals].no}
                </TableCell>
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
                    <DeleteIcon />
                  </Fab>
                </TableCell>
                <TableCell>
                  <PayBill bill_id={item.id} payment={item.payment} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Fragment>
  )
}

GetBills.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetBills)
