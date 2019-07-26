import Company from '../Company/GetCompany'
import Context from '../../../Context/Context'
import Grid from '@material-ui/core/Grid'
import {
  Paper,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import React, { useContext, Fragment } from 'react'
import { SET_LOCALS } from '../../../utils/Query/PreferenceQuery'
import { useMutation } from 'react-apollo-hooks'
import Balance from '../Balance/Balance'
import CreateAccountingYear from '../AccountingYear/CreateAccountingYear'
import Language from '../../../utils/language'
const Home = () => {
  const [state, dispatch] = useContext(Context)
  const MutateLocals = useMutation(SET_LOCALS)

  const handleClicker = locals => {
    MutateLocals({
      variables: {
        user_id: state.user ? state.user.id : null,
        locals: locals,
      },
    })

    dispatch({
      type: 'set_locals',
      locals: locals,
    })
  }


  const handleChange = idx => {
    dispatch({
      type: 'set_accounting_year_index',
      accounting_year_index: idx,
    })
  }

  const AccountingYear = () => (
    <Grid item lg={12} xl={12} xs={12} md={12} sm={12}>
      <Paper>
        <Typography
          variant="h4"
          style={{
            textAlign: 'center',
            backgroundColor: '#EEEEEE',
            borderBottom: 'solid 1px #888888',
          }}
        >
          {Language[state.locals].accountingyear}
        </Typography>
        <Grid container>
          <Grid item lg={4} xl={4} xs={12} md={6} sm={12}>
            <Typography style={{ padding: '1em' }}>
              {Language[state.locals].accuntingyeardetailed}
            </Typography>
            <CreateAccountingYear />
          </Grid>
          <Grid item lg={5} xl={5} xs={12} md={6} sm={12}>
            <List style={{ width: '90%', maxHeight: '12em', overflow: 'auto' }}>
              {state.accounting_year
                ? state.accounting_year.map((item, index) => {
                    return (
                      <ListItem
                        style={
                          state.accounting_year_index === index
                            ? { backgroundColor: 'rgba(63, 81, 181, 0.13)' }
                            : null
                        }
                        button
                        key={index}
                        onClick={handleChange.bind(this, index)}
                      >
                        <ListItemText style={{ color: 'inherit' }}>
                          {item.name}
                        </ListItemText>
                        <ListItemText
                          style={{ textAlign: 'right', color: 'inherit' }}
                        >
                          {'(' + item.from + ' - ' + item.to + ')'}
                        </ListItemText>
                      </ListItem>
                    )
                  })
                : null}
            </List>
          </Grid>
          <Grid item lg={3} xl={3} xs={12} md={12} sm={12}>
            <Typography variant="h5">
              {state.accounting_year && state.accounting_year[0]
                ? state.accounting_year[state.accounting_year_index].name
                : null}
            </Typography>
            <Typography>
              {Language[state.locals].from + ' '}
              {state.accounting_year && state.accounting_year[0]
                ? state.accounting_year[state.accounting_year_index].from
                : null}
            </Typography>
            <Typography>
              {Language[state.locals].to + ' '}
              {state.accounting_year && state.accounting_year[0]
                ? state.accounting_year[state.accounting_year_index].to
                : null}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )

  return (
    <Fragment>
      <Grid item container spacing={8} lg={12} md={12}>
        <Grid style={{ padding: '3em' }} item lg={12} md={12} sm={12}>
          <Button
            variant="outlined"
            color="primary"
            name="en"
            onClick={handleClicker.bind(this, 'en')}
          >
            EN
          </Button>
          <Button
            variant="outlined"
            color="primary"
            name="fo"
            onClick={handleClicker.bind(this, 'fo')}
          >
            FO
          </Button>

          <Button
            variant="outlined"
            color="primary"
            name="de"
            onClick={handleClicker.bind(this, 'de')}
          >
            DE
          </Button>
        </Grid>
        <AccountingYear />
        <Grid
          item
          lg={6}
          md={6}
          sm={11}
          style={{ maxHeight: '56em', overflowY: 'scroll' }}
        >
          <Company />
        </Grid>
        <Grid
          style={{ paddingTop: 8, overflowX: 'auto' }}
          item
          lg={6}
          md={6}
          sm={12}
        >
          <Paper>
            <Balance />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Home
