import React, { useState } from 'react'
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@material-ui/core'

const TableHelper = props => {

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
          if(item === '__typename')return null
        return (<TableCell key={index}>{item.toLocaleLowerCase()}</TableCell>)
      })
    }
  }

  const renderTableData = () => {
    if (props.array !== undefined) {
      return props.array.map((item, index) => {
        delete item['__typename']
        return (
          <TableRow>
            {Object.values(item).map((row, index) => {
              if (typeof row === 'object') {
                if (row !== null) {
                  row = row['name']
                }
              } else if (typeof row === 'boolean') {
                row ? (row = 'Yes') : (row = 'No')
              }
              return <TableCell key={index}>{row}</TableCell>
            })}
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
