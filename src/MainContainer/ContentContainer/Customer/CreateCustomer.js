import AddIcon from '@material-ui/icons/Add'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { useMutation } from 'react-apollo-hooks'
import { POST_CUSTOMER } from '../../../utils/Query/CustomersQuery'
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

const CreateCustomer = props => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const { classes } = props
  const postCustomerMutation = useMutation(POST_CUSTOMER)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setName(null)
    if (state.company !== null) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (name !== null) {
      await postCustomerMutation({
        variables: {
          name,
          company_id: state.company.id,
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
        <AddIcon />
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
          <SnackBar message={'Customer added successfully'} state={'success'} />
        ) : (
          <SnackBar
            message={Language[state.locals].nameisrequired}
            state={'error'}
          />
        )
      ) : null}
    </Fragment>
  )
}

CreateCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateCustomer)
