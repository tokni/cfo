import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { POST_VENDOR } from '../../../utils/Query/VendorQuery'
import { setTimeout } from 'timers'
import { useMutation } from 'react-apollo-hooks'
import { withStyles, TextField } from '@material-ui/core'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const CreateVendor = props => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const createVendorMutation = useMutation(POST_VENDOR)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setName('')

    if (state.company) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = e => {
    if (name !== '') {
      createVendorMutation({
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
      <Modal
        title="addvendor"
        text="fillformtoaddvendor"
        submit={onSubmit}
        close={handleClose}
      >
        <TextField
          focus
          margin="dense"
          id="name"
          label={Language[state.locals].name}
          value={name}
          type="text"
          fullWidth
          onChange={e => {
            setName(e.target.value)
          }}
        />
      </Modal>

      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar message={'Vendor created successfully'} state={'success'} />
        ) : (
          <SnackBar message={'Fill all parameters'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

CreateVendor.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateVendor)
