import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import Modal from '../../../Helpers/Modal'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useContext } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { Add } from '../../../Helpers/Constants'
import { useMutation } from 'react-apollo-hooks'
import { POST_TAX } from '../../../utils/Query/TaxQuery'
import { withStyles, TextField } from '@material-ui/core'

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const CreateTax = props => {
  const [open, setOpen] = useState(false)
  const [taxName, setTaxName] = useState('')
  const [taxPercentage, setTaxPercentage] = useState('')

  const postTaxMutation = useMutation(POST_TAX)
  const [state] = useContext(Context)
  const [msg, setMsg] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(true)

  const handleClose = () => {
    setTaxName('')
    setTaxPercentage('')

    if (state.company !== null) {
      setOpen(!open)
    }
    setMsg(false)
  }

  const onSubmit = async e => {
    if (taxName !== '' && taxPercentage !== '') {
      const tax_per =
        parseFloat(taxPercentage, 10) >= 1
          ? parseFloat(taxPercentage, 10) / 100
          : parseFloat(taxPercentage, 10)
      await postTaxMutation({
        variables: {
          company_id: state.company.id,
          name: taxName,
          tax_percentage: tax_per,
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
        title="addtax"
        text="fillformtoaddtax"
        name="addtax"
        submit={onSubmit}
        close={handleClose}
      >
        {/* name FIELD */}

        <TextField
          autoFocus
          margin="dense"
          id="tax"
          value={taxName || ''}
          label={Language[state.locals].tax || ''}
          type="text"
          fullWidth
          onChange={e => {
            setTaxName(e.target.value)
          }}
        />
        {/* percentage field */}
        <TextField
          margin="dense"
          id="taxPercentage"
          value={taxPercentage || ''}
          label={Language[state.locals].taxpercentage || '%'}
          type="number"
          fullWidth
          onChange={e => {
            setTaxPercentage(e.target.value)
          }}
        />
      </Modal>
      {msg === true ? (
        msg === true && msgSuccess === true ? (
          <SnackBar
            message={
              Language[state.locals].tax +
              ' ' +
              Language[state.locals].addedsuccesfully
            }
            state={'success'}
          />
        ) : (
          <SnackBar
            message={Language[state.locals].fieldsarerequired}
            state={'error'}
          />
        )
      ) : null}
    </Fragment>
  )
}

CreateTax.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateTax)
