import Context from '../../Context/Context'
import { useContext, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_USER_PREF } from '../../utils/Query/UserQuery'

const StorePreferences = () => {
  const [state, dispatch] = useContext(Context)

  const { data } = useQuery(GET_USER_PREF, {
    variables: {
      user_id: state.user ? state.user.id : null,
    },
  })

  useEffect(() => {
    async function fetchData() {
      await dispatch({
        type: 'set_locals',
        locals: data.Preferences && data.Preferences[0] ? data.Preferences[0].locals : 'en',
      })

      if (data.Preferences && state.companies && data.Preferences[0]) {
        if (data.Preferences[0].current_company) {
          await dispatch({
            type: 'set_company',
            index: parseInt(data.Preferences[0].current_company),
          })
        }
      }
    }

    fetchData()
  }, [data.Preferences, dispatch, state.companies])

  return null
}

export default StorePreferences
