import React, { useContext, Fragment, useState } from 'react'
import Language from '../utils/language'
import PropTypes from 'prop-types'
import {
  withStyles,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Tooltip,
  Typography,
  TableSortLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
  TableBody,
  FormControlLabel,
  Input,
  Switch,
  Fab,
  TextField,
} from '@material-ui/core'
import { DeleteIcon } from '../Helpers/Constants'
import Context from '../Context/Context'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

const TableHelper = props => {
  
  
  const header = props // load headers for tables
    ? props.array
      ? props.array[0]
        ? Object.keys(props.array[0])
        : null
      : null
    : null

  const [state] = useContext(Context)
  const [hideID, setHideID] = useState(true)
  const [dir, setDir] = useState(false)
  const [filter, setFilter] = useState('')
  const [searchCol, setSearchCol] = useState(header ? header[0] : '')
  const [col, setCol] = useState('id')
  const filterId = /(\w+_id)|(^id$)$/i
  const { classes } = props

  // render tableheaders
  const renderTableHeader = () => {
    if (header !== null) {
      return header.map((item, index) => {
        item = stringFormatter(item) //format the strings so that they comply with Languages
        // Translate the items according to language preference
        return hideID && item.match(filterId) ? (
          <TableCell key={index} style={{ display: 'none' }}>
            {Language[state.locals][item] || item}
          </TableCell>
        ) : (
          <TableCell key={index}>
            <TableSortLabel
              direction={dir ? 'asc' : 'desc'}
              onClick={() => {
                setDir(!dir)
                setCol(item)
              }}
            >
              {Language[state.locals][item] || item}
            </TableSortLabel>
          </TableCell>
        )
      })
    }
  }

  const compare = (a, b) => {
    if (typeof a[col] === 'number') {
      if (a[col] < b[col]) {
        return dir ? -1 : 1
      }
      if (a[col] > b[col]) {
        return dir ? 1 : -1
      }
    } else if (a.Vendor) {
      if (a.Vendor.name.toLowerCase() < b.Vendor.name.toLowerCase()) {
        return dir ? -1 : 1
      } else if (a.Vendor.name.toLowerCase() > b.Vendor.name.toLowerCase()) {
        return dir ? 1 : -1
      }
    } else if (typeof a[col] === 'boolean') {
      if (a[col] < b[col]) {
        return dir ? -1 : 1
      }
      if (a[col] > b[col]) {
        return dir ? 1 : -1
      }
    } else if (typeof a[col] === 'string') {
      if (a[col].toLowerCase() < b[col].toLowerCase()) {
        return dir ? -1 : 1
      }
      if (a[col].toLowerCase() > b[col].toLowerCase()) {
        return dir ? 1 : -1
      }
    }

    return 0
  }

  const searchValue = value => {
    try {
      if (searchCol.charAt(0) < searchCol.charAt(0).toLowerCase()) {
        return value[searchCol]['name'].match(new RegExp(filter, 'gi'))
      } else if (typeof value[searchCol] === 'number') {
        const a = value[searchCol] + ''
        if (filter.match(/\d-\d/)) {
          const fromto = filter.split('-')
          if (value[searchCol] >= fromto[0] && value[searchCol] <= fromto[1])
            return a
          return null
        } else return a.indexOf(filter) > -1
      } else if (typeof value[searchCol] === 'boolean') {
        return null
      }
      return value[searchCol].match(new RegExp(filter, 'gi'))
    } catch (err) {
      console.log(`Error ${err}`)
      return value
    }
  }

  const stringFormatter = target => {
    return target.charAt(0).toLowerCase() + target.slice(1) // make first character lowercase for every item
  }
  // render the data for every table
  const renderTableData = () => {
    let arr = props.array
    arr.sort(compare)
    arr = arr.filter(searchValue)

    if (props.array !== undefined || props.array !== null) {
      return arr.map((row, index) => {
        delete row['__typename'] // delete __typename properties from array
        return (
          <TableRow key={index}>
            {Object.values(row).map((item, itemIndex) => {
              //  mape the data values
              if (typeof item === 'object') {
                if (item !== null) {
                  item = item['name']
                }
              } else if (typeof item === 'boolean') {
                if (header[itemIndex] === 'paid') {
                  item
                    ? (item = Language[state.locals]['yes'])
                    : (item = Language[state.locals]['no'])
                } else if (header[itemIndex] === 'debit') {
                  item
                    ? (item = Language[state.locals]['debit'])
                    : (item = Language[state.locals]['credit'])
                }
              } else if (typeof item === 'number') {
                item = item.toLocaleString(state.locales)
              }
              return (
                <Fragment key={itemIndex}>
                  {item ? (
                    hideID && header[itemIndex].match(filterId) ? (
                      <TableCell key={item.id} style={{ display: 'none' }}>
                        {Language[state.locals][item.toLowerCase()] || item}
                      </TableCell>
                    ) : (
                      <TableCell key={item.id}>
                        {Language[state.locals][item.toLowerCase()] || item}
                      </TableCell>
                    )
                  ) : (
                    <TableCell key={itemIndex}>
                      {row.account_numbers
                        ? row.account_numbers.map(
                            (account, accountNumbersIndex) => {
                              return (
                                account.account_number +
                                (accountNumbersIndex + 1 ===
                                row.account_numbers.length
                                  ? ''
                                  : ' | ')
                              )
                            }
                          )
                        : null}
                    </TableCell>
                  )}
                </Fragment>
              )
            })}
            {/* Only add update button if it was passed */}
            {props.accountNumbers ? getAccountNumbers(row) : null}
            {props.pay ? (row.paid === false ? pay(row) : null) : null}
            {props.update
              ? props.pay
                ? row.paid === false
                  ? renderUpdate(row)
                  : null
                : renderUpdate(row)
              : null}
            {/* {props.update ? renderUpdate(row) : null} */}
            {props.delete ? renderDelete(row.id) : null}
            {props.deleteInvoiceMutation
              ? renderDeleteInvoiceMutation(row.id)
              : null}
          </TableRow>
        )
      })
    }
  }

  const pay = item => {
    return <TableCell>{React.cloneElement(props.pay, { ...item })}</TableCell>
  }

  const getAccountNumbers = ({ id, name }) => {
    return (
      <TableCell name={`addaccount-${name}`}>
        {React.cloneElement(props.accountNumbers, { id })}
      </TableCell>
    )
  }

  const deleteHandler = id => {
    props.delete({
      variables: {
        id: id,
      },
    })
  }

  const deleteOrderAndInvoiceHandler = id => {
    props.deleteOrderMutation({
      variables: {
        id: id,
      },
    })

    props.deleteInvoiceMutation({
      variables: {
        id: id,
      },
    })
  }

  const renderDeleteInvoiceMutation = id => {
    return (
      <TableCell name="delete">
        <Fab
          color="primary"
          aria-label="Delete"
          className={classes.fab}
          onClick={deleteOrderAndInvoiceHandler.bind(this, id)}
        >
          <DeleteIcon />
        </Fab>
      </TableCell>
    )
  }

  const renderDelete = id => {
    return (
      <TableCell name="delete">
        <Fab
          color="primary"
          aria-label="Delete"
          className={classes.fab}
          onClick={deleteHandler.bind(this, id)}
        >
          <DeleteIcon />
        </Fab>
      </TableCell>
    )
  }
  const renderUpdate = item => {
    return (
      <TableCell name="update">
        {React.cloneElement(props.update, { ...item })}
      </TableCell>
    )
  }
  return (
    <Fragment>
      <Tooltip
        enterDelay={1000}
        leaveDelay={500}
        disableHoverListener={
          Language[state.locals][searchCol + '_info'] ? false : true
        }
        disableFocusListener={true}
        disableTouchListener={true}
        title={
          Language[state.locals][searchCol + '_info'] ? (
            <Fragment>
              <Typography color="inherit">
                {Language[state.locals][searchCol] || searchCol}
              </Typography>
              <em>{Language[state.locals][searchCol + '_info']}</em>
            </Fragment>
          ) : null
        }
        interactive
      >
        <TextField
          style={{ left: '3em', paddingRight: '5em' }}
          type={'text'}
          label={Language[state.locals].search}
          value={filter}
          onChange={e => {
            setFilter(e.target.value)
          }}
        />
      </Tooltip>
      <FormControl>
        <InputLabel htmlFor="search-col-helper"> </InputLabel>
        <NativeSelect
          onChange={e => {
            setSearchCol(e.target.value)
          }}
          input={<Input name="col" id="search-col-helper" />}
        >
          {header
            ? header.map(item => {
                if (item === '__typename') return null
                return (
                  <option value={item}>
                    {Language[state.locals][item] || item}
                  </option>
                )
              })
            : null}
        </NativeSelect>
        <FormHelperText>{`${Language[state.locals].searchingby} ${Language[
          state.locals
        ][searchCol] || searchCol}`}</FormHelperText>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onClick={() => {
              setHideID(!hideID)
            }}
            value={hideID}
            color="primary"
          />
        }
        label={
          hideID ? Language[state.locals].more : Language[state.locals].less
        }
      />
      <Table>
        <TableHead>
          <TableRow>{renderTableHeader()}</TableRow>
        </TableHead>
        <TableBody>{renderTableData()}</TableBody>
      </Table>
    </Fragment>
  )
}

TableHelper.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TableHelper)
