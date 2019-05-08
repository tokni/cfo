import React, { useContext } from 'react'
import Context from '../../../Context/Context'
//import Table from '@material-ui/core/Table'
import { Grid, Divider, Typography } from '@material-ui/core'
// import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const GetCompany = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context)

  const handleMother = id => {
    return state.companies.map(company => {
      if (company.id === id) {
        console.log('inni her sum tad skal , ', company.name)
        return company.name
      }
      return null
    })
  }

  return (
    <Paper>
      <Grid container sm={12}>
        {state.companies
          ? state.companies.map((item, index) => {
              return (
                <Grid key={index} sm={2} style={{ padding: 30 }}>
                  <Paper style={{ height: 128 }}>
                    <Typography
                      style={{ backgroundColor: '#1100Af', color: '#ffffff' }}
                      align="center"
                      variant="display1"
                      aria-label="Menu"
                      color="inherit"
                    >
                      {item.name}
                    </Typography>
                    <Divider />
                    {/* <Typography
                      align="left"
                      variant="title"
                      style={{ paddingLeft: 12 }}
                    >{`id: ${item.id}`}</Typography> */}
                    <Typography
                      align="left"
                      variant="body2"
                      style={{ paddingLeft: 12 }}
                    >
                      {item.mother_id
                        ? `Mother Company: ${handleMother(item.mother_id)}`
                        : null}
                    </Typography>
                  </Paper>
                </Grid>
              )
            })
          : console.log('getCompany not loading, state.companies undefined')}
      </Grid>
    </Paper>
    // <Paper>
    //  <Table>
    //    <TableHead>
    //      <TableRow>
    //        <TableCell>Id</TableCell>
    //        {/* <TableCell align="right">Mother Id</TableCell>
    //        <TableCell align="right">User Id</TableCell> */}
    //        <TableCell align="center">Name</TableCell>
    //      </TableRow>
    //    </TableHead>
    //    <TableBody>
    //      {state.companies
    //        ? state.companies.map((item, index) => {
    //            return (
    //              <TableRow
    //                key={index}
    //              >
    //                <TableCell component="th" scope="row">
    //                  {item.id}
    //                </TableCell>
    //                {/* <TableCell align="right">{item.mother_id}</TableCell>
    //                <TableCell align="right">{item.user_id}</TableCell> */}
    //                <TableCell align="center">{item.name}</TableCell>
    //              </TableRow>
    //            )
    //          })
    //        : console.log('getCompany not loading, state.companies undefined')}
    //    </TableBody>
    //  </Table>
    //</Paper>
  )
}

export default GetCompany
