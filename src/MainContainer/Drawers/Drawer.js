import Context from '../../Context/Context'
import Dashboard from '@material-ui/icons/Dashboard'
import Language from '../../utils/language'
import MailIcon from '@material-ui/icons/Mail'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  Grid,
  Divider,
  CssBaseline,
} from '@material-ui/core'

const drawerWidth = 240

const styles = theme => ({
  roottop: {
    flexGrow: 1,
  },
  growtop: {
    flexGrow: 1,
  },
  menuButtontop: {
    marginLeft: -12,
    marginRight: 20,
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
})

const SideDrawer = props => {
  const [state] = useContext(Context)

  const { classes } = props

  return (
    <Grid lg={3} md={6} sm={6}>
      <div className={classes.root}>
        <CssBaseline>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            style={{ backgroundColor: '#1100ee' }}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div
              className={classes.toolbar}
              style={{ backgroundColor: 'rgb(63, 81, 181)' }}
            />
            <List style={{ backgroundColor: '#DDDDDD' }}>
              {[
                Language['en'].overview,
                Language['en'].invoice,
                Language['en'].bills,
                Language['en'].transactions,
                Language['en'].accounts,
                Language['en'].companies,
                Language['en'].addcompany,
                Language['en'].daybook,
              ].map((text, index) => (
                <Link
                  key={index}
                  to={`/${text
                    .split(' ')
                    .join('')
                    .toLowerCase()}`}
                >
                  <ListItem button key={index}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <Dashboard /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        Language[state.locals][
                          text
                            .toLowerCase()
                            .split(' ')
                            .join('')
                        ]
                      }
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </Drawer>
        </CssBaseline>
      </div>
    </Grid>
  )
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SideDrawer)
