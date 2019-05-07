import { useQuery } from 'react-apollo-hooks'
import { GET_DAY_BOOK } from '../../../utils/query'
import React, { useContext} from 'react'
import Context from '../../../Context/Context'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import SnackBar from '../SnackBar/SnackBar'



const DayBook = () => {
  const { data, error, loading } = useQuery(GET_DAY_BOOK, {
    suspend: false,
  })
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context)


  if (error) {
    return <SnackBar message={'Error loading accounts'} state={'error'} />
  }
 
  return (
    <Paper>
      {console.log("Day book", data)}
      {data.day_book === undefined ? (
        <SnackBar message={'Load companies first'} state={'warning'} />
      ) : null}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">name</TableCell>
            {/* <TableCell align="right">Debit / Credit</TableCell> */}
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.day_book.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.balance}</TableCell>
                <TableCell align="right">
                  {item.debit ? 'debit' : 'credit'}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default DayBook
