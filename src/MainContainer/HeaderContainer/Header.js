import Context from '../../Context/Context'
import Language from '../../utils/language'
import PropTypes from 'prop-types'
import SelectCompany from '../ContentContainer/Company/SelectCompany'
import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, AppBar, Toolbar } from '@material-ui/core'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

const Header = props => {
  const auth = props.auth
 
  const [state] = useContext(Context)

  const login = () => {
     auth.login()
     auth.handleAuthentication()
     
  }

  const logout = () => {
    auth.logout()
  }

  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            CFO
          </Typography>
          <SelectCompany />
          {localStorage.getItem('sub') ? (
            <Button onClick={logout} color="inherit">
              {Language[state.locals].logout}
            </Button>
          ) : (
            <Button onClick={login} color="inherit">
              {Language[state.locals].login}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(Header)
