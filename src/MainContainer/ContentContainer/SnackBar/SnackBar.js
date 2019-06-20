import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'
import SnackBarContent from './SnackBarContent'

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
})

const MySnackbarContentWrapper = SnackBarContent

const CustomizedSnackbars = props => {
  const [open, setOpen] = useState(true)

  const handleClose = reason => {
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
