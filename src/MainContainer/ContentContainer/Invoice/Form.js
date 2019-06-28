import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Language from '../../../utils/language'
import { DeleteIcon } from '../../../Helpers/Constants'
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
        <FormControl className={classes.formControl}>
          <TextField
            required
            select
            value={customer || ''}
            onChange={handleCustomerChange}
            variant="outlined"
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
          </TextField>
        </FormControl>
        <br />
        <FormControl variant="filled" className={classes.formControl}>
          <TextField
            required
            variant="outlined"
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
                          <DeleteIcon />
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
            <TextField
              required
              select
              value={product || ''}
              onChange={handleProductChange}
              variant="outlined"
              label={Language[state.locals].product}
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
            </TextField>
          </FormControl>
          <FormControl
            className={classes.textField}
            variant="standard"
            style={{ width: '20%', paddingLeft: 10 }}
          >
            <TextField
              required
              type="number"
              id="quantity"
              variant="outlined"
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
              required
              type="number"
              id="price"
              variant="outlined"
              label={Language[state.locals].price}
              value={price ? price : ''}
              onChange={e => {
                setPrice(e.target.value)
              }}
            />
          </FormControl>
          <Button
            data-cy="addItem"
            style={{ width: '15%' }}
            onClick={addProductHandler.bind(this)}
          >
            +
          </Button>
        </div>
        <br />
        {/* <br />
        <InputLabel>{Language[state.locals].invoicecreated}</InputLabel>
        <br /> */}
        <TextField
          required
          margin="dense"
          variant="outlined"
          label={Language[state.locals].invoicecreated}
          value={created || ''}
          fullWidth
          type="date"
          onChange={e => {
            setCreated(e.target.value)
            props.fetcher('created', e.target.value)
          }}
        />
        {/* <br />
        <InputLabel>{Language[state.locals].invoicedue}</InputLabel>
        <br /> */}
        <TextField
          required
          margin="dense"
          variant="outlined"
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
            variant="outlined"
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
          <TextField
            select
            required
            value={account || ''}
            onChange={handleAccountChange}
            variant="outlined"
            label={Language[state.locals].account}
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
          </TextField>
        </FormControl>
      </form>
      <Tooltip title="Add invoice">
        <Fab
          onClick={addQueryHandler}
          color="primary"
          data-cy="submit-form"
          name="submit-invoice"
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
