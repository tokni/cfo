import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import { Grid, Divider, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const GetCompany = () => {
  const [state] = useContext(Context)

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
                <Grid key={index} sm={3} style={{ padding: 30 }}>
                  <Paper style={{ height: 128 }}>
                    <Typography
                      style={{ backgroundColor: '#1100Af', color: '#ffffff' }}
                      align="center"
                      variant="title"
                      aria-label="Menu"
                      color="inherit"
                    >
                      {item.name}
                    </Typography>
                    <Divider />
                    <Typography
                      align="left"
                      variant="body1"
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
  )
}

export default GetCompany
