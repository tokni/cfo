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
import { Typography, TextField } from '@material-ui/core'
import Language from '../../../utils/language'
import GetBalanceSheets from './GetBalanceSheets'
import GetAccountsType from '../Account/GetAccountsType'
import Modal from '../../../Helpers/Modal'
import { ArrowDropDown } from '../../../Helpers/Constants'
import SnackBar from '../SnackBar/SnackBar'

const Balance = () => {
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
  }, [calculateTotalAssets, assets, calculateTotalLiability, liabilities])

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
      <Modal
        Icon={ArrowDropDown}
        title={Language[state.locals].showcurrentbalancesheet}
        submit={onSubmit}
        close={handleClose}
        tooltipTitle={Language[state.locals].showcurrentbalancesheet}
      >
        <TextField
          autoFocus
          margin="dense"
          id="showcurrentbalancesheet"
          value={showCurrent}
          label={' '}
          select
          fullWidth
          onChange={e => {
            setShowCurrent(e.target.value)
          }}
        >
          <option value={true}>
            {Language[state.locals].show}
          </option>
          <option value={false}>
            {Language[state.locals].dontshow}
          </option>
        </TextField>
      </Modal>
   
      {showCurrent ? printCurrentBalanceSheet() : null}
    
      <GetBalanceSheets />
    </Fragment>
  )
}

export default Balance
