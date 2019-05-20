import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { POST_EXPENSE } from '../../../utils/Query/ExpenseQuery'
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

const CreateExpense = props => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const createExpenseMutation = useMutation(POST_EXPENSE)
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
      createExpenseMutation({
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
        title="addexpense"
        text="fillformtoupdateexpense"
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
          <SnackBar
            message={'Expense created successfully'}
            state={'success'}
          />
        ) : (
          <SnackBar message={'Fill all parameters'} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

CreateExpense.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateExpense)
