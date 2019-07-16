import React, {
  useContext,
  // Fragment,
  useState,
  useEffect,
  useCallback,
} from 'react'
import Context from '../../../Context/Context'
import { Typography } from '@material-ui/core'

const Operations = () => {
  const [state] = useContext(Context)
  const [transactions, setTransactions] = useState(null)

  const [sale, setSale] = useState(0)

  const [saleRelatedExpenses, setSaleRelatedExpenses] = useState([])

  const [steadyExpenses, setSteadyExpenses] = useState([])

  const [variableExpenses, setVariableExpenses] = useState([])

  const [interests, setInterests] = useState([])

  const [depreciations, setDepreciations] = useState([])

  const [resultBeforeInterests, setResultBeforeInterests] = useState(0)

  const [resultAfterInterests, setResultAfterInterests] = useState(0)

  const [taxes, setTaxes] = useState([])

  const [resultAfterTaxes, setResultAfterTaxes] = useState(0)

  const [bruttoIncome, setBruttoIncome] = useState(0)

  const [contributionMargin, setContributionMargin] = useState(0)

  const [operatingSurplus, setOperatingSurplus] = useState(0)

  const inRange = useCallback((date, index) => {
    console.log("date index ", date);
    console.log("date index ", new Date(date) <= new Date(state.accounting_year[index].to) &&
    new Date(date) >= new Date(state.accounting_year[index].from));

    
    return (
      new Date(date) <= new Date(state.accounting_year[index].to) &&
      new Date(date) >= new Date(state.accounting_year[index].from)
    )
  },[state.accounting_year])

  const getType = useCallback(
    (lowerBound, upperBound) => {
      try {
        let newArr = []
        const trans = JSON.parse(JSON.stringify(transactions))

        trans.forEach(currentTransaction => {
          let transObject = currentTransaction
          if (
            /*date <= new Date().getFullYear &&*/
            transObject.accountByDebitId.type >= lowerBound &&
            transObject.accountByDebitId.type < upperBound
            && inRange(transObject.time_stamp, state.accounting_year_index) 
          ) {
            newArr.push(transObject)
          }
        })

        if (newArr.length > 1) {
          newArr.sort(
            (a, b) => a.accountByDebitId.type < b.accountByDebitId.type
          )
          let elementIndex = 1
          let compareIndex = 2
          for (let index = 0; index < newArr.length; index++) {
            let element = newArr[newArr.length - elementIndex]
            let comparison = newArr[newArr.length - compareIndex]

            if (comparison) {
              if (
                element.accountByDebitId.type ===
                comparison.accountByDebitId.type
              ) {
                comparison.payment += element.payment
                newArr.splice(newArr.length - elementIndex, 1)
                if (index !== 0) --index
              } else {
                elementIndex++
                compareIndex = elementIndex + 1
                --index
              }
            }
          }
        }

        return newArr
      } catch (e) {
        console.log(e)
      }
    },
    [transactions, state.accounting_year_index, inRange]
  )

  const calculateSale = useCallback(typeArray => {
    let total = 0
    try {
      typeArray.forEach(currentValue => {
        total += currentValue.payment
      })

      setSale(total)
    } catch (e) {
      console.log('error ', e)
    }
  }, [])

  const calculateContributionMargin = useCallback(() => {
    let tmpMargin = 0
    try {
      variableExpenses.forEach(element => {
        tmpMargin += element.payment
      })
    } catch (error) {}

    tmpMargin = bruttoIncome - tmpMargin

    return tmpMargin
  }, [variableExpenses, bruttoIncome])

  const PrintExpenses = expenses => {
    try {
      return expenses.expenses
        ? expenses.expenses.map(item => {
            return (
              <Typography
                variant="h4"
                component="h1"
                data-cy="title"
                color="error"
              >
                {item.accountByDebitId.name + ' ' + item.payment}
              </Typography>
            )
          })
        : null
    } catch (error) {
      console.log('print error ', error)

      return <p>Error</p>
    }
  }

  const calculateOperatingSurplus = useCallback(() => {
    let tmpSurplus = contributionMargin

    try {
      steadyExpenses.forEach(element => {
        tmpSurplus += -element.payment
      })
    } catch (error) {
      console.log(error)
    }

    return tmpSurplus
  }, [steadyExpenses, contributionMargin])

  const calculateBruttoIncome = useCallback(() => {
    let tmpExpense = 0
    let tmpBruttoIncome = sale

    try {
      saleRelatedExpenses.forEach(element => {
        tmpExpense = tmpExpense - element.payment
      })

      tmpBruttoIncome = tmpBruttoIncome + tmpExpense
    } catch (error) {
      console.log('brutto income error', error)
    }

    return tmpBruttoIncome
  }, [saleRelatedExpenses, sale])

  const calculateResultAfterTaxes = useCallback(() => {
    let tmpResult = resultAfterInterests
    try {
      taxes.forEach(element => {
        tmpResult -= element.payment
      })
    } catch (error) {
      console.log(error)
    }
    return tmpResult
  }, [resultAfterInterests, taxes])

  const calculateResultBeforeInterests = useCallback(() => {
    let tmpResult = operatingSurplus

    try {
      depreciations.forEach(element => {
        tmpResult += -element.payment
      })
    } catch (error) {
      console.log(error)
    }
    return tmpResult
  }, [depreciations, operatingSurplus])

  const calculateAfterInterests = useCallback(() => {
    let tmpAfterInterestsResult = resultBeforeInterests

    try {
      interests.forEach(element => {
        tmpAfterInterestsResult -= element.payment
      })
    } catch (error) {
      console.log(error)
    }

    return tmpAfterInterestsResult
  }, [interests, resultBeforeInterests])

  useEffect(() => {
    setTransactions(
      state.company
        ? JSON.parse(JSON.stringify(state.company.Transactions))
        : null
    )

    calculateSale(getType(1000, 2000))
    setVariableExpenses(getType(3000, 3900))
    setSaleRelatedExpenses(getType(3900, 400))
    setSteadyExpenses(getType(4000, 5000))
    setDepreciations(getType(9000, 10000))
    setInterests(getType(8000, 9000))
    setTaxes(getType(10000, 11000))
    setBruttoIncome(calculateBruttoIncome())
    setContributionMargin(calculateContributionMargin())
    setOperatingSurplus(calculateOperatingSurplus())
    setResultBeforeInterests(calculateResultBeforeInterests())
    setResultAfterInterests(calculateAfterInterests())
    setResultAfterTaxes(calculateResultAfterTaxes())
  }, [
    transactions,
    state.company,
    getType,
    calculateSale,
    calculateBruttoIncome,
    calculateContributionMargin,
    calculateOperatingSurplus,
    calculateResultBeforeInterests,
    calculateAfterInterests,
    calculateResultAfterTaxes,
  ])

  return (
    <div align="left" width="50%">
      <Typography variant="h4" component="h1" data-cy="title">
        Total Sale: {sale}
      </Typography>
      <PrintExpenses expenses={saleRelatedExpenses} />

      <Typography variant="h4" component="h1" data-cy="title">
        Brutto Income: {bruttoIncome}
      </Typography>
      <PrintExpenses expenses={variableExpenses} />
      <Typography variant="h4" component="h1" data-cy="title">
        Contribution Margin: {contributionMargin}
      </Typography>
      <PrintExpenses expenses={steadyExpenses} />
      <Typography variant="h4" component="h1" data-cy="title">
        Operating Surplus : {operatingSurplus}
      </Typography>
      <PrintExpenses expenses={depreciations} />

      <Typography variant="h4" component="h1" data-cy="title">
        Result before interest: {resultBeforeInterests}
      </Typography>
      <PrintExpenses expenses={interests} />
      <Typography variant="h4" component="h1" data-cy="title">
        Result before taxes: {resultAfterInterests}
      </Typography>
      <PrintExpenses expenses={taxes} />
      <Typography variant="h4" component="h1" data-cy="title">
        Result after taxes: {resultAfterTaxes}
      </Typography>
    </div>
  )
}

export default Operations
