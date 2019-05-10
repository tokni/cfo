import Context from '../../Context/Context'
import { useContext } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_VENDOR } from '../../utils/Query/VendorQuery'

const StoreExpense = () => {
  const [state] = useContext(Context)
  const { data, error } = useQuery(GET_VENDOR, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  if (error) {
    console.log('vedorn error', error)
    return error
  }

  return data.Vendor ? data.Vendor : null
}

export default StoreExpense