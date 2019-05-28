import React, { Fragment } from 'react'
import CreateTax from './CreateTax'
import GetTaxes from './GetTaxes'


const Tax = () => {
  return (
    <Fragment>
      <CreateTax/>
      <GetTaxes/>
    </Fragment>
  )
}

export default Tax