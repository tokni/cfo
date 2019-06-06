import React, { useContext, Fragment } from 'react'
import Language from '../utils/language'
import PropTypes from 'prop-types'
import {
  withStyles,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Fab,
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
  const { classes } = props

  // render tableheaders
  const renderTableHeader = () => {
    if (header !== null) {
      return header.map((item, index) => {
        if (item === '__typename') return null // skip __typename colummns
        
        item = stringFormatter(item) //format the strings so that they comply with Languages
        // Translate the items according to language preference
        return (
          <TableCell key={index}>
            {Language[state.locals][item] || item}
          </TableCell>
        )
      })
    }
  }

  const stringFormatter = target => {
    return target.charAt(0).toLowerCase() + target.slice(1) // make first character lowercase for every item
  }
  // render the data for every table
  const renderTableData = () => {
    if (props.array !== undefined || props.array !== null) {
      return props.array.map((row, index) => {
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
                    <TableCell key={item.id}>{Language[state.locals][item.toLowerCase()] || item}</TableCell>
                  ) : (
                    <TableCell key={itemIndex}>
                      {row.account_numbers
                        ? row.account_numbers.map((account, accountNumbersIndex) => {
                            return (
                              account.account_number +
                              (index + 1 === row.account_numbers.length
                                ? ''
                                : ' | ')
                            )
                          })
                        : null}
                    </TableCell>
                  )}
                </Fragment>
              )
            })}
            {/* Only add update button if it was passed */}
            {props.accountNumbers ? getAccountNumbers(row.id) : null}
            {props.payBill ? row.paid === false ? payBillsRender(row) : null : null}
            {props.update ? renderUpdate(row) : null}
            {props.delete ? renderDelete(row.id) : null}
          </TableRow>
        )
      })
    }
  }

  const payBillsRender = item => {
    return (
      <TableCell>{React.cloneElement(props.payBill, { ...item })}</TableCell>
    )
  }

  const getAccountNumbers = id => {
    return (
      <TableCell>{React.cloneElement(props.accountNumbers, { id })}</TableCell>
    )
  }

  const deleteHandler = id => {
    props.delete({
      variables: {
        id: id,
      },
    })
  }

  const renderDelete = id => {
    return (
      <TableCell>
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
      <TableCell>{React.cloneElement(props.update, { ...item })}</TableCell>
    )
  }
  return (
    <Table>
      <TableHead>
        <TableRow>{renderTableHeader()}</TableRow>
      </TableHead>
      <TableBody>{renderTableData()}</TableBody>
    </Table>
  )
}

TableHelper.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TableHelper)
