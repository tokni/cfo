import React, { Fragment } from "react";
import GetCompany from '../Company/getCompany'
import CreateCompany from '../Company/createCompany'

const Company = () => (
    <Fragment>
      <CreateCompany />
      <GetCompany />
    </Fragment>
  )

  export default Company