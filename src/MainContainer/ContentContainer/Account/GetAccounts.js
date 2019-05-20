import { useSubscription } from 'react-apollo-hooks'
import { GET_SUBSCRIP_ACCOUNTS } from '../../../utils/Query/AccountQuery'
import React, { useContext } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import SnackBar from '../SnackBar/SnackBar'

const GetAccounts = () => {
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(GET_SUBSCRIP_ACCOUNTS, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <SnackBar message={'Error loading accounts'} state={'error'} />
  }

  return (
    <Paper>
      {state.company === null ? (
        <SnackBar message={'Load companies first'} state={'warning'} />
      ) : null}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Debit / Credit</TableCell>
            <TableCell align="right">Company name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Account.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="right">
                  {Language[state.locals][item.name.toLowerCase()] || item.name}
                </TableCell>
                <TableCell align="right">{item.balance}</TableCell>
                <TableCell align="right">
                  {item.debit ? 'debit' : 'credit'}
                </TableCell>
                <TableCell align="right">{item.Company.name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default GetAccounts
