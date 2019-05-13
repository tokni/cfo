import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import { GET_PRODUCTS } from '../../../utils/Query/ProductQuery'
import { GET_CUSTOMERS } from '../../../utils/Query/CustomersQuery'
import { GET_SUBSCRIP_ACCOUNTS } from '../../../utils/query'
import { useSubscription } from 'react-apollo-hooks'
import React, { Fragment, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Delete from '@material-ui/icons/Delete'

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
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: '20%',
  // },
})

// const styles = theme => ({
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },
// });

const Form = props => {
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(Date.now())
  const [quantity, setQuantity] = useState(null)
  const [price, setPrice] = useState(null)
  const [account, setAccount] = useState(null)
  const [product, setProduct] = useState('')
  const [customer, setCustomer] = useState('')
  const [products] = useState(Array)
  const [state] = useContext(Context)

  const { data } = useSubscription(GET_PRODUCTS, {
    suspend: false,
    variables: {
      company_id: state.company.id,
    },
  })

  const customerData = useSubscription(GET_CUSTOMERS, {
    suspend: false,
    variables: {
      company_id: state.company.id,
    },
  })

  const accountData = useSubscription(GET_SUBSCRIP_ACCOUNTS, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  const handleProductChange = e => {
    setProduct(e.target.value)
  }

  const handleCustomerChange = e => {
    setCustomer(e.target.value)
    props.fetcher('name', e.target.value)
  }

  const handleAccountChange = e => {
    setAccount(e.target.value)
    console.log('value is: ', e.target.value)
    props.fetcher('account', e.target.value)
  }

  const addProductHandler = () => {
    products.push({ product: product, quantity: quantity, price: price })
    props.fetcher('products', products)
    setProduct('')
    setQuantity(null)
    setPrice(null)
  }

  const handleDelete = index => {
    products.splice(index, 1)
  }

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
            value={customer}
            onChange={handleCustomerChange}
            label="Kundi"
            placeholder="Vel ein kunda"
            input={<Input name="kundi1" id="customer-helper" />}
          >
            {customerData.data
              ? customerData.data.Customer.map((item, index) => {
                  return (
                    <MenuItem key={index} id={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  )
                })
              : null}
          </Select>
        </FormControl>
        <br />
        <br />

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
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <Tooltip title={Language[state.locals].removefromlist}>
                      <Fab
                        onClick={handleDelete.bind(this, index)}
                        color="secondary"
                      >
                        <Delete />
                      </Fab>
                    </Tooltip>
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
              value={product}
              onChange={handleProductChange}
              label="Vvøru"
              input={<Input name="Product1" id="product-helper" />}
            >
              {data
                ? data.Product.map((item, index) => {
                    return (
                      <MenuItem key={index} id={item.name} value={item.name}>
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
              placeholder={0}
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
              placeholder={0}
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
        <FormControl variant="standard" className={classes.formControl}>
          {/* <InputLabel htmlFor="payment_due-helper">
            {Language[state.locals].paymentdue}
            {': '}
          </InputLabel> */}
          <TextField
            autoFocus
            margin="dense"
            id="payment_due-helper"
            label={Language[state.locals].payment_due}
            value={dueDate}
            type="date"
            onChange={e => {
              setDueDate(e.target.value)
              props.fetcher('dueDate', e.target.value)
            }}
          />
        </FormControl>
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
            value={account}
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
    </Fragment>
  )
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Form)
