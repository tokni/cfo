import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import { SET_ACTIVE_COMPANY } from '../../../utils/Query/CompanyQuery'
import { useMutation } from 'react-apollo-hooks'
import { Grid, Divider, Typography, Paper } from '@material-ui/core'
const GetCompany = () => {
  const [state, dispatch] = useContext(Context)
  const storeActiveCompany = useMutation(SET_ACTIVE_COMPANY)

  const handleMother = id => {
    return state.companies.map(company => {
      if (company.id === id) {
        return company.name
      }
      return null
    })
  }

  const clickHandler = index => {
    dispatch({
      type: 'set_company',
      index: index,
    })

    try{

      storeActiveCompany({
        variables: {
        user_id: state.user.id,
        current_company: index.toString(),
      },
    })
  }catch(e){
    console.log(`Error: ${e.error}`)
  }
  }

  return (
    <Paper>
      <Grid item container xl={12} lg={12} md={6} sm={4}>
        {state.companies
          ? state.companies.map((item, index) => {
              return (
                <Grid
                  item
                  key={index}
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  style={{ padding: '2em' }}
                >
                  <Paper
                    style={{
                      height: '8em',
                      textAlign: 'center',
                      width: '8em',
                    }}
                    onClick={clickHandler.bind(this, index)}
                  >
                    <Typography
                      style={
                        parseInt(index) === parseInt(state.company_index)
                          ? {
                              backgroundColor: '#11DF32',
                              textAlign: 'center',
                              color: '#ffffff',
                              fontWeight: 'bolder',
                            }
                          : {
                              textAlign: 'center',
                              backgroundColor: '#1100Af',
                              color: '#ffffff',
                            }
                      }
                      align="center"
                      variant="title"
                      // aria-label="Menu"
                      color="inherit"
                    >
                      {item.name}
                    </Typography>
                    <Divider />
                    <Typography
                      align="left"
                      variant="body1"
                      style={{ paddingLeft: '2em' }}
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
