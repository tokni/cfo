import Context from '../../../Context/Context'
import PropTypes from 'prop-types'
import Modal from '../../../Helpers/Modal'
import React, { Fragment, useState, useContext } from 'react'
import { Add } from '../../../Helpers/Constants'
import { POST_COMPANY } from '../../../utils/Query/CompanyQuery'
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

const CreateCompany = props => {
  let [name, setName] = useState('')
  let [mother_id, setMother_id] = useState(null)
  const createCompanyMutation = useMutation(POST_COMPANY)
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
      <Modal
        Icon={Add}
        title="addcompany"
        text="fill"
        name="addcompany"
        submit={onSubmit}
        close={handleClose}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          variant="outlined"
          label="Company name"
          type="text"
          fullWidth
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <TextField
          margin="dense"
          id="mother_id"
          variant="outlined"
          label="Mother ID"
          type="text"
          fullWidth
          onChange={e => {
            setMother_id(e.target.value)
          }}
        />
      </Modal>
    </Fragment>
  )
}

CreateCompany.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateCompany)
