import React, {
  useContext,
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import Context from '../../../Context/Context'
import { GET_SUBSCRIP_ACCOUNTS } from '../../../utils/Query/AccountQuery'
import { useSubscription } from 'react-apollo-hooks'
import { Typography, Paper } from '@material-ui/core'
import TableHelper from '../../../Helpers/TableHelper'
import SnackBar from '../SnackBar/SnackBar'
import AccountNumbers from '../Account/AccountNumber'
import Language from '../../../utils/language'
const Balance = () => {
  // const [totalBalance, setTotalBalance] = useState(null)
  // const latestBalance = useRef(totalBalance)
  const [assets, setAssets] = useState(null)
  const latestAssets = useRef(assets)
  const accountNumbers = <AccountNumbers />

  const [liabilities, setLiabilities] = useState(null)
  const latestLiabilities = useRef(liabilities)
  const [state, dispatch] = useContext(Context)
  const { data } = useSubscription(GET_SUBSCRIP_ACCOUNTS, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  // const calculateTotalBalance = useCallback(() => {
  //   return data
  //     ? setTotalBalance(
  //         data.Account.reduce(function(total, currentValue) {
  //           if (currentValue.debit) return total + currentValue.balance
  //           else return total - currentValue
  //         }, latestBalance.current)
  //       )
  //     : 'loading'
  // }, [data])

  // if (loading) {
  //   return <p>{Language[state.locals].loading}...</p>
  // }

  // if (error) {
  //   return (
  //     <SnackBar
  //       message={Language[state.locals].errorloadingaccounts}
  //       state={'error'}
  //     />
  //   )
  // }

  const calculateTotalAssets = useCallback(() => {
    return data
      ? setAssets(
          data.Account.reduce(function(total, currentValue) {
            if (currentValue.debit) {
              total += currentValue.balance
            }
            return total
          }, latestAssets.current)
        )
      : 'loading'
  }, [data, latestAssets])

  const calculateTotalLiability = useCallback(() => {
    return data
      ? setLiabilities(
          data.Account.reduce(function(total, currentValue) {
            if (!currentValue.debit) {
              total += currentValue.balance
            }
            return total
          }, latestLiabilities.current)
        )
      : 'loading'
  }, [data, latestLiabilities])


  useEffect(() => {
    // calculateTotalBalance()

    calculateTotalAssets()
    latestAssets.current = assets
    calculateTotalLiability()
    latestLiabilities.current = liabilities
    // latestBalance.current = totalBalance
  }, [/*calculateTotalBalance, totalBalance,*/ calculateTotalAssets, assets, calculateTotalLiability, liabilities])

  return (
    <Fragment>
      {data ? (
        data.Account ? (
          <TableHelper array={data.Account} accountNumbers={accountNumbers} />
        ) : null
      ) : null}
      {state.company === null ? (
        <SnackBar message={'select company first'} state={'warning'} />
      ) : null}

      <Typography variant="h5" component="h3">
        Assets
      </Typography>
      <Typography component="p"> assets : {assets}</Typography>
      <Typography component="p"> liabilities : {liabilities}</Typography>

    </Fragment>
  )
}

export default Balance
