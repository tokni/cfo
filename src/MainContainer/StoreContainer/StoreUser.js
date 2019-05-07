import { useContext, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_USER } from '../../utils/query'
import Context from '../../Context/Context'

const StoreUser = () => {
  // const [user, setUser] = useState()
  const { data } = useQuery(GET_USER, {
    variables: {
      token: localStorage.getItem('sub'),
    },
  })
  // eslint-disable-next-line
  const [state, dispatch] = useContext(Context)
  console.log('inni i store user')
  useEffect(() => {
    async function fetchData() {
      await dispatch({
        type: 'load_user',
        user: data.User,
      })
    }
    fetchData()
  }, [data.User])

  return null
}

export default StoreUser
