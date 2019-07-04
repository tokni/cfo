import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { SET_ACTIVE_COMPANY } from '../../../utils/Query/CompanyQuery'
import {
  withStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  // Button,
} from '@material-ui/core'

const styles = () => ({
  button: {
    display: 'block',
  },
  formControl: {
    minWidth: 320,
  },
  label: {
    color: 'white',
    focus: 'inherit',
  },
})

const SelectCompany = props => {
  const [open, setOpen] = useState(false)
  const [state, dispatch] = useContext(Context)
  const storeActiveCompany = useMutation(SET_ACTIVE_COMPANY)
  const { classes } = props

  const handleChange = event => {
    dispatch({
      type: 'set_company',
      index: event.target.value,
    })

    dispatch({
      type: 'set_accounting_year_index',
      accounting_year_index: 0,
    })

    storeActiveCompany({
      variables: {
        user_id: state.user.id,
        current_company: event.target.value.toString(),
      },
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <form autoComplete="off">
      {/* <Button className={classes.button} onClick={handleOpen} /> */}
      <FormControl className={classes.formControl}>
        <InputLabel focused={false} className={classes.label}>
          {Language[state.locals].choosecompany}
        </InputLabel>

        <Select
          className={classes.label}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={state.company_index}
          onChange={handleChange}
          inputProps={{
            name: 'name',
            id: 'demo-controlled-open-select',
          }}
        >
          {state.companies
            ? state.companies.map((item, index) => {
                return (
                  <MenuItem key={index} value={index}>
                    {item.name}
                  </MenuItem>
                )
              })
            : ''}
        </Select>
      </FormControl>
    </form>
  )
}

SelectCompany.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SelectCompany)
