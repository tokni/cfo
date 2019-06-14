import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { Add } from '../../../Helpers/Constants'
import { useMutation } from 'react-apollo-hooks'
import { POST_PRODUCT } from '../../../utils/Query/ProductQuery'
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

const CreateProduct = props => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const postProductMutation = useMutation(POST_PRODUCT)
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
    if (name !== null) {
      await postProductMutation({
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
        Icon={Add}
        title="addproduct"
        text="fillformtoaddproduct"
        submit={onSubmit}
        name="addproduct"
        close={handleClose}
      >
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
      </Modal>
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

CreateProduct.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateProduct)
