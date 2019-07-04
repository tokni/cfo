import Context from './Context'
import createReducer from './createReducer'
import PropTypes from 'prop-types'
import React, { useReducer } from 'react'

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
  locals: 'fo',
  accounting_year: null,
  accounting_year_index: 0,
  companies: null,
  company: null,
  company_index: 0,
  user: null,
}

const reducer = createReducer(initialState, {
  reset: () => initialState,
  set_accounting_year: (state, action) => ({
    ...state,
    accounting_year: action.accounting_year,
  }),
  set_accounting_year_index: (state, action) => ({
    ...state,
    accounting_year_index: action.accounting_year_index,
  }),
  set_companies: (state, action) => ({
    ...state,
    companies: action.companies,
  }),
  set_company: (state, action) => ({
    ...state,
    company: state.companies[parseInt(action.index)],
    company_index: [parseInt(action.index)],
  }),
  set_locals: (state, action) => ({
    ...state,
    locals: action.locals,
  }),
  load_user: (state, action) => ({
    ...state,
    user: action.user ? action.user[0] : null,
  }),
})

export default ContextStore
