import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Paper from '@material-ui/core/Paper'
import React, { useContext, Fragment } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { useSubscription } from 'react-apollo-hooks'
import { GET_DAY_BOOK } from '../../../utils/Query/DaybookQuery'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import TableHelper from '../../../Helpers/TableHelper';

const DayBook = () => {
  const [state] = useContext(Context)

  const { data, error } = useSubscription(GET_DAY_BOOK, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  if (error) {
    return <SnackBar message={'Error loading day book'} state={'error'} />
  }

  return (

    <Fragment>
      {data ? <TableHelper array={data.day_book} /> : null}
    </Fragment>
    // <Paper>
    //   {data === null ? (
    //     <SnackBar message={'No data'} state={'warning'} />
    //   ) : null}
    //   <Table>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="right">
    //           {Language[state.locals].account} {Language[state.locals].id}
    //         </TableCell>
    //         <TableCell align="right">{Language[state.locals].name}</TableCell>
    //         <TableCell align="right">
    //           {Language[state.locals].debit} / {Language[state.locals].credit}
    //         </TableCell>
    //         <TableCell align="right">
    //           {Language[state.locals].balance}
    //         </TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data
    //         ? data.day_book.map((item, index) => {
    //             return (
    //               <TableRow key={index}>
    //                 <TableCell align="right">{item.account_id}</TableCell>
    //                 <TableCell align="right">{item.name}</TableCell>
    //                 <TableCell align="right">
    //                   {item.debit
    //                     ? Language[state.locals].debit
    //                     : Language[state.locals].credit}
    //                 </TableCell>
    //                 <TableCell align="right">{item.balance}</TableCell>
    //               </TableRow>
    //             )
    //           })
    //         : null}
    //     </TableBody>
    //   </Table>
    // </Paper>
  )
}

export default DayBook
