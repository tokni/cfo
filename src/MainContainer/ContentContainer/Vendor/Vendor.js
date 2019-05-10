import React, { Fragment } from 'react'
import GetVendors from './GetVendors'
import CreateVendor from './CreateVendor'

const Vendor = () => {
    return(
    <Fragment>
        <CreateVendor/>
        <GetVendors />
    </Fragment>
    )
    
}


export default Vendor