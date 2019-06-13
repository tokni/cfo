import { useState, useContext } from 'react'
import Context from '../../../Context/Context'
import { GET_PRODUCTS } from '../../../utils/Query/ProductQuery'
import { GET_CUSTOMERS } from '../../../utils/Query/CustomersQuery'
import { GET_SUBSCRIP_ACCOUNTS } from '../../../utils/Query/AccountQuery'
import { POST_INVOICE } from '../../../utils/Query/InvoiceQuery'
import { POST_ORDER } from '../../../utils/Query/OrderQuery'
import { useSubscription, useMutation } from 'react-apollo-hooks'

const Logic = props => {
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(Date.now())
  const [created, setCreated] = useState(Date.now())
  const [quantity, setQuantity] = useState(null)
  const [price, setPrice] = useState(null)
  const [account, setAccount] = useState(null)
  const [invoiceNumber, setInvoiceNumber] = useState(null)
  const [product, setProduct] = useState('')
  const [customer, setCustomer] = useState(null)
  const [products] = useState(Array)
  const [state] = useContext(Context)
  const mutateInvoice = useMutation(POST_INVOICE)
  const mutateOrder = useMutation(POST_ORDER)

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
    props.fetcher('name', e.target.value.name)
  }

  const handleAccountChange = e => {
    setAccount(e.target.value)
    props.fetcher('account', e.target.value)
  }

  const addProductHandler = () => {
    if (product && quantity && price) {
      products.push({ product: product, quantity: quantity, price: price })
      props.fetcher('products', products)
      setProduct('')
      setQuantity(null)
      setPrice(null)
    } else {
      console.log('field is missing...')
    }
  }

  const addPayment = () => {
    let payment = 0
    
    products.forEach(element => {
      console.log("element ", element)  
      payment += element.price
    })
    return payment
  }

  const handleDelete = index => {
    products.splice(index, 1)
  }

  const addQueryHandler = async () => {
    if (
      dueDate &&
      account &&
      invoiceNumber &&
      products.length > 0 &&
      customer
    ) {
      const result = await mutateInvoice({
        variables: {
          customer_id: customer.id,
          company_id: state.company.id,
          invoice_number: invoiceNumber,
          attachment_id: 'c28dfb73-64c2-4d65-a8cf-f5698f4a3399', //hardcode
          description: description,
          payment_due: dueDate,
          payment: addPayment() 
        },
      })

      if (result) {
        products.map((product, index) => {
          return mutateOrder({
            variables: {
              invoice_id: result.data.insert_Invoice.returning[0].id,
              product_id: product.product.id,
              quantity: product.quantity,
              price: product.price,
            },
          })
        })
        props.handleClose()
      }
    } else {
      console.log('ERROR IN INPUT !!!!!')
    }
  }

  return {
    addQueryHandler,
    addProductHandler,
    handleAccountChange,
    handleCustomerChange,
    handleDelete,
    product,
    quantity,
    price,
    setPrice,
    setQuantity,
    description,
    dueDate,
    handleProductChange,
    accountData,
    data,
    customerData,
    setDescription,
    setDueDate,
    setCreated,
    setInvoiceNumber,
    account,
    created,
    state,
    customer,
    invoiceNumber,
    products,
  }
}

export default Logic
