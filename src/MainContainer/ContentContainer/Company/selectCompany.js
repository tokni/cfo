import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import Context from '../../../Context/Context'


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})



const SelectCompany = props => {
 
  const [state, dispatch] = useContext(Context)
  const { classes } = this.props;
 
  const  handleListItemClick = (index) => {
    dispatch({
        type: 'set_company', index
    })
  };
  
    return (
        <div className={classes.root}>
        <List component="nav">
          
          {
              state.companies.map(item => {
                return (
                    <ListItem
                    button
                    selected={state.currentIndex === 0}
                    onClick={handleListItemClick(0)}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                )
              })
          }
        
        </List>
      </div>
    );
  }
  
  SelectCompany.propTypes = {
    classes: PropTypes.object.isRequired,
  }
  
  export default withStyles(styles)(SelectCompany)
