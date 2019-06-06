import React, { useContext, Fragment } from 'react'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import SnackBar from '../SnackBar/SnackBar'
import { useSubscription } from 'react-apollo-hooks'
import { GET_ACCOUNTS_BY_TYPE } from '../../../utils/Query/AccountQuery'
import TableHelper from '../../../Helpers/TableHelper'

const GetAccountsType = props => {
  const [state] = useContext(Context)
  const { data, error, loading } = useSubscription(GET_ACCOUNTS_BY_TYPE, {
    suspend: false,
    variables: {
        company_id: state.company ? state.company.id : null,
        debit: props.debit
    },
  })

  if (loading) {
    return <p>{Language[state.locals].loading}...</p>
  }

  if (error) {
    return (
      <SnackBar
        message={Language[state.locals].errorloadingaccounts}
        state={'error'}
      />
    )
  }

  return (
    <Fragment>
      {data.Account ? (
        <TableHelper array={data.Account}/>
      ) : null}
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}
    </Fragment>
  )
}

export default GetAccountsType
