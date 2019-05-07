import { useContext, useEffect } from 'react'
import { useSubscription } from 'react-apollo-hooks'
import Context from '../../Context/Context'
import { GET_SUBSCRIP_COMPANY } from '../../utils/query'

const StoreCompanies = () => {
  // const [companies, setCompanies] = useState()
  const { data } = useSubscription(GET_SUBSCRIP_COMPANY)

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context)
  console.log('inni i store companies')

  useEffect(() => {
    async function fetchData() {
      await dispatch({
        type: 'set_companies',
        companies: data ? data.Company : null,
      })
    }
    // setCompanies(data)
    fetchData()
  }, [data, dispatch])
  return null
}

export default StoreCompanies
