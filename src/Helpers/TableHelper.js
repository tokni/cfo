import React, { useContext } from 'react'
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@material-ui/core'
import Context from '../Context/Context'
const TableHelper = props => {
const [state] = useContext(Context)
  const renderTableHeader = () => {
    const header = props
      ? props.array
        ? props.array[0]
          ? Object.keys(props.array[0])
          : null
        : null
      : null

      
    if (header !== null) {
      return header.map((item, index) => {  
        if(item === '__typename')return null // skip __typename colummns
        
        item = stringFormatter(item, '_', ' ')
       
        return (<TableCell key={index}>{item}</TableCell>)
      })
    }
  }

  const stringFormatter = (target, search, replacement) => {
    target = target.charAt(0).toUpperCase() + target.slice(1)
    return target.split(search).join(replacement);
  }


  const renderTableData = () => {
    if (props.array !== undefined || props.array !== null) {
      return props.array.map((item, index) => {
        delete item['__typename'] // delete __typename properties from array
        return (
          <TableRow>
            {Object.values(item).map((row, index) => {
              
              if (typeof row === 'object') {
                if (row !== null) {
                  row = row['name']
                }
              } else if (typeof row === 'boolean') {
                row ? (row = 'Yes') : (row = 'No')
              } else if(typeof row === 'number'){
                row = row.toLocaleString(state.locales)
              }

              
              return <TableCell key={index}>{row}</TableCell>
            })}
            {props.update}
          </TableRow>
        )
      })
    }
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

export default TableHelper
