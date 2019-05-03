import React, { useContext, Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Auth from './Auth/Auth'
import './App.css'
import { MainContainer } from './MainContainer/MainContainer'
import { ApolloProvider, useQuery, useSubscription } from 'react-apollo-hooks'
import { client } from '../src/utils/apollo'
import Context from '../src/Context/Context'
import { GET_SUBSCRIP_COMPANY, GET_USER } from '../src/utils/query'
import selectCompany from '../src/MainContainer/ContentContainer/Company/selectCompany'

const StoreUser = () => {
  const { data } = useQuery(GET_USER, {
    variables: {
      token: localStorage.getItem('sub'),
    },
  })

 
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    dispatch({
      type: 'load_user',
      user: data.User,
    })

  })
  return null
}


const StoreCompanies = () =>  {
  const { data } = useSubscription(GET_SUBSCRIP_COMPANY)


  const [state, dispatch] = useContext(Context)
 
  useEffect(() => {   
    dispatch({
      type: 'set_companies',
      companies: data ? data.Company : null
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
      //  this.auth.handleAuthentication();
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
          <StoreCompanies/>
          <MainContainer />
          <selectCompany/>
        </ApolloProvider>
      </Fragment>
    )
  }
}

export default App
