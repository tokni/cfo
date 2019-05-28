import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { Add } from '../../../Helpers/Constants'
import { useMutation } from 'react-apollo-hooks'
import { PUT_TAX } from '../../../utils/Query/TaxQuery'
import { withStyles, TextField } from '@material-ui/core'

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const UpdateTax = props => {
  const [open, setOpen] = useState(false)
  const [taxName, setTaxName] = useState('')
  const [taxPercentage, setTaxPercentage] = useState('')

  const postTaxMutation = useMutation(PUT_TAX)
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
    if (taxName !== '' && taxPercentage !== '') {
      await postTaxMutation({
        variables: {
          company_id: state.company.id,
          name: taxName,
          tax_percentage: taxPercentage,
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
        title="updatetax"
        text="fillformtoupdatetax"
        submit={onSubmit}
        close={handleClose}
      >
        {/* name FIELD */}

        <TextField
          autoFocus
          margin="dense"
          id="tax"
          select
          value={taxName || ''}
          label={Language[state.locals].tax || ''}
          type="text"
          fullWidth
          onChange={e => {setTaxName(e.target.value)}}
        >
        </TextField>
        {/* percentage field */}
        <TextField
          autoFocus
          margin="dense"
          id="taxPercentage"
          select
          value={taxPercentage || ''}
          label={Language[state.locals].taxpercentage || ''}
          type="text"
          fullWidth
          onChange={e => {setTaxPercentage(e.target.value)}}
        >
        </TextField>
      </Modal>
      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar
            message={Language[state.locals].tax + Language[state.locals].updatedsuccesfully}
            state={'success'}
          />
        ) : (
          <SnackBar message={Language[state.locals].fieldsarerequired} state={'error'} />
        )
      ) : null}
    </Fragment>
  )
}

UpdateTax.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UpdateTax)
