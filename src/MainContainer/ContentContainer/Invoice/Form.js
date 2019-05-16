import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Language from '../../../utils/language'
import Delete from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Logic from './Logic'

import {
  TextField,
  Select,
  MenuItem,
  Input,
  Button,
  InputLabel,
  Tooltip,
  FormControl,
  withStyles,
  Table,
  Fab,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

const Form = props => {
  const {
    addQueryHandler,
    addProductHandler,
    handleAccountChange,
    handleCustomerChange,
    handleDelete,
    handleProductChange,
    accountData,
    data,
    customerData,
    customer,
    setDescription,
    setDueDate,
    setCreated,
    setInvoiceNumber,
    account,
    created,
    invoiceNumber,
    products,
    product,
    price,
    quantity,
    setPrice,
    setQuantity,
    description,
    dueDate,
    state,
  } = Logic(props)

  const { classes } = props
  return (
    <Fragment>
      <form>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="customer-helper">
            {Language[state.locals].customer}
            {': '}
          </InputLabel>
          <Select
            required
            value={customer || ''}
            onChange={handleCustomerChange}
            label="Kundi"
            placeholder="Vel ein kunda"
            input={<Input name="kundi1" id="customer-helper" />}
          >
            {customerData.data
              ? customerData.data.Customer.map((item, index) => {
                  return (
                    <MenuItem key={index} id={item.name} value={item}>
                      {item.name}
                    </MenuItem>
                  )
                })
              : null}
          </Select>
        </FormControl>
        <br />
        <FormControl variant="filled" className={classes.formControl}>
          <TextField
            label={Language[state.locals].invoicenumber}
            value={invoiceNumber || ''}
            placeholder="e.g. F431"
            onChange={e => {
              setInvoiceNumber(e.target.value)
              props.fetcher('invoiceNumber', e.target.value)
            }}
          />
        </FormControl>

        {products.length >= 1 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{Language[state.locals].product}</TableCell>
                <TableCell>{Language[state.locals].quantity}</TableCell>
                <TableCell>{Language[state.locals].price}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <Tooltip title={Language[state.locals].removefromlist}>
                        <Fab
                          onClick={handleDelete.bind(this, index)}
                          color="secondary"
                        >
                          <Delete />
                        </Fab>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : null}
        <br />
        <div className={classes.container}>
          <FormControl
            className={classes.textField}
            variant="filled"
            style={{ width: '30%' }}
          >
            <InputLabel htmlFor="product-helper">
              {Language[state.locals].product}
              {': '}
            </InputLabel>
            <Select
              value={product || ''}
              onChange={handleProductChange}
              label="Vvøru"
              input={<Input name="Product1" id="product-helper" />}
            >
              {data
                ? data.Product.map((item, index) => {
                    return (
                      <MenuItem key={index} id={item.name} value={item}>
                        {item.name}
                      </MenuItem>
                    )
                  })
                : null}
            </Select>
          </FormControl>
          <FormControl
            className={classes.textField}
            variant="standard"
            style={{ width: '20%', paddingLeft: 10 }}
          >
            <TextField
              type="number"
              id="quantity"
              label={Language[state.locals].quantity}
              value={quantity ? quantity : ''}
              onChange={e => {
                setQuantity(e.target.value)
              }}
            />
          </FormControl>
          <FormControl
            className={classes.textField}
            variant="standard"
            style={{ width: '30%', paddingLeft: 10 }}
          >
            <TextField
              type="number"
              id="price"
              label={Language[state.locals].price}
              value={price ? price : ''}
              onChange={e => {
                setPrice(e.target.value)
              }}
            />
          </FormControl>
          <Button
            style={{ width: '15%' }}
            onClick={addProductHandler.bind(this)}
          >
            +
          </Button>
        </div>
        <br />
        <br />
        <InputLabel>{Language[state.locals].invoicecreated}</InputLabel>
        <br />
        <TextField
          autoFocus
          margin="dense"
          label={Language[state.locals].invoicecreated}
          value={created || ''}
          fullWidth
          type="date"
          onChange={e => {
            setCreated(e.target.value)
            props.fetcher('created', e.target.value)
          }}
        />
        <br />
        <InputLabel>{Language[state.locals].invoicedue}</InputLabel>
        <br />
        <TextField
          autoFocus
          margin="dense"
          label={Language[state.locals].payment_due}
          fullWidth
          value={dueDate || ''}
          type="date"
          onChange={e => {
            setDueDate(e.target.value)
            props.fetcher('dueDate', e.target.value)
          }}
        />
        <br />

        <br />
        <FormControl variant="filled" className={classes.formControl}>
          <TextField
            multiline
            rows="4"
            fullWidth
            id="description"
            label={Language[state.locals].description}
            value={description}
            placeholder="Rokning fyri at verða kundi hjá okkum"
            onChange={e => {
              setDescription(e.target.value)
              props.fetcher('description', e.target.value)
            }}
          />
        </FormControl>
        <br />
        <br />
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="account-helper">
            {Language[state.locals].account}
            {': '}
          </InputLabel>
          <Select
            required
            value={account || ''}
            onChange={handleAccountChange}
            label="Konta"
            input={<Input name="kundi1" id="account-helper" />}
          >
            {accountData.data
              ? accountData.data.Account.map((item, index) => {
                  return (
                    <MenuItem key={index} id={item.name} value={item}>
                      {item.name}
                    </MenuItem>
                  )
                })
              : null}
          </Select>
        </FormControl>
      </form>
      <Tooltip title="Add invoice">
        <Fab
          onClick={addQueryHandler}
          color="primary"
          aria-label="Add"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Fragment>
  )
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Form)
