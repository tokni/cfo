import { useContext, useEffect } from 'react'
import {useQuery} from 'react-apollo-hooks'
import { GET_USER} from '../../utils/query'
import Context from '../../Context/Context'

const StoreUser = () => {
    const { data } = useQuery(GET_USER, {
      variables: {
        token: localStorage.getItem('sub'),
      },
    })
  
    // eslint-disable-next-line
    const [state, dispatch] = useContext(Context)
  
    useEffect(() => {
      dispatch({
        type: 'load_user',
        user: data.User,
      })
    })
  
    return null
  }

  export default StoreUser