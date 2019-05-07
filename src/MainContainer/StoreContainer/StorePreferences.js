import { useContext, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks'
import Context from '../../Context/Context'
import { GET_USER_PREF } from '../../utils/query'

const StorePreferences = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context)

  const { data } = useQuery(GET_USER_PREF, {
    variables: {
      user_id: state.user ? state.user.id : null,
    },
  })

  console.log('store preF: : ', data)
  useEffect(() => {
    async function fetchData() {
      await dispatch({
        type: 'set_locals',
        locals: data.Preferences ? data.Preferences[0].locals : 'fo',
      })
    }
    fetchData()
  }, [data])
  return null
}

export default StorePreferences
