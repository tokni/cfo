import Context from '../../Context/Context'
import { useContext } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_TAX } from '../../utils/Query/TaxQuery'

const StoreTax = () => {
  const [state] = useContext(Context)
  const { data, error, loading } = useQuery(GET_TAX, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  if (error) {
    console.log('tax error', error)
    return error
  }

  if (loading) {
    console.log('loading tax', loading)
  }

  console.log('tax ', data.Tax)
  return data.Tax ? data.Tax : null
}

export default StoreTax
