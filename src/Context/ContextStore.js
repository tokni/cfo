import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import createReducer from './createReducer'
import { GET_COMPANY } from '../utils/query'

const ContextStore = props => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  )
}

ContextStore.propTypes = {
  children: PropTypes.any,
}

const initialState = {
  currentIndex: 0,
  companies: GET_COMPANY,
}

const reducer = createReducer(initialState, {
  reset: () => initialState,
  change_company: (state, action) => ({
    ...state,
    name: action.name,
  }),
  change_company: (state, action) => ({

  })
})

export default ContextStore
