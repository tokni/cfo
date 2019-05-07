import {useContext, useEffect} from 'react'
import { useSubscription } from 'react-apollo-hooks'
import Context from '../../Context/Context'
import { GET_SUBSCRIP_COMPANY } from '../../utils/query'

const StoreCompanies = () => {
    const { data } = useSubscription(GET_SUBSCRIP_COMPANY)
  
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContext(Context)
  
    useEffect(() => {
        dispatch({
          type: 'set_companies',
          companies: data ? data.Company : null,
        })
    })
    return null
}

export default StoreCompanies