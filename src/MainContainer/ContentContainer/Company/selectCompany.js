import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../../../Context/Context'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    display: 'block',
  },
  formControl: {
    minWidth: 320,
  },
  label: {
    color: 'inherit',
  },
})

const SelectCompany = props => {
  const [open, setOpen] = useState(false)
  const [state, dispatch] = useContext(Context)
  const [value, setValue] = useState(0)

  const { classes } = props

  const handleChange = event => {
    setValue(event.target.value)

    dispatch({
      type: 'set_company',
      index: event.target.value,
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
      <Button className={classes.button} onClick={handleOpen} />
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Choose company</InputLabel>

        <Select className={classes.label}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
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
