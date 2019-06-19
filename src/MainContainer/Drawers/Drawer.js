import Context from '../../Context/Context'
import Dashboard from '@material-ui/icons/Dashboard'
import Language from '../../utils/language'
import MailIcon from '@material-ui/icons/Mail'
import { MenuItems, NestedItems } from './MenuItems'
import PropTypes from 'prop-types'
import React, { useContext, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  List,
  Grid,
  Divider,
  Hidden,
  Toolbar,
  AppBar,
  IconButton,
  CssBaseline,
  Collapse,
} from '@material-ui/core'
import { makeStyles, useTheme, withTheme } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const SideDrawer = props => {
  const [state] = useContext(Context)
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = () => {
    return (
      <Fragment>
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
            <ListItemText primary="Starred" name={'Sales'} primary={'Sales'} />
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
      </Fragment>
    )
  }

  return (
    <Grid item lg={3} md={6} sm={6}>
      <div className={classes.root}>
        <CssBaseline>
          {/* only={['md', 'xs', 'sm']} */}
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                C.FO
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="Mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer()}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer()}
              </Drawer>
            </Hidden>
          </nav>
        </CssBaseline>
      </div>
    </Grid>
  )
}

SideDrawer.propTypes = {
  container: PropTypes.object.isRequired,
}

export default SideDrawer
