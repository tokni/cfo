import React from 'react'
import PropTypes from 'prop-types'
import { client } from './apollo'
import { ApolloClient } from 'apollo-boost'
import { render } from 'react-testing-library'
import ContextStore from '../Context/ContextStore'
import { BrowserRouter } from 'react-router-dom'

// shall be the same element order as in index.js
const AllTheProviders = ({ children }) => (
  <ApolloClient client={client}>
    <ContextStore>
      <BrowserRouter>{children}</BrowserRouter>
    </ContextStore>
  </ApolloClient>
)

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }

AllTheProviders.propTypes = {
  children: PropTypes.any,
}

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    }
  }
