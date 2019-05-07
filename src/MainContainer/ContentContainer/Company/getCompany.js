import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'


const GetCompany = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context)

  return (
<Paper>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Id</TableCell>
        {/* <TableCell align="right">Mother Id</TableCell>
        <TableCell align="right">User Id</TableCell> */}
        <TableCell align="center">Name</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {state.companies
        ? state.companies.map((item, index) => {
            return (
              <TableRow
                key={index}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                {/* <TableCell align="right">{item.mother_id}</TableCell>
                <TableCell align="right">{item.user_id}</TableCell> */}
                <TableCell align="center">{item.name}</TableCell>
              </TableRow>
            )
          })
        : console.log('getCompany not loading, state.companies undefined')}
    </TableBody>
  </Table>
</Paper>

  )
  
  
  
}

export default GetCompany
