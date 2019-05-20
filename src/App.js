import Auth from './Auth/Auth'
import React, { Fragment } from 'react'
import { client } from '../src/utils/apollo'
import { ApolloProvider } from 'react-apollo-hooks'
import { MainContainer } from './MainContainer/MainContainer'
import PostUser from './MainContainer/ContentContainer/User/PostUser'
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.auth = new Auth()
  }

  render() {
    this.auth.login()
    const first_name = this.auth.GetUserProfile().given_name
    const last_name = this.auth.GetUserProfile().family_name
    return (
      <Fragment>
        <ApolloProvider client={client}>
          <PostUser
            first_name={first_name}
            last_name={last_name}
          />

          <MainContainer />
        </ApolloProvider>
      </Fragment>
    )
  }
}

export default App
