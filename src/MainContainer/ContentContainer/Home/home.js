import React, { useContext, Fragment } from 'react'
import Context from '../../../Context/Context'
import { useQuery } from 'react-apollo-hooks'
import { GET_COMPANY } from '../../../utils/query'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Home = () => {
  const { data } = useQuery(GET_COMPANY, {
    suspend: false,
  })

  const [state, dispatch] = useContext(Context)

  const companiesLoader = () => {
    dispatch({
      type: 'change_company',
      companies: data.Company,
    })
  }

  const companyHandler = () => {
    dispatch({
      type: 'set_company',
      index: 0,
    })
  }

  return (
    <Fragment>
      <h1>Hello mr.{state.user ? state.user.first_name + ' ' + state.user.last_name : ""}</h1>
      <p>Bergur & Kristmund</p>
      <p>
        current company:{' '}
      </p>


      <p>
        {state.user ? state.user.name : console.log('err"3efdfor')}
      </p>

      <button onClick={companiesLoader}>load companies</button>
      <button onClick={companyHandler}>get company</button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">mother_id</TableCell>
              <TableCell align="right">user id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.companies
              ? state.companies.map(item => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {item.user_id}
                      </TableCell>
                      <TableCell align="right">{item.mother_id}</TableCell>
                      <TableCell align="right">{item.id}</TableCell>
                      <TableCell align="right">{item.name}</TableCell>
                    </TableRow>
                  )
                })
              : console.log('error')}
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  )
}

export default Home
