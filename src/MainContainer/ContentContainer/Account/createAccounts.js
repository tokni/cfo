// import React, { useState } from 'react'
// import { createAccount, GET_COMPANY } from '../../../utils/query'
// import { useMutation, useQuery } from 'react-apollo-hooks'

// const CreateAccounts = () => {
//   let [name, setName] = useState('')
//   let [debit, setDebit] = useState('')
//   let [balance, setBalance] = useState('')

//   const createAccountMutation = useMutation(createAccount)
//   return (
//     <div>
//       <form
//         onSubmit={e => {
//           e.preventDefault()
//           createAccountMutation({
//             variables: {
//               name,
//               balance,
//               debit,
//               company_id: 'fd20c139-c5c9-4922-bb7b-5f0fdeba9f03',
//             },
//           })
//         }}
//       >
//         {console.log('AccountMutate', createAccountMutation)}
//         <div>
//           <label>Name</label>
//           <input onChange={e => setName(e.target.value)} />
//         </div>
//         <div>
//           <label>Type</label>
//           <select onChange={e => setDebit(e.target.value)}>
//             <option value="false">Credit</option>
//             <option value="true">Debit</option>
//           </select>
//         </div>
//         <div>
//           <label>Balance</label>
//           <input onChange={e => setBalance(e.target.value)} />
//         </div>
//         <button type="submit">Add Account</button>
//       </form>
//     </div>
//   )
// }
// export default CreateAccounts

import React, { Fragment, useState, useContext } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { createAccount, GET_COMPANY } from '../../../utils/query'
import { useMutation, useQuery } from 'react-apollo-hooks'
import Context from '../../../Context/Context'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

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
  const [open, setOpen] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [name, setName] = useState('')
  const [debit, setDebit] = useState(true)
  const [balance, setBalance] = useState(0)
  const { classes } = props
  const createAccountMutation = useMutation(createAccount)
  const [state, dispatch] = useContext(Context)

  const handleClose = () => {
    setName('')
    setBalance(0)
    setDebit(true)
    if (state.company !== null) {
      setOpen(!open)
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    createAccountMutation({
      variables: {
        name,
        balance,
        debit,
        company_id: state.company.id,
      },
    })
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
        <DialogTitle id="form-dialog-title">Add Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill this form to add an account
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Account name"
            type="text"
            fullWidth
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="balance"
            label="Balance"
            value={balance}
            type="number"
            fullWidth
            onChange={e => {
              setBalance(e.target.value)
            }}
          />
          <TextField
            autoFocus
            select
            margin="dense"
            id="debit"
            label="Debit / Credit"
            // type="text"
            fullWidth
            value={debit}
            onChange={e => {
              setDebit(e.target.value)
            }}
          >
            <option key={1} value={true}>
              Debit
            </option>
            <option key={2} value={false}>
              Credit
            </option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            {console.log('name is: ', name)}
          </Button>
          <Button onClick={onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

CreateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateAccount)
