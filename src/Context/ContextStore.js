import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import createReducer from './createReducer'

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
  locals: 'de',
  companies: null,
  company: null,
  user: null
}

const reducer = createReducer(initialState, {
  reset: () => initialState,
  change_company: (state, action) => ({
    ...state,
    companies: action.companies,
  }),
  set_company: (state, action) => ({
    ...state,
    company: state.companies[action.index],
  }),
  set_locals: (state, action) => ({
    ...state,
    locals: action.locals,
  }),
})

export default ContextStore
