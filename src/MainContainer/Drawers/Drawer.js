import Context from '../../Context/Context'
import Dashboard from '@material-ui/icons/Dashboard'
import Language from '../../utils/language'
import MailIcon from '@material-ui/icons/Mail'
import { MenuItems, NestedItems, TransactionsItems, CompanyItems } from './MenuItems'
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
import { makeStyles, useTheme } from '@material-ui/core/styles'
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
  foldable: {
    backgroundColor: '#dddddd',
  },
  nested: {
    paddingLeft: '3em',
    backgroundColor: '#eeeeee',
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
  const [open, setOpen] = useState({})

  const handleClick = name => {
    setOpen({ ...open, [name]: !open[name] })
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const NestedMenu = (name, list) => {
    return (
      <Fragment>
        <ListItem
          className={classes.foldable}
          button
          onClick={handleClick.bind(this, name)}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary={name} name={name} />
          {open[name] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open[name]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {list().map((text, index) => (
              <Link
                key={index}
                to={`/${text
                  .split(' ')
                  .join('')
                  .toLowerCase()}`}
              >
                <ListItem button key={index} className={classes.nested}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <Dashboard /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
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
      </Fragment>
    )
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
        {state.company ? (
          <List component="div" disablePadding>
            {NestedMenu(Language[state.locals].company, CompanyItems)}
          </List>
        ) : null}
        {state.company ? (
          <List component="div" disablePadding>
            {NestedMenu(Language[state.locals].transactions, TransactionsItems)}
          </List>
        ) : null}
        {state.company ? (
          <List component="div" disablePadding>
            {NestedMenu(Language[state.locals].sales, NestedItems)}
          </List>
        ) : null}
      </Fragment>
    )
  }

  return (
    <Grid item lg={3} md={6} sm={6}>
      <div className={classes.root}>
        <CssBaseline>
          {/* only={['md', 'xs', 'sm']} */}
          {/* <AppBar position="fixed" className={classes.appBar}>
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
          </AppBar> */}
          <Hidden only={['lg', 'xl', 'md']}>
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
          </Hidden>
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
