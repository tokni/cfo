import React, { useContext, Fragment, useEffect } from 'react'
import Auth from './Auth/Auth'
import './App.css'
import { MainContainer } from './MainContainer/MainContainer'
import { ApolloProvider, useQuery, useSubscription } from 'react-apollo-hooks'
import { client } from '../src/utils/apollo'
import Context from '../src/Context/Context'
import {
  GET_SUBSCRIP_COMPANY,
  GET_USER,
  GET_USER_PREF,
} from '../src/utils/query'

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

const StorePref = () => {
  const [state, dispatch] = useContext(Context)
  const { data } = useQuery(GET_USER_PREF, {
    variables: { user_id: state.user ? state.user.id : null },
  })

  useEffect(() => {
    dispatch({
      type: 'set_locals',
      locals: data.Preferences ? data.Preferences[0].locals : 'fo',
    })
  })

  return null
}

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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.auth = new Auth()
  }

  handleAuth = () => {
    if (this.auth.isAuthenticated() === false) {
      this.auth.login()
    } else {
      console.log('try again')
    }
  }

  handleLogout = () => {
    this.auth.logout()
  }

  render() {
    return (
      <Fragment>
        <ApolloProvider client={client}>
          <StoreUser />
          <StoreCompanies />
          <StorePref />
          <MainContainer />
        </ApolloProvider>
      </Fragment>
    )
  }
}

export default App
