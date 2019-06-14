import Context from '../Context/Context'
import Language from '../utils/language'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import {
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Fab,
  Tooltip,
} from '@material-ui/core'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const Modal = (props, { children }) => {
  const [open, setOpen] = useState(false)
  const { classes } = props
  const [state] = useContext(Context)

  const handleClose = () => {
    props.close()
    setOpen(!open)
  }

  const handleSubmit = () => {
    props.submit()
    setOpen(!open)
  }

  return (
    <Fragment>
      <Tooltip title={props.tooltipTitle || ''}>
        <Fab
          onClick={handleClose}
          name={props.name}
          color="primary"
          // aria-label="Add"
          className={classes.fab}
        >
          <props.Icon />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {Language[state.locals][props.title] || 'Modal Title...'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {Language[state.locals][props.text] || null}
          </DialogContentText>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button name="cancel" onClick={handleClose} color="primary">
            {Language[state.locals].cancel}
          </Button>
          <Button name="submit" onClick={handleSubmit} color="primary">
            {Language[state.locals].accept}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
}

Modal.propTypes = {
  children: PropTypes.any,
}

export default withStyles(styles)(Modal)
