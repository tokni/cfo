import React, {useState} from 'react'
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@material-ui/core'

const TableHelper = props => {

    const [header, setHeader] = useState(Object.keys(props
    ? props.array
      ? props.array[0]
        ? Object.keys(props.array[0])
        : []
      : []
    : []))


  const renderTableHeader = () => {
    setHeader(props
      ? props.array
        ? props.array[0]
          ? Object.keys(props.array[0])
          : null
        : null
      : null)

    if (header !== null) {
      return header.map((item, index) => {
        return (
            <TableCell>{item.toUpperCase()}</TableCell>
        )
      })
    } else {
      return (
        <TableRow>
          <TableCell />
        </TableRow>
      )
    }
  }

  const renderTableData = () => {
    // console.log('htmlHelper ', props.array)

    let data = props.array
    if (data !== undefined) {
      return data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>
              {item[0]}
            </TableCell>
          </TableRow>
        )
      })
    } else {
      return (
        <TableRow>
          <TableCell />
        </TableRow>
      )
    }
  }

  return (
    <Table>
      <TableHead>
      
      {/* <TableRow>{renderTableHeader()}</TableRow>*/}</TableHead>
      <TableBody>{renderTableData()}</TableBody>
    </Table>
  )
}

export default TableHelper
