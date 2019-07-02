import React, {
  useContext,
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import Context from '../../../Context/Context'
import { Typography } from '@material-ui/core'

const Operations = () => {
  const [state] = useContext(Context)

  const [sale, setSale] = useState(0)
  const latestSale = useRef(sale)
  const [sales, setSales] = useState(0)

  const [transactions, setTransactions] = useState(null)

  const [steadyExpenses, setSteadyExpenses] = useState([])
  const [variableExpenses, setVariableExpenses] = useState([])
  const [interests, setInterests] = useState([])
  const [interest, setInterest] = useState(0)
  const [depreciations, setDepreciations] = useState([])
  const [depreciation, setDepreciation] = useState(0)
  const [resultBeforeInterests, setResultBeforeInterests] = useState(0)
  const [resultAfterInterests, setResultAfterInterests] = useState(0)
  const [taxes, setTaxes] = useState([])
  const [tax, setTax] = useState(0)
  const [bruttoIncome, setBruttoIncome] = useState(0)
  const [contributionMargin, setContributionMargin] = useState(0)
  const [operatingSurplus, setOperatingSurplus] = useState(0)

  const calculateSale = useCallback(() => {
    try {
      return setSale(
        transactions.reduce(
          function(total, currentValue) {
            // let date = new Date(currentValue.time_stamp).getFullYear
            if (
              currentValue.bill_id === null &&
              currentValue.accountByDebitId.type >= 1000 &&
              currentValue.accountByDebitId.type < 2000
            ) {
              total += currentValue.payment
            }
            return parseFloat(total)
          },
          [latestSale.current]
        )
      )
    } catch (e) {
      console.log('error ', e)
    }
  }, [latestSale, transactions])

  const getVariableExpenses = useCallback(() => {
    try {
      transactions.reduce(function(total, currentValue) {
        // let date = new Date(currentValue.time_stamp).getFullYear()
        if (
          /*date <= new Date().getFullYear &&*/
          currentValue.Account.type >= 3000 && currentValue.Account.type < 4000 && currentValue.Account && currentValue.bill_id !== null
        ) {
          if (variableExpenses.length === 0) {
            variableExpenses.push(currentValue)
          } else {
            variableExpenses.forEach(expense => {
              if (currentValue.Account.name === expense.Account.name) {
                variableExpenses.payment += currentValue.payment
              } else {
                variableExpenses.push(currentValue)
              }
            })
          }
          
        }
        console.log("var ", variableExpenses);

        return variableExpenses
      })
    } catch (e) {
      console.log(e)
    }
  }, [variableExpenses, transactions])

  const calculateContributionMargin = useCallback(() => {
    let tmpMargin = 0

    variableExpenses.forEach(element => {
      tmpMargin += element.payment
    })
    tmpMargin = bruttoIncome - tmpMargin
    setContributionMargin(tmpMargin)
  }, [variableExpenses, bruttoIncome])

  const getSteadyExpenses = useCallback(() => {
    try {
      transactions.reduce(function(total, currentValue) {
        // let date = new Date(currentValue.time_stamp).getFullYear()
        if (
          /*date <= new Date().getFullYear &&*/
          currentValue.Account.type >= 4000 &&
          currentValue.Account.type < 5000
        ) {
          if (steadyExpenses.length === 0) {
            steadyExpenses.push(currentValue)
          } else {
            steadyExpenses.forEach(expense => {
              if (currentValue.Account.name === expense.Account.name) {
                steadyExpenses.payment += currentValue.payment
              } else {
                steadyExpenses.push(currentValue)
              }
            })
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }, [steadyExpenses, transactions])

  const printExpenses = expenses => {
    return expenses.map((item, index) => {
      return (
        <Typography key={index} variant="h4" component="h1" data-cy="title">
          {item.Account.type + ' ' + item.Account.name} : {item.payment}
        </Typography>
      )
    })
  }

  const calculateOperatingSurplus = useCallback(() => {
    let tmpSurplus = 0

    steadyExpenses.forEach(element => {
      tmpSurplus += element.payment
    })
    tmpSurplus = contributionMargin - tmpSurplus
    setOperatingSurplus(tmpSurplus)
  }, [steadyExpenses, contributionMargin])

  const calculateBruttoIncome = useCallback(() => {
    let tmpExpense = 0
    variableExpenses.forEach(element => {
      tmpExpense += element.payment
    })

    

    let tmpBruttoIncome = sale - tmpExpense

    setBruttoIncome(tmpBruttoIncome)
  }, [variableExpenses, setBruttoIncome, sale])

  const calculateDepreciation = useCallback(() => {
    try {
      transactions.reduce(function(total, currentValue) {
        // let date = new Date(currentValue.time_stamp).getFullYear()
        if (
          currentValue.Account.type !== null &&
          /*date <= new Date().getFullYear &&*/
          currentValue.Account.type >= 8000 &&
          currentValue.Account.type < 9000
        ) {
          if (depreciations.length === 0) {
            depreciations.push(currentValue)
          } else {
            depreciations.forEach(expense => {
              if (currentValue.Account.name === expense.Account.name) {
                depreciations.payment += currentValue.payment
              } else {
                depreciations.push(currentValue)
              }
            })
          }
        }
        return depreciations
      })
    } catch (e) {
      console.log(e)
    }
  }, [depreciations, transactions])

  const calculateInterests = useCallback(() => {
    try {
      transactions.reduce(function(total, currentValue) {
        // let date = new Date(currentValue.time_stamp).getFullYear()
        if (
          currentValue.Account.type !== null &&
          /*date <= new Date().getFullYear &&*/
          currentValue.Account.type >= 9000 &&
          currentValue.Account.type < 10000
        ) {
          if (interests.length === 0) {
            interests.push(currentValue)
          } else {
            interests.forEach(expense => {
              if (currentValue.Account.name === expense.Account.name) {
                interests.payment += currentValue.payment
              } else {
                interests.push(currentValue)
              }
            })
          }
        }
        return interests
      })
    } catch (e) {
      console.log(e)
    }
  }, [interests, transactions])

  const getTaxes = () => {
    try {
      transactions.reduce(function(total, currentValue) {
        // let date = new Date(currentValue.time_stamp).getFullYear()
        if (
          currentValue.Account.type !== null &&
          /*date <= new Date().getFullYear &&*/
          currentValue.Account.name === 'Tax'
        ) {
          if (interests.length === 0) {
            interests.push(currentValue)
          } else {
            interests.forEach(expense => {
              if (currentValue.Account.name === expense.Account.name) {
                interests.payment += currentValue.payment
              } else {
                interests.push(currentValue)
              }
            })
          }
        }
        return interests
      })
    } catch (e) {
      console.log(e)
    }
  }

  const calculateResultBeforeInterests = useCallback(() => {
    let tmpResult = operatingSurplus

    depreciations.forEach(element => {
      tmpResult = operatingSurplus - element.payment
    })

    setResultBeforeInterests(tmpResult)
  }, [depreciations, operatingSurplus])

  const calculateAfterInterests = useCallback(() => {
    let tmpAfterInterestsResult = resultBeforeInterests

    interests.forEach(element => {
      tmpAfterInterestsResult = resultBeforeInterests - element.payment
    })

    setResultAfterInterests(tmpAfterInterestsResult)
  }, [interests, resultBeforeInterests])

  const getSales = useCallback(() => {
    try {
      transactions.reduce(function(total, currentValue) {
        // let date = new Date(currentValue.time_stamp).getFullYear()
        if (
          currentValue.accountByDebitId.type !== null && currentValue.bill_id === null
          /*date <= new Date().getFullYear &&*/
        ) {
          if (sales.length === 0) {
            sales.push(currentValue)
          } else {
            sales.forEach(expense => {
              if (currentValue.Account.name === expense.Account.name) {
                sales.payment += currentValue.payment
              } else {
                sales.push(currentValue)
              }
            })
          }
        }
        return sales
      })
    } catch (e) {
      console.log(e)
    }

  }, [transactions, sales])

  useEffect(() => {
    setTransactions(state.company ? state.company.Transactions : null)
    calculateSale()
    getSales()    

    getVariableExpenses()
    getSteadyExpenses()
    getVariableExpenses()
    calculateBruttoIncome()
    calculateContributionMargin()
    calculateOperatingSurplus()
    calculateDepreciation()
    calculateResultBeforeInterests()
    calculateInterests()
    calculateAfterInterests()
  }, [
    calculateSale,
    getSales,
    transactions,
    state.company,
    getVariableExpenses,
    calculateBruttoIncome,
    getSteadyExpenses,
    calculateContributionMargin,
    calculateOperatingSurplus,
    calculateDepreciation,
    calculateResultBeforeInterests,
    calculateInterests,
    calculateAfterInterests,
  ])

  return (
    <Fragment>
      {/* {printExpenses(sales)} */}
      <Typography variant="h4" component="h1" data-cy="title">
        Total Sale: {sale} 
      </Typography>
      {printExpenses(variableExpenses)}
      <Typography variant="h4" component="h1" data-cy="title">
        Brutto Income: {bruttoIncome}
      </Typography>
      <Typography variant="h4" component="h1" data-cy="title">
        Contribution Margin: {contributionMargin}
      </Typography>
      {printExpenses(steadyExpenses)}
      <Typography variant="h4" component="h1" data-cy="title">
        Operating Surplus: {operatingSurplus}
      </Typography>
      {printExpenses(depreciations)}
      <Typography variant="h4" component="h1" data-cy="title">
        Result before interest: {resultBeforeInterests}
      </Typography>
      {printExpenses(interests)}
      <Typography variant="h4" component="h1" data-cy="title">
        Result before taxes: {resultAfterInterests}
      </Typography>
      {printExpenses(taxes)}
      <Typography variant="h4" component="h1" data-cy="title">
        Result after taxes: {resultAfterInterests-(resultAfterInterests * 0.18)}
      </Typography>
    </Fragment>
  )
}

export default Operations
