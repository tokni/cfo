import React, { useContext, Fragment } from 'react'
import Context from '../../../Context/Context'
import Language from '../../../utils/language'
import AccountNumbers from './AccountNumber'
import SnackBar from '../SnackBar/SnackBar'
import { useSubscription } from 'react-apollo-hooks'
import { GET_SUBSCRIP_ACCOUNTS } from '../../../utils/Query/AccountQuery'
import TableHelper from '../../../Helpers/TableHelper'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles(theme => ({
//   progress: {
//     margin: theme.spacing(2),
//   },
// }))
const GetAccounts = () => {
  const [state] = useContext(Context)
  const accountNumbers = <AccountNumbers />
  // const classes = useStyles()
  const { data, error, loading } = useSubscription(GET_SUBSCRIP_ACCOUNTS, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  if (loading) {
    return (
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
        <CircularProgress />
        {Language[state.locals].loading}...
      </div>
    )
    // return <p>{Language[state.locals].loading}...</p>
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
        <TableHelper array={data.Account} accountNumbers={accountNumbers} hideID={true}/>
      ) : null}
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}
    </Fragment>
  )
}

export default GetAccounts
