import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import Dashboard from '@material-ui/icons/Dashboard'
import Language from '../../utils/language'
import { Link } from 'react-router-dom'
import Context from '../../Context/Context'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}

const SideDrawer = props => {
  const [state] = useContext(Context)
  const [left, setLeft] = useState(true)

  const toggleDrawer = (side, open) => () => {
    setLeft(open)
  }

  const handleOnClick = () => {
    // this.forceUpdate()
  }

  const { classes } = props

  const sideList = (
    <div className={classes.list}>
      {/* <Router> */}
      <List>
        {[
          Language['en'].overview,
          Language['en'].invoice,
          Language['en'].bills,
          Language['en'].transactions,
          Language['en'].accounts,
          Language['en'].addcompany,
        ].map((text, index) => (
          // <Link to={text === 'Accounts' ? '/db' : `/${text}`}>
          <Link key={index} to={`/${text.split(' ').join('')}`}>
            <ListItem button key={index} onClick={handleOnClick}>
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
      {/* </Router> */}
      <Divider />
      {/* <List>
        {[
          Language[state.locals].sales,
          Language[state.locals].customers,
          Language[state.locals].products,
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  )

  return (
    <div>
      <Drawer open={left} onClose={toggleDrawer('left', false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          {sideList}
        </div>
      </Drawer>
    </div>
  )
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SideDrawer)
