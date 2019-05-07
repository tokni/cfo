import React, { Fragment } from 'react'
import './App.css'
import { MainContainer } from './MainContainer/MainContainer'
import { ApolloProvider } from 'react-apollo-hooks'
import { client } from '../src/utils/apollo'

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <ApolloProvider client={client}>
          <MainContainer />
        </ApolloProvider>
      </Fragment>
    )
  }
}

export default App
