import React, { Fragment } from 'react'
import GetExpenses from './GetExpenses'
import CreateExpense from './CreateExpense'

const Expense = () => {
    return(
    <Fragment>
        <CreateExpense/>
        <GetExpenses />
    </Fragment>
    )
    
}


export default Expense