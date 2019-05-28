import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import { Add } from '../../../Helpers/Constants'
import { useMutation, useSubscription } from 'react-apollo-hooks'
import { TextField } from '@material-ui/core'
import React, { Fragment, useState, useContext } from 'react'
import {
  PUT_ACCOUNT_NUMBERS,
  GET_SUBSCRIP_ACCOUNTS,
} from '../../../utils/Query/AccountQuery'

const AccountNumber = props => {
  const ACCOUNT_NUBER_REGEX = /^[0-9]{4}[-][0-9]{3}[.][0-9]{3}[.][0-9]{1}$/
  const putAccountNumbers = useMutation(PUT_ACCOUNT_NUMBERS)
  const [accountNumber, setAccountNumber] = useState('')
  const [accountNumbers] = useState(Array)
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [state] = useContext(Context)
  const { data } = useSubscription(GET_SUBSCRIP_ACCOUNTS, {
    variables: {
      company_id: state.company.id,
    },
  })

  const handleClose = () => {
    if (state.user !== null) {
      setOpen(!open)
    }
  }

  const cleanup = () => {
    setName('')
    setAccountNumber('')
    accountNumbers.length = 0
  }

  const OnSubmit = e => {
    if (accountNumber !== '' && name !== '') {
      if (accountNumber.match(ACCOUNT_NUBER_REGEX)) {
        data.Account.map(item => {
          return item.id === props.id
            ? item.account_numbers
              ? item.account_numbers.map(numbers => {
                  return accountNumbers.push(numbers)
                })
              : null
            : null
        })

        accountNumbers.push({ name: name, account_number: accountNumber })

        putAccountNumbers({
          variables: {
            id: props.id,
            account_numbers: accountNumbers,
          },
        })
      } else {
        console.log('gjørdi ikki kontu nummar')
      }
    }
    handleClose()
    cleanup()
  }

  return (
    <Fragment>
      <Modal
        Icon={Add}
        title="addaccountnumber"
        submit={OnSubmit}
        close={handleClose}
      >
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label={Language[state.locals].bankname}
          type="text"
          fullWidth
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <TextField
          required
          margin="dense"
          id="name"
          label={Language[state.locals].accountnumber}
          type="text"
          placeholder="xxxx-xxx.xxx.x"
          fullWidth
          onChange={e => {
            setAccountNumber(e.target.value)
          }}
        />
      </Modal>
    </Fragment>
  )
}

export default AccountNumber
