import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import {useSubscription} from 'react-apollo-hooks'
import { GET_BILLS_SUBSCRIPTION } from '../../../utils/Query/BillQuery'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import SnackBar from '../SnackBar/SnackBar'

const GetBills = () => {
    const [state] = useContext(Context)
    const { data, error, loading } = useSubscription(GET_BILLS_SUBSCRIPTION, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  if (loading) {
    console.log('Loading bills...')
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

    <Paper>
    {console.log("bills", data)}

      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Expense Name</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Tax</TableCell>
            <TableCell align="right">Date: Bill received</TableCell>
            <TableCell align="right">Date: Payment due</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Attachment Name</TableCell>
            
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
                <TableCell align="right">{item.payment}</TableCell>
                <TableCell align="right">{item.Tax.tax_percentage}</TableCell>
                <TableCell align="right">{item.date_bill_received}</TableCell>
                <TableCell align="right">{item.payment_due}</TableCell>
                <TableCell align="right">{item.description}</TableCell>
                <TableCell align="right">{item.Attachment.attachment_name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  ) 
}

export default GetBills