import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import AccountNumbers from './AccountNumber'
import SnackBar from '../SnackBar/SnackBar'
import { useSubscription } from 'react-apollo-hooks'
import { GET_SUBSCRIP_ACCOUNTS } from '../../../utils/Query/AccountQuery'
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Table,
} from '@material-ui/core/'

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
            <TableCell align="right">kontu nummar</TableCell>
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
                <TableCell>
                  {item.account_numbers
                    ? item.account_numbers.map((account, index) => {
                        return (
                          account.account_number +
                          (index + 1 === item.account_numbers.length
                            ? ''
                            : ' | ')
                        )
                      })
                    : 'vinarliga legg kontunummar til'}
                </TableCell>
                <TableCell>
                  <AccountNumbers id={item.id} />
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
