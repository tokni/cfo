import React, { useContext, useState, Fragment } from 'react'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import SnackBar from '../SnackBar/SnackBar'
import { useSubscription } from 'react-apollo-hooks'
import { GET_BALANCE_SHEETS } from '../../../utils/Query/BalanceSheetQuery'
import TableHelper from '../../../Helpers/TableHelper'

const GetBalanceSheets = props => {
  const [state] = useContext(Context)
  const [array, setArray] = useState([])
  const { data, error, loading } = useSubscription(GET_BALANCE_SHEETS, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
      date: props.date,
    },
  })

  if (loading) {
    return <p>{Language[state.locals].loading}...</p>
  }

  if (error) {
    return (
      <SnackBar
        message={Language[state.locals].errorloadingbalancesheets}
        state={'error'}
      />
    )
  }


  const getSheetRows = () =>{
    
    console.log("data ", data.Balance_sheet)
    return data.Balance_sheet.map((row, rowIndex) => {
        Object.values(row).map((item, index) => { //  mape the data values
           console.log("item ", item)   
              
           if(typeof item === 'object'){
                return array
           }
           return ["empty"]
           
          })
    })
  }
  return (
   <Fragment>
    
       {data ? data.Balance_sheet ?  getSheetRows() ? <TableHelper array={getSheetRows()}/> : null : null : null}

    
      {state.company === null ? (
        <SnackBar message={'could not load balance sheets'} state={'warning'} />
      ) : null}
    </Fragment>
  )
}

export default GetBalanceSheets
