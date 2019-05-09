import AddIcon from '@material-ui/icons/Add'
import Context from '../../../Context/Context'
import Fab from '@material-ui/core/Fab'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import { CREATE_COMPANY } from '../../../utils/query'
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

const CreateCompany = props => {
  let [name, setName] = useState('')
  let [mother_id, setMother_id] = useState(null)
  const { classes } = props
  const createCompanyMutation = useMutation(CREATE_COMPANY)
  const [state] = useContext(Context)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setName('')
    setMother_id(null)
    if (state.user !== null) {
      setOpen(!open)
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    if (name !== '') {
      createCompanyMutation({
        variables: {
          name,
          mother_id,
          user_id: state.user.id,
        },
      })
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
        <DialogTitle id="form-dialog-title">Add Company</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill this form to add a company</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Company name"
            type="text"
            fullWidth
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="mother_id"
            label="Mother ID"
            type="text"
            fullWidth
            onChange={e => {
              setMother_id(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

CreateCompany.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateCompany)
