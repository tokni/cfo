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
  const [transactions, setTransactions] = useState(null)

  const [sale, setSale] = useState(0)
  const latestSale = useRef(sale)

  const [sales, setSales] = useState([])
  const latestSales = useRef(sales)
  
  const [saleRelatedExpenses, setSaleRelatedExpenses] = useState([])

  const [steadyExpenses, setSteadyExpenses] = useState([])
  const latestSteadyExpenses = useRef(steadyExpenses)

  const [variableExpenses, setVariableExpenses] = useState([])
  const latestVariableExpenses = useRef(variableExpenses)

  const [interests, setInterests] = useState([])
  const latestInterests = useRef(interests)

  const [depreciations, setDepreciations] = useState([])
  const latestDepriciations = useRef(depreciations)

  const [resultBeforeInterests, setResultBeforeInterests] = useState(0)
  const latestResultBeforeInterests = useRef(resultBeforeInterests)

  const [resultAfterInterests, setResultAfterInterests] = useState(0)
  const latestResultAfterInterests = useRef(resultBeforeInterests)

  const [taxes, setTaxes] = useState([])

  const [tax, setTax] = useState(0)

  const [bruttoIncome, setBruttoIncome] = useState(0)
  const latestBruttoIncome = useRef(bruttoIncome)

  const [contributionMargin, setContributionMargin] = useState(0)
  const latestContributionMargin = useRef(contributionMargin)

  const [operatingSurplus, setOperatingSurplus] = useState(0)
  const latestOperatingSurplus = useRef(operatingSurplus)


  const getType = useCallback((lowerBound, upperBound) => {
    try {
      // return setVariableExpenses(
      let newArr = []
      // setVariableExpenses(

      transactions.forEach(currentTransaction => {
        // let date = new Date(currentValue.time_stamp).getFullYear()
        if (
          /*date <= new Date().getFullYear &&*/
          currentTransaction.accountByDebitId.type >= lowerBound &&
          currentTransaction.accountByDebitId.type < upperBound &&
          currentTransaction.accountByDebitId &&
          currentTransaction.bill_id !== null
        ) {
          newArr.sort(
            (a, b) => a.accountByDebitId.name < b.accountByDebitId.name
          )
          if (newArr.length < 2) {
            newArr.push(currentTransaction)
          } else {
            newArr.push(currentTransaction)
            for (let index = 1; index < newArr.length; index++) {
              const element = newArr[index]
              let previousElement = newArr[index - 1]
              if (
                element.accountByDebitId.type ===
                previousElement.accountByDebitId.type
              ) {
                previousElement.payment =
                  element.payment + previousElement.payment

                newArr.splice(index, 1)
              } else {
                newArr.push(element)
              }
            }
          }
        }
      })

      if (
        newArr[newArr.length - 2].accountByDebitId.type ===
        newArr[newArr.length - 1].accountByDebitId.type
      ) {
        newArr[newArr.length - 2].payment += newArr[newArr.length - 1].payment
        newArr.splice(newArr.length - 1, 1)
      }

      return newArr
    } catch (e) {
      // console.log(e)
    }
  }, [transactions])


  // const calculateSale = useCallback(() => {
  //   let total = 0
  //   try {
  //     latestSales.current.forEach(currentValue => {
  //       // let date = new Date(currentValue.time_stamp).getFullYear

  //       total += currentValue.payment
  //     })
  //     console.log('calculate sale', latestSale)

  //     // latestSale.current = total
  //     console.log('calculate sale 2', latestSale)

  //     return total
  //   } catch (e) {
  //     console.log('error ', e)
  //   }
  // }, [])

  // const getVariableExpenses = useCallback(() => {
  //   try {
  //     // return setVariableExpenses(
  //     let newArr = [...latestVariableExpenses.current]
  //     // setVariableExpenses(

  //     transactions.forEach(currentTransaction => {
  //       // let date = new Date(currentValue.time_stamp).getFullYear()
  //       if (
  //         /*date <= new Date().getFullYear &&*/
  //         currentTransaction.accountByDebitId.type >= 3000 &&
  //         currentTransaction.accountByDebitId.type < 4000 &&
  //         currentTransaction.accountByDebitId &&
  //         currentTransaction.bill_id !== null
  //       ) {
  //         newArr.sort(
  //           (a, b) => a.accountByDebitId.name < b.accountByDebitId.name
  //         )
  //         if (newArr.length < 2) {
  //           newArr.push(currentTransaction)
  //         } else {
  //           newArr.push(currentTransaction)
  //           for (let index = 1; index < newArr.length; index++) {
  //             const element = newArr[index]
  //             let previousElement = newArr[index - 1]
  //             if (
  //               element.accountByDebitId.type ===
  //               previousElement.accountByDebitId.type
  //             ) {
  //               previousElement.payment =
  //                 element.payment + previousElement.payment

  //               newArr.splice(index, 1)
  //             } else {
  //               newArr.push(element)
  //             }
  //           }
  //         }
  //       }
  //     })

  //     if (
  //       newArr[newArr.length - 2].accountByDebitId.type ===
  //       newArr[newArr.length - 1].accountByDebitId.type
  //     ) {
  //       newArr[newArr.length - 2].payment += newArr[newArr.length - 1].payment
  //       newArr.splice(newArr.length - 1, 1)
  //     }

  //     console.log('var array ', newArr)
  //     latestVariableExpenses.current = newArr
  //     return newArr
  //   } catch (e) {
  //     // console.log(e)
  //   }
  // }, [transactions])

  // const calculateContributionMargin = useCallback(() => {
  //   let tmpMargin = 0
  //   try {
  //     latestSteadyExpenses.current.forEach(element => {
  //       tmpMargin += element.payment
  //     })
  //   } catch (error) {}

  //   tmpMargin = latestBruttoIncome.current - tmpMargin

  //   return tmpMargin
  // }, [])

  // const getSteadyExpenses = useCallback(() => {
  //   try {
  //     let newArr = [...latestSteadyExpenses.current]

  //     transactions.forEach(currentTransaction => {
  //       // let date = new Date(currentValue.time_stamp).getFullYear()
  //       if (
  //         /*date <= new Date().getFullYear &&*/
  //         currentTransaction.accountByDebitId.type >= 4000 &&
  //         currentTransaction.accountByDebitId.type < 5000 &&
  //         currentTransaction.accountByDebitId &&
  //         currentTransaction.bill_id !== null
  //       ) {
  //         newArr.sort(
  //           (a, b) => a.accountByDebitId.name < b.accountByDebitId.name
  //         )
  //         if (newArr.length < 2) {
  //           newArr.push(currentTransaction)
  //         } else {
  //           newArr.push(currentTransaction)
  //           for (let index = 1; index < newArr.length; index++) {
  //             const element = newArr[index]
  //             let previousElement = newArr[index - 1]
  //             if (
  //               element.accountByDebitId.type ===
  //               previousElement.accountByDebitId.type
  //             ) {
  //               previousElement.accountByDebitId.payment =
  //                 element.payment + previousElement.payment

  //               newArr.splice(index, 1)
  //             } else {
  //               newArr.push(element)
  //             }
  //           }
  //         }
  //       }
  //     })

  //     if (
  //       newArr[newArr.length - 2].accountByDebitId.type ===
  //       newArr[newArr.length - 1].accountByDebitId.type
  //     ) {
  //       newArr[newArr.length - 2].payment += newArr[newArr.length - 1].payment
  //       newArr.splice(newArr.length - 1, 1)
  //     }
  //     latestSteadyExpenses.current = newArr

  //     return newArr
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [transactions])

  // const PrintExpenses = expenses => {
  //   try {
  //     return expenses.expenses.map((item, index) => {
  //       return (
  //         <Typography variant="h4" component="h1" data-cy="title">
  //           {item.accountByDebitId.name + ' ' + item.payment}
  //         </Typography>
  //       )
  //     })
  //   } catch (error) {
  //     console.log('print error ', error)

  //     return <p>Error</p>
  //   }
  // }

  // const calculateOperatingSurplus = useCallback(() => {
  //   let tmpSurplus = 0
  //   try {
  //     latestSteadyExpenses.current.forEach(element => {
  //       tmpSurplus += element.payment
  //     })
  //   } catch (error) {}
  //   tmpSurplus = latestContributionMargin.current - tmpSurplus

  //   latestOperatingSurplus.current = tmpSurplus
  //   return tmpSurplus
  // }, [])

  // const calculateBruttoIncome = useCallback(() => {
  //   let tmpExpense = 0
  //   let tmpBruttoIncome = 0

  //   try {
  //     latestVariableExpenses.current.forEach(element => {
  //       tmpExpense += element.payment
  //     })

  //     tmpBruttoIncome = latestSale.current - tmpExpense
  //   } catch (error) {
  //     console.log('brutto income error', error)
  //   }

  //   latestBruttoIncome.current = tmpBruttoIncome
  //   return tmpBruttoIncome
  // }, [])

  // const calculateDepreciation = useCallback(() => {
  //   try {
  //     let depreciationsArray = [...latestDepriciations.current]

  //     transactions.forEach(currentTransaction => {
  //       // let date = new Date(currentValue.time_stamp).getFullYear()
  //       if (
  //         /*date <= new Date().getFullYear &&*/
  //         currentTransaction.accountByDebitId.type >= 4000 &&
  //         currentTransaction.accountByDebitId.type < 5000 &&
  //         currentTransaction.accountByDebitId &&
  //         currentTransaction.bill_id !== null
  //       ) {
  //         depreciationsArray.sort(
  //           (a, b) => a.accountByDebitId.name < b.accountByDebitId.name
  //         )
  //         if (depreciationsArray.length < 2) {
  //           depreciationsArray.push(currentTransaction)
  //         } else {
  //           depreciationsArray.push(currentTransaction)
  //           for (let index = 1; index < depreciationsArray.length; index++) {
  //             const element = depreciationsArray[index]
  //             let previousElement = depreciationsArray[index - 1]
  //             if (
  //               element.accountByDebitId.type ===
  //               previousElement.accountByDebitId.type
  //             ) {
  //               previousElement.accountByDebitId.payment =
  //                 element.payment + previousElement.payment

  //               depreciationsArray.splice(index, 1)
  //             } else {
  //               depreciationsArray.push(element)
  //             }
  //           }
  //         }
  //       }
  //     })

  //     if (
  //       depreciationsArray[depreciationsArray.length - 2].accountByDebitId
  //         .type ===
  //       depreciationsArray[depreciationsArray.length - 1].accountByDebitId.type
  //     ) {
  //       depreciationsArray[depreciationsArray.length - 2].payment +=
  //         depreciationsArray[depreciationsArray.length - 1].payment
  //       depreciationsArray.splice(depreciationsArray.length - 1, 1)
  //     }
  //     latestSteadyExpenses.current = depreciationsArray
  //     return depreciationsArray
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [transactions])

  // const calculateInterests = useCallback(() => {
    
    
  //   try {

  //     let interestArray = [...interests]
  //     transactions.forEach(currentValue => {
  //       // let date = new Date(currentValue.time_stamp).getFullYear()
  //       if (
  //         currentValue.Account.type !== null &&
  //         /*date <= new Date().getFullYear &&*/
  //         currentValue.Account.type >= 9000 &&
  //         currentValue.Account.type < 10000
  //       ) {
  //         if (interestArray.length === 0) {
  //           interestArray.push(currentValue)
  //         } else {
  //           interestArray.forEach(expense => {
  //             if (currentValue.Account.name === expense.Account.name) {
  //               expense.payment += currentValue.payment
  //             } else {
  //               interestArray.push(currentValue)
  //             }
  //           })
  //         }
  //       }
   
  //     })
  //     latestInterests.current = interestArray
     
  //     return interestArray
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [interests, transactions])

  // const getTaxes = () => {
  //   try {
  //     transactions.reduce(function(total, currentValue) {
  //       // let date = new Date(currentValue.time_stamp).getFullYear()
  //       if (
  //         currentValue.Account.type !== null &&
  //         /*date <= new Date().getFullYear &&*/
  //         currentValue.Account.name === 'Tax'
  //       ) {
  //         if (interests.length === 0) {
  //           interests.push(currentValue)
  //         } else {
  //           interests.forEach(expense => {
  //             if (currentValue.Account.name === expense.Account.name) {
  //               interests.payment += currentValue.payment
  //             } else {
  //               interests.push(currentValue)
  //             }
  //           })
  //         }
  //       }
  //       return interests
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const calculateResultBeforeInterests = useCallback(() => {
  //   let tmpResult = 0

  //   latestDepriciations.current.forEach(element => {
  //     tmpResult = latestOperatingSurplus.current - element.payment
  //   })

  //   latestResultBeforeInterests.current = tmpResult
  //   return tmpResult
  // }, [])

  // const calculateAfterInterests = useCallback(() => {
  //   let tmpAfterInterestsResult = 0

  //   try {
  //     latestInterests.current.forEach(element => {
  //       tmpAfterInterestsResult =
  //         latestResultAfterInterests.current - element.payment
  //     })
  //   } catch (error) {}

  //   latestResultAfterInterests.current = tmpAfterInterestsResult
  //   return tmpAfterInterestsResult
  // }, [])

  // const getSales = useCallback((e) => {
  //   try {
  //     let tmpSales = [...latestSales.current]

  //     console.log("latestSales", latestSales.current);
      
  //     transactions.forEach(currentTransaction => {
  //       // let date = new Date(currentValue.time_stamp).getFullYear()
  //       if (
  //         /*date <= new Date().getFullYear &&*/
  //         currentTransaction.accountByDebitId.type >= 1000 &&
  //         currentTransaction.accountByDebitId.type < 2000 &&
  //         currentTransaction.accountByDebitId &&
  //         currentTransaction.invoice_id !== null
  //       ) {
  //         tmpSales.sort(
  //           (a, b) => a.accountByDebitId.name < b.accountByDebitId.name
  //         )
  //         if (tmpSales.length < 2) {
  //           tmpSales.push(currentTransaction)
  //         } else {
  //           tmpSales.push(currentTransaction)
  //           for (let index = 1; index < tmpSales.length; index++) {
  //             const element = tmpSales[index]
  //             let previousElement = tmpSales[index - 1]
  //             if (
  //               element.accountByDebitId.type ===
  //               previousElement.accountByDebitId.type
  //             ) {
  //               previousElement.payment =
  //                 element.payment + previousElement.payment

  //               tmpSales.splice(index, 1)
  //             } else {
  //               tmpSales.push(element)
  //             }
  //           }
  //         }
  //       }
  //     })
  //     if (
  //       tmpSales[tmpSales.length - 2].accountByDebitId.type ===
  //       tmpSales[tmpSales.length - 1].accountByDebitId.type
  //     ) {
  //       tmpSales[tmpSales.length - 2].payment +=
  //         tmpSales[tmpSales.length - 1].payment
  //       tmpSales.splice(tmpSales.length - 1, 1)
  //     }

  //     latestSales.current = tmpSales
  //     return tmpSales
  //   } catch (e) {
  //     // console.log(e)
  //   }
  // }, [transactions])

  useEffect(() => {
    setTransactions(state.company ? state.company.Transactions : null)

    // setSales(getSales())
    // setSale(calculateSale())
    // setSteadyExpenses(getSteadyExpenses())
    // setVariableExpenses(getVariableExpenses())
    // setBruttoIncome(calculateBruttoIncome())
    // setContributionMargin(calculateContributionMargin())
    // setOperatingSurplus(calculateOperatingSurplus())
    // setDepreciations(calculateDepreciation())
    // setInterests(calculateInterests())
    // setResultBeforeInterests(calculateResultBeforeInterests())
    // setResultAfterInterests(calculateAfterInterests())
  }, [
    transactions,
    state.company,
    calculateSale,
    // getSales,
    // getSteadyExpenses,
    // getVariableExpenses,
    // calculateBruttoIncome,
    // calculateContributionMargin,
    // calculateOperatingSurplus,
    // calculateDepreciation,
    // calculateResultBeforeInterests,
    // calculateInterests,
    // calculateAfterInterests,
  ])

  return (
    <Fragment>

    </Fragment>
    
    // <Fragment>
    //   <p>dfgfdgfd</p>
    //   <p>dfgfdgfd</p>
    //   <Typography variant="h4" component="h1" data-cy="title">
    //     Total Sale: {sale}
    //   </Typography>
    //   VØRUFORBRÙK SKAL ROKNAST
    //   <Typography variant="h4" component="h1" data-cy="title">
    //     ROKNAR variableExpenses, skal brúka VØRUFORBRÙK Brutto Income:{' '}
    //     {bruttoIncome}
    //   </Typography>
    //   <PrintExpenses expenses={variableExpenses} />
      
    //   <Typography variant="h4" component="h1" data-cy="title">
    //     Contribution Margin: {contributionMargin}
    //   </Typography>
    //   <PrintExpenses expenses={steadyExpenses} />
    //   <Typography variant="h4" component="h1" data-cy="title">
    //     : {operatingSurplus}
    //   </Typography>
    //   <PrintExpenses expenses={depreciations} />
    //   <Typography variant="h4" component="h1" data-cy="title">
    //     Operating Surplus: {operatingSurplus}
    //   </Typography>
    //   <PrintExpenses expenses={depreciations} />

    //   <Typography variant="h4" component="h1" data-cy="title">
    //     Result before interest: {resultBeforeInterests}
    //   </Typography>
    //   <PrintExpenses expenses={interests} />

    //   <Typography variant="h4" component="h1" data-cy="title">
    //     {/* Result before taxes: {resultAfterInterests} */}
    //   </Typography>
    //   {/* <PrintExpenses expenses={taxes} /> */}
    //   <Typography variant="h4" component="h1" data-cy="title">
    //     {/* Result after taxes: {resultAfterInterests - resultAfterInterests * 0.18} */}
    //   </Typography>
    // </Fragment>
  )
}

export default Operations
