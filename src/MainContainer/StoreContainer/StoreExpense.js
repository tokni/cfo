import Context from '../../Context/Context'
import { useContext } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_EXPENSE_SUBSCRIPTION } from '../../utils/Query/ExpenseQuery'

const StoreExpense = () => {
  const [state] = useContext(Context)
  const { data, error, loading } = useQuery(GET_EXPENSE_SUBSCRIPTION, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

    if(error){
      console.log("expense error", error)
      return error}

  if(loading){
    console.log("loading expense", loading)
  }

  console.log("store expense: ", data.Expense)

  return data.Expense ? data.Expense : null
}

export default StoreExpense
