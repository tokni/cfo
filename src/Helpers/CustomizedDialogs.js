import React, { useState, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import TableHelper from './TableHelper'
import Language from '../utils/language'
import Context from '../Context/Context'

const styles = theme => ({
  root: {
    margin: 0,
  },
  center: {
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="h6" className={classes.center}>
        {children}
      </Typography>
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
  },
}))(MuiDialogActions)

const CustomizedDialogs = props => {
  const [open] = useState(true)
  const [state] = useContext(Context)

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="100%"
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {props.title || 'Customized Dialog'}
        </DialogTitle>
        <DialogContent dividers>
          <TableHelper array={props.items} />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            {Language[state.locals].close || 'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CustomizedDialogs
