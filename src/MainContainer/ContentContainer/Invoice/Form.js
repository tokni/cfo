import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import { GET_PRODUCTS } from '../../../utils/Query/ProductQuery'
import { GET_CUSTOMERS } from '../../../utils/Query/CustomersQuery'
import { useSubscription } from 'react-apollo-hooks'
import React, { Fragment, useContext, useState } from 'react'

import { TextField, Select, MenuItem, Input } from '@material-ui/core'

const Form = props => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(Date.now())
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [product, setProduct] = useState('')
  const [customer, setCustomer] = useState('')
  const [state, dispatch] = useContext(Context)
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
  const handleProductChange = e => {
    setProduct(e.target.value)
    props.fetcher('product', e.target.value)
  }
  const handleCustomerChange = e => {
    setCustomer(e.target.value)
    props.fetcher('name', e.target.value)
  }
  return (
    <Fragment>
      <form>
        <Select
          value={customer}
          onChange={handleCustomerChange}
          label="Kundi"
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
        {/* <TextField
          required
          id="name"
          label={Language[state.locals].name}
          value={name}
          fullWidth
          placeholder="insert name"
          onChange={e => {
            setName(e.target.value)
            props.fetcher('name', e.target.value)
          }}
        /> */}
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
        <br />
        <Select
          value={product}
          onChange={handleProductChange}
          label="Vel eina vøru"
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
        <TextField
          type="number"
          id="quantity"
          label={Language[state.locals].quantity}
          value={quantity}
          placeholder={quantity}
          onChange={e => {
            setQuantity(e.target.value)
            props.fetcher('quantity', e.target.value)
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="payment_due"
          label={Language[state.locals].payment_due}
          value={dueDate}
          type="date"
          fullWidth
          onChange={e => {
            setDueDate(e.target.value)
            props.fetcher('dueDate', e.target.value)
          }}
        />
      </form>
    </Fragment>
  )
}

export default Form
