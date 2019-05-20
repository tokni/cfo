import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { Edit } from '../../../Helpers/Constants'
import { useMutation } from 'react-apollo-hooks'
import { PUT_PRODUCT } from '../../../utils/Query/ProductQuery'
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

const UpdateProduct = props => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(props.name)
  const { classes } = props
  const putProductMutation = useMutation(PUT_PRODUCT)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    if (state.company !== null) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = async e => {
    if (name !== null) {
      await putProductMutation({
        variables: {
          name,
          company_id: state.company.id,
          id: props.id,
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
          {Language[state.locals].addproduct}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {Language[state.locals].fillformtoaddproduct}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={name}
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
            {Language[state.locals].add}
          </Button>
        </DialogActions>
      </Dialog>
      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar message={'Account added successfully'} state={'success'} />
        ) : (
          <SnackBar message={'Name is required'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

UpdateProduct.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UpdateProduct)
