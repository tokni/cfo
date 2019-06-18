import Context from '../../Context/Context'
import { useContext, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_USER } from '../../utils/Query/UserQuery'

const StoreUser = () => {
  // console.log('sub from StoreUser: ', localStorage.getItem('sub'))
  const { data } = useQuery(GET_USER, {
    variables: {
      token: localStorage.getItem('sub'),
    },
  })

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context)
  useEffect(() => {
    async function fetchData() {
      await dispatch({
        type: 'load_user',
        user: data.User,
      })
    }
    fetchData()
  }, [data.User, dispatch])
  return null
}

export default StoreUser
