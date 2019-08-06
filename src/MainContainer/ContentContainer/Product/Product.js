import CreateProduct from './CreateProduct'
import GetProducts from './GetProducts'
import React, { Fragment } from 'react'

const Products = () => {
  return (
    <Fragment>
      <CreateProduct />
      <GetProducts />
    </Fragment>
  )
}

export default Products
