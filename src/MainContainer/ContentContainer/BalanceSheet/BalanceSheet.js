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
import { Typography, TextField, MenuItem } from '@material-ui/core'
import Language from '../../../utils/language'
import GetBalanceSheets from './GetBalanceSheets'
import GetAccountsType from '../Account/GetAccountsType'
import Modal from '../../../Helpers/Modal'
import { ArrowDropDown } from '../../../Helpers/Constants'
import SnackBar from '../SnackBar/SnackBar'
import CreateBalanceSheets from './CreateBalanceSheet'

const BalanceSheet = () => {
  const [open, setOpen] = useState(false)
  const [assets, setAssets] = useState(null)
  const latestAssets = useRef(assets)
  const [liabilities, setLiabilities] = useState(null)
  const latestLiabilities = useRef(liabilities)
  const [state] = useContext(Context)
  const [showCurrent, setShowCurrent] = useState(false)

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
  }, [calculateTotalAssets, calculateTotalLiability])

  const handleClose = props => {
    if (state.company) {
      setOpen(!open)
    }
  }

  const onSubmit = e => {
    if (showCurrent !== null) {
      setTimeout(() => {}, 1000)
    } else {
      setTimeout(() => {}, 1000)
    }
    handleClose()
  }

  const printCurrentBalanceSheet = () => {
    return (
      <Fragment>
        <Typography variant="h4" component="h1">
          {Language[state.locals]['currentbalancesheet']}
        </Typography>

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

        {liabilities === assets ? null : (
          <SnackBar
            message={Language[state.locals].debitcreditmismatch}
            state="warning"
          />
        )}
      </Fragment>
    )
  }
  return (
    <Fragment>
      {data ? (
        data.Account ? (
          <CreateBalanceSheets
            liabilities={liabilities}
            assets={assets}
            accounts={data.Account}
          />
        ) : null
      ) : null}

      <Modal
        Icon={ArrowDropDown}
        title={'showcurrentbalancesheet'}
        submit={onSubmit}
        name="currentbalance"
        close={handleClose}
        tooltipTitle={Language[state.locals].showcurrentbalancesheet}
      >
        <TextField
          autoFocus
          margin="dense"
          id="showcurrentbalancesheet"
          value={showCurrent}
          variant="outlined"
          label={' '}
          select
          fullWidth
          onChange={e => {
            setShowCurrent(e.target.value)
          }}
        >
          <MenuItem value={true}>{Language[state.locals].show}</MenuItem>
          <MenuItem value={false}>{Language[state.locals].dontshow}</MenuItem>
        </TextField>
      </Modal>

      {showCurrent ? printCurrentBalanceSheet() : null}

      <GetBalanceSheets />
    </Fragment>
  )
}

export default BalanceSheet
