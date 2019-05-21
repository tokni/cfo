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
    return <p>{Language[state.locals].loading}...</p>
  }

  if (error) {
    return (
      <SnackBar
        message={Language[state.locals].errorloadingaccounts}
        state={'error'}
      />
    )
  }

  return (
    <Paper>
      {state.company === null ? (
        <SnackBar message={'Load companies first'} state={'warning'} />
      ) : null}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{Language[state.locals].id}</TableCell>
            <TableCell align="right">{Language[state.locals].name}</TableCell>
            <TableCell align="right">
              {Language[state.locals].balance}
            </TableCell>
            <TableCell align="right">
              {Language[state.locals].debit} / {Language[state.locals].credit}
            </TableCell>
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
                  {item.debit
                    ? Language[state.locals].debit
                    : Language[state.locals].credit}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default GetAccounts
