import Demo from './Demo'
import Form from './Form'
import React, { Fragment, useState } from 'react'

import { Grid, Paper } from '@material-ui/core'

const Invoice = props => {
  const [name, setName] = useState('')
  const [products, setProducts] = useState(null)
  const [created, setCreated] = useState(null)
  const [account, setAccount] = useState(null)
  const [invoiceNumber, setInvoiceNumber] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [dueDate, setDueDate] = useState(null)
  const [description, setDescription] = useState('')
  const fetchFileFromForm = (type, value) => {
    switch (type) {
      case 'name':
        setName(value)
        break
      case 'description':
        setDescription(value)
        break
      case 'account':
        setAccount(value)
        break
      case 'dueDate':
        setDueDate(value)
        break
      case 'created':
        setCreated(value)
        break
      case 'invoiceNumber':
        setInvoiceNumber(value)
        break
      case 'products':
        setProducts(value)
        break
      case 'quantity':
        setQuantity(value)
        break
      default:
        return true
    }
  }
  return (
    <Fragment>
      <Grid style={{ paddingTop: 20 }} container lg={12} spacing={40}>
        <Grid item lg={5}>
          <Paper style={{ padding: 40 }}>
            <Form fetcher={fetchFileFromForm} handleClose={props.handleClose} />
          </Paper>
        </Grid>
        <br />
        <Grid item lg={7}>
          <Paper style={{ padding: 40 }}>
            <Demo
              name={name}
              description={description}
              dueDate={dueDate}
              products={products}
              quantity={quantity}
              account={account}
              created={created}
              invoiceNumber={invoiceNumber}
            />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Invoice
