import Context from '../../Context/Context'
import { useContext, useEffect } from 'react'
import { useSubscription } from 'react-apollo-hooks'
import { GET_ALL_ACCOUNTING_YEAR } from '../../utils/Query/AccountingYear'

const StoreAccountingYear = () => {
  const [state, dispatch] = useContext(Context)

  const { data } = useSubscription(GET_ALL_ACCOUNTING_YEAR, {
    
    variables: {
      company_id: state.company
        ?  state.company.id
        : null
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch({
          type: 'set_accounting_year',
          accounting_year: data.Accounting_year,
        })
      } catch (err) {
        console.log(`Error: ${err.error}`)
      }
    }
    fetchData()
  }, [data, dispatch])

  return null
}

export default StoreAccountingYear
