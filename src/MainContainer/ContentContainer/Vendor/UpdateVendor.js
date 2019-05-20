import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { Edit } from '../../../Helpers/Constants'
import { PUT_VENDOR } from '../../../utils/Query/VendorQuery'
import { setTimeout } from 'timers'
import { useMutation } from 'react-apollo-hooks'
import {
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Fab,
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

const UpdateVendor = props => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(props.name)

  const { classes } = props
  const updateVendortMutation = useMutation(PUT_VENDOR)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = props => {
    if (state.company) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (name !== '') {
      updateVendortMutation({
        variables: {
          id: props.id,
          company_id: state.company.id,
          name,
        },
      })
      setTimeout(() => {
        setMsgSuccess(true)
        setMsg(true)
      }, 1000)
    } else {
      setTimeout(() => {
        setMsgSuccess(false)
        setMsg(true)
      }, 1000)
    }
    handleClose()
  }

  return (
    <Fragment>
      <Fab
        onClick={handleClose}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        <Edit />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {Language[state.locals].updatevendor}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {Language[state.locals].fillformtoupdatevendor}
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="description"
            value={name || ''}
            label={Language[state.locals].name}
            type="text"
            fullWidth
            onChange={e => {
              setName(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {Language[state.locals].cancel}
          </Button>
          <Button onClick={onSubmit} color="primary">
            {Language[state.locals].update}
          </Button>
        </DialogActions>
      </Dialog>
      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar message={'Vendor updated successfully'} state={'success'} />
        ) : (
          <SnackBar message={'Fill all parameters'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

UpdateVendor.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UpdateVendor)
