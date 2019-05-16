import Context from '../../../Context/Context'
import Paper from '@material-ui/core/Paper'
import React, { useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { useSubscription } from 'react-apollo-hooks'
import { GET_DAY_BOOK } from '../../../utils/query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

const DayBook = () => {
  const [state] = useContext(Context)

  const { data, error } = useSubscription(GET_DAY_BOOK, {
    suspend: false,
    variables: {
      company_id: state.company.id,
    },
  })

  if (error) {
    return <SnackBar message={'Error loading day book'} state={'error'} />
  }

  return (
    <Paper>
      {data === null ? (
        <SnackBar message={'No data'} state={'warning'} />
      ) : null}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Account ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Debit / Credit</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ? data.day_book.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="right">{item.account_id}</TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">
                      {item.debit ? 'debit' : 'credit'}
                    </TableCell>
                    <TableCell align="right">{item.balance}</TableCell>
                  </TableRow>
                )
              })
            : null}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default DayBook
