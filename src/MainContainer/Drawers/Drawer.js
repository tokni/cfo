import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Dashboard from '@material-ui/icons/Dashboard'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}

class SideDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      left: true,
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }

  handleOnClick = () => {
    this.forceUpdate()
  }

  render() {
    const { classes } = this.props
    // this.toggleDrawer('left', true)
    const sideList = (
      <div className={classes.list}>
        {/* <Router> */}
        <List>
          {['Overview', 'Invoice', 'Bills', 'Transactions', 'Accounts'].map(
            (text, index) => (
              // <Link to={text === 'Accounts' ? '/db' : `/${text}`}>
              <Link to={`/${text}`}>
                <ListItem
                  button
                  key={text}
                  onClick={this.handleOnClick.bind(this)}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <Dashboard /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            )
          )}
        </List>
        {/* </Router> */}
        <Divider />
        <List>
          {['Sales', 'Customers', 'Products'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    )

    // const fullList = (
    //   <div className={classes.fullList}>
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>
    //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //           </ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>
    //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //           </ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // )

    return (
      <div>
        <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  }
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SideDrawer)
