import Context from '../../Context/Context'
import { useContext, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_ACCOUNTING_YEAR } from '../../utils/Query/AccountingYear'

const StoreAccountingYear = () => {
  const [state, dispatch] = useContext(Context)

  const { data } = useQuery(GET_ACCOUNTING_YEAR, {
    variables: {
      company_id: state.companies
        ? state.companies[state.company_index].id
        : null,
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch({
          type: 'set_accounting_year',
          accounting_year: data.Accounting_year[0],
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
