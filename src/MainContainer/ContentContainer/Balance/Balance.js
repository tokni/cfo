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
import { Typography } from '@material-ui/core'
import Language from '../../../utils/language'
import GetBalanceSheets from './GetBalanceSheets'
import GetAccountsType from '../Account/GetAccountsType'


const Balance = () => {
  // const [totalBalance, setTotalBalance] = useState(null)
  // const latestBalance = useRef(totalBalance)
  const [assets, setAssets] = useState(null)
  const latestAssets = useRef(assets)
  const [liabilities, setLiabilities] = useState(null)
  const latestLiabilities = useRef(liabilities)
  const [state] = useContext(Context)
  const { data } = useSubscription(GET_SUBSCRIP_ACCOUNTS, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

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
    calculateTotalAssets()
    calculateTotalLiability()
  }, [calculateTotalAssets, assets, calculateTotalLiability, liabilities])

  return (
    <Fragment>
      <Typography variant="h5" component="h3"> 
        {Language[state.locals]['assets']}
      </Typography>
      <GetAccountsType debit={true} />

      <Typography component="p" align="center">
        {Language[state.locals]['total']} : {assets}
      </Typography>

      <Typography variant="h5" component="h3">
        {Language[state.locals]['liabilities']}
      </Typography>

      <GetAccountsType debit={false} />

      <Typography component="p" align="center">
        {Language[state.locals]['total']} : {liabilities}
      </Typography>

      <GetBalanceSheets date='2018-01-1'/>
    </Fragment>
  )
}

export default Balance
