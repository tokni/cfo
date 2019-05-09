import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'
import { green, amber } from '@material-ui/core/colors'

import SnackBarContent from './SnackBarContent'

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
})

const MySnackbarContentWrapper = withStyles(styles1)(SnackBarContent)

const CustomizedSnackbars = props => {
  const [open, setOpen] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={props.state}
          message={props.message}
        />
      </Snackbar>
    </div>
  )
}

CustomizedSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles2)(CustomizedSnackbars)
