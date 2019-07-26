import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext, useRef } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { Add } from '../../../Helpers/Constants'
import { POST_ACCOUNT } from '../../../utils/Query/AccountQuery'
import { setTimeout } from 'timers'
import { useMutation } from 'react-apollo-hooks'
import { withStyles, TextField, MenuItem } from '@material-ui/core'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const CreateAccount = props => {
  const refType = useRef()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState(0)
  const [debit, setDebit] = useState(-1)
  const [balance, setBalance] = useState(0)
  const createAccountMutation = useMutation(POST_ACCOUNT)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setName(null)
    setBalance(0)
    setType(0)
    setDebit(-1)
    if (state.company !== null) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = e => {
    if (name !== null && type !== 0) {
      createAccountMutation({
        variables: {
          name,
          balance,
          type,
          debit,
          company_id: state.company.id,
        },
      })
      setTimeout(() => {
        setMsgSuccess(true)
        setMsg(true)
      }, 1000)
    } else {
      refType.current.focus()
      setTimeout(() => {
        setMsgSuccess(false)
        setMsg(true)
      }, 1000)
    }
    // handleClose()
  }

  return (
    <Fragment>
      <Modal
        Icon={Add}
        title="addaccount"
        text="fillformtoaddaccount"
        name="addaccount"
        submit={onSubmit}
        close={handleClose}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          variant="outlined"
          label={Language[state.locals].name}
          type="text"
          fullWidth
          onChange={e => {
            setName(e.target.value)
          }}
        />{' '}
        <TextField
          margin="dense"
          id="balance"
          label="Balance"
          variant="outlined"
          value={balance}
          type="number"
          fullWidth
          onChange={e => {
            setBalance(e.target.value)
          }}
        />
        <TextField
          select
          margin="dense"
          variant="outlined"
          id="debit"
          label="Debit / Credit"
          fullWidth
          required
          value={debit}
          onChange={e => {
            setDebit(e.target.value)
          }}
        >
          <option style={{ textAlign: 'center' }} disabled key={-1} value={-1}>
            {Language[state.locals].choosetype}
          </option>
          <MenuItem key={1} value={true}>
            Debit
          </MenuItem>
          <MenuItem key={2} value={false}>
            Credit
          </MenuItem>
        </TextField>
        <TextField
          ref={refType}
          select
          variant="outlined"
          margin="dense"
          id="type"
          required
          label={Language[state.locals].type || 'Type'}
          fullWidth
          value={type}
          onChange={e => {
            setType(e.target.value)
          }}
        >
          <option style={{ textAlign: 'center' }} disabled key={0} value={0}>
            {Language[state.locals].choosetype}
          </option>
          <hr />
          <MenuItem key={1} value={1}>
            {Language[state.locals].sales}
          </MenuItem>
          <MenuItem key={2} value={2}>
            {Language[state.locals].assets}
          </MenuItem>
          <MenuItem key={3} value={3}>
            {Language[state.locals].debts}
          </MenuItem>
          <MenuItem key={4} value={4}>
            {Language[state.locals].contributionmargin}
          </MenuItem>
          <MenuItem key={5} value={5}>
            {Language[state.locals].earningscontributions}
          </MenuItem>
          <MenuItem key={6} value={6}>
            {Language[state.locals].wage}
          </MenuItem>
          <MenuItem key={7} value={7}>
            {Language[state.locals].other}
          </MenuItem>
        </TextField>
      </Modal>
      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar message={'Account added successfully'} state={'success'} />
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

CreateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateAccount)
