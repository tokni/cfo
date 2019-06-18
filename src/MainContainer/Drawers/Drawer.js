import Context from '../../Context/Context'
import Dashboard from '@material-ui/icons/Dashboard'
import Language from '../../utils/language'
import MailIcon from '@material-ui/icons/Mail'
import { MenuItems, NestedItems } from './MenuItems'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
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
  Collapse,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const drawerWidth = 240

const styles = theme => ({
  // nested: {
  //   paddingLeft: theme.spacing(4),
  // },
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
  nested: {
    paddingLeft: '4em',
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

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Grid item lg={3} md={6} sm={6}>
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
              {MenuItems().map((text, index) => (
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
                      name={text
                        .split(' ')
                        .join('')
                        .toLowerCase()}
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
            <List component="div" disablePadding>
              <ListItem button onClick={handleClick} button>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText
                  primary="Starred"
                  name={'Sales'}
                  primary={'Sales'}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {NestedItems().map((text, index) => (
                    <Link
                      key={index}
                      to={`/${text
                        .split(' ')
                        .join('')
                        .toLowerCase()}`}
                    >
                      <ListItem
                        button
                        key={index}
                        button
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          {index % 2 === 0 ? <Dashboard /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText
                          primary="Starred"
                          onClick={handleClick}
                          name={text
                            .split(' ')
                            .join('')
                            .toLowerCase()}
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
              </Collapse>
            </List>
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
