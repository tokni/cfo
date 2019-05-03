import React, { useContext, Fragment, useEffect } from 'react'
import Auth from './Auth/Auth'
import './App.css'
import { MainContainer } from './MainContainer/MainContainer'
import { ApolloProvider, useQuery } from 'react-apollo-hooks'
import { client } from '../src/utils/apollo'
import Context from '../src/Context/Context'
import { GET_USER } from '../src/utils/query'

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
          <MainContainer />
        </ApolloProvider>
      </Fragment>
    )
  }
}

export default App
