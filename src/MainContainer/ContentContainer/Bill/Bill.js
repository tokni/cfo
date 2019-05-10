import React, { Fragment } from 'react'
import GetBills from './GetBills'
import CreateBill from './CreateBill'

const Bill = () => {
    return(
    <Fragment>
        <CreateBill />
        <GetBills/>
    </Fragment>
    )
    
}


export default Bill