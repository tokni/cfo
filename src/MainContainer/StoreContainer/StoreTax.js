import Context from '../../Context/Context'
import { useContext } from 'react'
import { useSubscription } from 'react-apollo-hooks'
import { GET_TAX_SUBSCRIPTION } from '../../utils/Query/TaxQuery'

const StoreTax = () => {
  const [state] = useContext(Context)
  const { data, error } = useSubscription(GET_TAX_SUBSCRIPTION, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  if (error) {
    return error
  }

  return data ? data.Tax : null ? data.Tax : null
}

export default StoreTax
